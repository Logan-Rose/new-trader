import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReconnectingWebSocketHandler } from 'binance-api-node';
import { BotService } from '../service/bot.service';
import { from, Observable } from 'rxjs';
@Component({
  selector: 'new-trader-bot-interface',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent implements OnInit {
  coins: string[];
  algorithms: string[];

  form = new FormGroup({
    "coinOne": new FormControl("", Validators.required),
    "coinTwo": new FormControl("", Validators.required),
    "algorithm": new FormControl("", Validators.required),
});
  bot?: ReconnectingWebSocketHandler;
  dates: string[] | undefined;
  candleStickDataSet: number[][] | undefined;
  rawData: Observable<any> | undefined
  constructor(
    private botService: BotService
  ) {
    this.coins = ['BTC','ETH','LTC','BNB','USDT', 'ADA', 'XRP']
    this.algorithms = ['algo 1','algo 2','algo 3','algo 4','algo 5']


   }

  ngOnInit(): void {
    console.log('initialized')
  }

  launchBot(){
    console.log('Initializing Bot')
    console.log(this.form.value);
    this.bot = this.botService.launchBot(this.form.value.coinOne, this.form.value.coinTwo, this.form.value.algorithm)
  }

  killBot(){
    if(this.bot){
      console.log('Killing Bot')
      this.bot()
    } else{
      console.log('No Bot launched')
    }
  }

  getData(){
    console.log('dd')
  }


}
