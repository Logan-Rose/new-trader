import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Binance from 'binance-api-node';
import { MainClient, WebsocketClient } from 'binance';
import secrets from '@secrets';
import { from, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import {
  distinctUntilChanged,
  shareReplay,
  tap,
  switchMap,
} from 'rxjs/operators';
import { RSI } from 'technicalindicators';

@Injectable({
  providedIn: 'root',
})
export class BotService {
  client = new MainClient({
    api_key: secrets.binance.apiKey,
    api_secret: secrets.binance.apiSecret,
  });
  socket = new WebsocketClient({
    api_key: secrets.binance.apiKey,
    api_secret: secrets.binance.apiSecret,
    beautify: true,
  });

  //if a position is currently held by the bot
  holding: boolean;

  // THe stock data recieved this period
  window: any[];

  constructor(private http: HttpClient) {
    this.holding = false;
    this.window = [];
  }

  readonly tradingPair = new Subject<string>();
  readonly tradingData: Observable<any> = this.tradingPair.pipe(
    distinctUntilChanged(_.isEqual),
    switchMap((pair) =>
      from(this.client.getKlines({ symbol: pair, interval: '1w' }))
    ),
    shareReplay()
  );

  launchBot(pair: string, algorithm: any) {
    return this.socket.subscribeKlines(pair, '1m', 'spot');
  }

  getExchangeInfo() {
    return from(
      this.client.getExchangeInfo().then((data) => {
        return data.symbols
          .filter((x) => {
            return x.status === 'TRADING';
          })
          .map((x) => {
            return {
              symbol: x.symbol,
              baseAsset: x.baseAsset,
              quoteAsset: x.quoteAsset,
            };
          });
      })
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

  algo1(data: any) {
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
