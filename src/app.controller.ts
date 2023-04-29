import { Controller, Get } from '@nestjs/common';
import { LoginService } from './app.service';

@Controller('/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  async getHello(): Promise<{ accessToken: string }> {
    return this.loginService.login({
      username: '-',
      password: '-',
    });
  }
}
