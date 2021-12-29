import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CandlestickComponent } from './candlestick/candlestick.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { PriceComponent } from './price/price.component';
import { VolumeComponent } from './volume/volume.component';
@NgModule({
  imports: [CommonModule, NgxEchartsModule],
  declarations: [CandlestickComponent, PriceComponent, VolumeComponent],
  exports: [CandlestickComponent, PriceComponent, VolumeComponent],
})
export class ChartsModule {}
