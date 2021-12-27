import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandlestickComponent } from './candlestick/candlestick.component';
import {NgxEchartsModule} from 'ngx-echarts'
@NgModule({
  imports: [CommonModule, NgxEchartsModule],
  declarations: [
    CandlestickComponent
  ],
  exports: [
    CandlestickComponent
  ]
})
export class ChartsModule {}
