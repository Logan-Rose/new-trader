import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReconnectingWebSocketHandler } from 'binance-api-node';
import { BotService } from '../service/bot.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'new-trader-bot-interface',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss'],
})
export class BotComponent implements OnInit {
  @Output() pair = new BehaviorSubject<string>('ETHBTC');
  coins!: string[];
  algorithms!: { name: string; function: any }[];
  pairs?: Observable<
    {
      symbol: string;
      baseAsset: string;
      quoteAsset: string;
    }[]
  >;

  pairControl = new FormControl();

  form = new FormGroup({
    pair: this.pairControl,
    algorithm: new FormControl('', Validators.required),
  });
  bot?: ReconnectingWebSocketHandler;
  dates: string[] | undefined;
  candleStickDataSet: number[][] | undefined;
  rawData: Observable<any> | undefined;

  constructor(private botService: BotService) {}

  ngOnInit(): void {
    const pairObservable = this.pairControl.valueChanges;
    pairObservable.subscribe(this.pair);

    this.algorithms = [
      { name: 'algo 1', function: this.botService.algo1 },
      { name: 'algo 2', function: this.botService.algo2 },
      { name: 'algo 3', function: this.botService.algo3 },
    ];
    this.pairs = this.botService.getExchangeInfo();
  }

  launchBot() {
    console.log('Initializing Bot');
    console.log(this.form.value);
    this.bot = this.botService.launchBot(
      this.form.value.pair,
      this.form.value.algorithm
    );
  }

  killBot() {
    if (this.bot) {
      console.log('Killing Bot');
      this.bot();
    } else {
      console.log('No Bot launched');
    }
  }
  buy() {
    this.botService.buy(this.pair.value);
  }
}
