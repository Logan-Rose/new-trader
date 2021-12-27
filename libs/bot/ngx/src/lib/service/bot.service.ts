import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Binance from 'binance-api-node'
import secrets from '@secrets'
@Injectable({
  providedIn: 'root'
})
export class BotService {
  client = Binance({
    apiKey: secrets.binance.apiKey,
    apiSecret: secrets.binance.apiSecret,
  })
  constructor(
    private http: HttpClient
  ) { 
    console.log('Bot Service Launched')
  }

  launchBot(coinOne: string, coinTwo:string , algorithm: string){
    return this.client.ws.candles('ETHBTC', '1m', candle => {
      console.log(candle)
    })
  }

  getData(){
    const startTime =  new Date().getTime();
    const endTime = new Date('2020-12-01').getTime();

    console.log( startTime);
    console.log(endTime)

    return this.client.candles({ symbol: 'BTCUSDT', interval:'1w', })
  }
}
