import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import secrets from '@secrets';
import { from, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import {
  distinctUntilChanged,
  shareReplay,
  switchMap,
  map,
} from 'rxjs/operators';
import { RSI } from 'technicalindicators';

@Injectable({
  providedIn: 'root',
})
export class BotService {
  baseUrl = "https://api.binance.com/api/v3"
  client = {
    apiKey: secrets.binance.apiKey,
    apiSecret: secrets.binance.apiSecret,
  };


  //if a position is currently held by the bot
  holding: boolean;

  // THe stock data recieved this period
  window: any[];
  constructor(private http: HttpClient) {
    this.http = http;
    this.holding = false;
    this.window = [];
  }

  readonly tradingPair = new Subject<string>();
  readonly tradingData: Observable<any> = this.tradingPair.pipe(
    distinctUntilChanged(_.isEqual),
    switchMap((pair) =>
     this.http.get(`${this.baseUrl}/klines?symbol=${pair}&interval=1w`)
    ),
    shareReplay()
  );

  launchBot(pair: string, algorithm: any) {
    //return this.client.ws.candles(pair, '1m', (x) => {
    //  this.algo1(x);
    //});
  }

  getExchangeInfo() {
    return from(
      this.http.get(`${this.baseUrl}/exchangeInfo`).pipe(map((data: any) => {
        console.log(data);
        return data.symbols
          .filter((x: { status: string; }) => {
            return x.status === 'TRADING';
          })
          .map((x: { symbol: any; baseAsset: any; quoteAsset: any; }) => {
            return {
              symbol: x.symbol,
              baseAsset: x.baseAsset,
              quoteAsset: x.quoteAsset,
            };
          });
      })
      )
    );
  }

  async buy(symbol: string) {
    try {
      // await this.client.accountInfo();
    } catch (e) {
      console.log(e);
    }

    // this.client.orderTest({
    //   symbol: 'XLMETH',
    //   side: 'BUY',
    //   quantity: '100',
    //   price: '0.0002',
    //   type: OrderType.MARKET,
    // });

    // from(
    //   this.client.order({
    //     symbol: 'XLMETH',
    //     side: 'BUY',
    //     quantity: '100',
    //     price: '0.0002',
    //   })
    // ).subscribe((x) => {
    //   console.log(x);
    // });
  }

  async algo1(data: any) {
    this.window.push(data);
    console.log(this.window);

    const closingPrices = this.window.map((x) => {
      return Number(x.close);
    });
    let indicator = 'HOLD';
    if (this.window.length > 14) {
      const lastRSI = RSI.calculate({
        values: closingPrices,
        period: 14,
      }).pop();
      if (lastRSI) {
        if (lastRSI > 70) {
          indicator = 'SELL';
        } else if (lastRSI < 30) {
          indicator = 'BUY';
        }
      }
    }

    if (this.holding && indicator === 'SELL') {
      console.log('EXECUTE SELL');

      this.holding = !this.holding;
    } else if (!this.holding) {
      console.log('EXECUTE BUY');
      // await this.client.orderTest({
      //    symbol: 'XLMETH',
      //   side: 'BUY',
      //   quantity: '100',
      //   price: '0.0002',
      //   type: OrderType.MARKET,
        
      // })


      this.holding = !this.holding;
    }
  }

  algo2(data: any) {
    console.log('algorithm 2');
    console.log(data);
  }

  algo3(data: any) {
    console.log('algorithm 3');
    console.log(data);
  }
}
