/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get } from '@nestjs/common';
import { BotService } from './bot.service';

@Controller('bot')
export class BotController {
  constructor(private botService: BotService){}

  @Get()
  sayHello(){
    console.log('HELLO FROM THE OTHER SIDE')
    return this.botService.sayHello();
  }

}
