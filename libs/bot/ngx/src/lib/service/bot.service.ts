import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Binance from 'binance-api-node';
import secrets from '@secrets';
import { from, Observable, Subject } from 'rxjs';
import * as _ from 'lodash';
import {
  distinctUntilChanged,
  shareReplay,
  tap,
  switchMap,
} from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class BotService {
  client = Binance({
    apiKey: secrets.binance.apiKey,
    apiSecret: secrets.binance.apiSecret,
  });
  constructor(private http: HttpClient) {}

  readonly tradingPair = new Subject<string>();
  readonly tradingData: Observable<any> = this.tradingPair.pipe(
    distinctUntilChanged(_.isEqual),
    switchMap((pair) =>
      from(this.client.candles({ symbol: pair, interval: '1w' }))
    ),
    shareReplay()
  );

  launchBot(pair: string, algorithm: any) {
    return this.client.ws.candles(pair, '1m', (x) => {
      this.algo1(x);
    });
  }

  getExchangeInfo() {
    return from(
      this.client.exchangeInfo().then((data) => {
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

  algo1(data: any) {
    console.log('algorithm 1');
    console.log(data);
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
