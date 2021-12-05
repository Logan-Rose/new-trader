import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  coins: string[];
  algorithms: string[];

  form = new FormGroup({
    "coinOne": new FormControl("", Validators.required),
    "coinTwo": new FormControl("", Validators.required),
    "algorithm": new FormControl("", Validators.required),
});

  constructor() {
    this.coins = ['BTC','ETH','LTC','BNB','USDT', 'ADA', 'XRP']
    this.algorithms = ['algo 1','algo 2','algo 3','algo 4','algo 5']

   }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log('launch')
    console.log(this.form);
  }
}
