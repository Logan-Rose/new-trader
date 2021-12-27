import { Injectable } from '@nestjs/common';
import Binance from 'binance-api-node'
import * as secrets from '@secrets'
@Injectable()
export class BotService {
  client = Binance({
    apiKey: secrets.binance.apiKey,
    apiSecret: secrets.binance.apiSecret,
  })
  sayHello(){
    return 'hello'
  }


}
