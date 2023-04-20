import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { SessionAuthGuard } from '../auth/guard/session.guard';

@Controller('user')
export class UserController {
  @UseGuards(JwtGuard)
  @Get('me')
  getUser(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(SessionAuthGuard)
  @Get('test')
  testSession() {
    return 'Hello from Session Auth';
  }
}
