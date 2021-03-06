import { Module } from '@nestjs/common';
import { BotModule } from '@trader/bot/nestjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
