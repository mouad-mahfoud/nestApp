import { AuthDto } from './dto';
import { AuthService } from './auth.service';
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  loging(@Body() authDto: AuthDto) {
    this.authService.login(authDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  logout() {
    //this.authService.logout();
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('/refresh')
  refreshToken() {
    //this.authService.refreshToken();
  }
}
