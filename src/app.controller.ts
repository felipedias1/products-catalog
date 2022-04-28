import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('UserLogin')
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login on application' })
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
