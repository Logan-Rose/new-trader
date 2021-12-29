import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  pair: BehaviorSubject<string>;
  constructor() {
    this.pair = new BehaviorSubject('ETHBTC');
    console.log('Booting up');
  }
}
