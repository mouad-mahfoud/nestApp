import { JwtPayload } from './types/jwtPayload.type';
import * as argon from 'argon2';
import { Tokens } from './types';
import { AuthDto } from './dto';
import { UserService } from './../user/user.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(email);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }

  async login(user: any) {
    /* const payload = { email: user.email, sub: user.publicId };
    return {
      access_token: this.jwtService.sign(payload),
    }; */
  }

  /*   async signupLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user
      .create({
        data: {
          email: dto.email,
          hash,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.publicId, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  } */

  async signinLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.usersRepository.findOneBy({ email: dto.email });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(
      user.hashedPassword,
      dto.password,
    );
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.publicId, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userPublicId: string): Promise<boolean> {
    await this.usersRepository.update(
      { publicId: userPublicId },
      { hashedRefreshToken: null },
    );

    return true;
  }

  async refreshTokens(
    userPublicId: string,
    refreshToken: string,
  ): Promise<Tokens> {
    const user = await this.usersRepository.findOneBy({
      publicId: userPublicId,
    });
    if (!user || !user.hashedRefreshToken)
      throw new ForbiddenException('Access Denied');

    const refreshTokenMatches = await argon.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.publicId, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRefreshToken(
    userPublicId: string,
    refreshToken: string,
  ): Promise<void> {
    const hash = await argon.hash(refreshToken);
    await this.usersRepository.update(
      { publicId: userPublicId },
      { hashedRefreshToken: hash },
    );
  }

  async getTokens(userPublicId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userPublicId,
      email: email,
    };

    const [at, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: refreshToken,
    };
  }
}
