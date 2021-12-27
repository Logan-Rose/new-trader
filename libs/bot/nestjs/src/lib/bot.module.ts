import { Module } from '@nestjs/common';
import { BotController } from './bot.controller';
import { BotGateway } from './bot.gateway';
import { BotService } from './bot.service';

@Module({
  controllers: [BotController],
  providers: [BotService, BotGateway],
  exports: [],
})
export class BotModule {}
