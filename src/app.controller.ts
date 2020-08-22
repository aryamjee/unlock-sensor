import { Controller, Get, Post, HttpCode, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModelInput } from './model/user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('unlock-sensor')
  @HttpCode(200)
  async unlockSensor(@Body() input: { gyroscope: string, accelerometer: string }): Promise<{}> {
    return await this.appService.unlockSensor(input);
  }

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() input: UserModelInput): Promise<{}> {
    return await this.appService.loginUser(input);
  }
}
