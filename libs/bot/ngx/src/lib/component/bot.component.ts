import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BotService } from '../service/bot.service';

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

  constructor(
    private botService: BotService
  ) {
    this.coins = ['BTC','ETH','LTC','BNB','USDT', 'ADA', 'XRP']
    this.algorithms = ['algo 1','algo 2','algo 3','algo 4','algo 5']
   }

  ngOnInit(): void {
    console.log('Initializing Bot')
    this.botService.sayHello()
  }

  onSubmit(){
    console.log('launch')
    console.log(this.form);
  }
}
