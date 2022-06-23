import { AuthService } from './auth/auth.service';
import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @Get('/check')
  check() {
    return process.versions;
  }
}
