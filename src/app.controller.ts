import { Controller, Get, Post, HttpCode, Body } from '@nestjs/common';
import { AppService } from './app.service';

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
}
