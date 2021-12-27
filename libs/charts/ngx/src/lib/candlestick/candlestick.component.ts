import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { BotService } from '@new-trader/bot/ngx';
import { from } from 'rxjs';
@Component({
  selector: 'new-trader-candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.scss']
})
export class CandlestickComponent implements OnInit {
  @Input() coinOne?: string;
  @Input() coinTwo?: string;
  chartOption: EChartsOption = {}
  rawData: any;
  candleStickDataSet?: number[][];
  dates?: string[]
  constructor(private botService: BotService) { 
    this.coinOne="ETH"
    this.coinTwo="BTC"
    if(this.coinOne && this.coinTwo){
      console.log('get data')
      this.rawData = from(this.botService.getData())
      this.rawData.subscribe( (y: any[])=>{
        this.candleStickDataSet = y.map((x: { close: string; open: string; low: string; high: string; }) =>{ console.log(x ); return [
          Number(x.close), 
          Number(x.open), 
          Number(x.low),
          Number(x.high)
        ]})
        this.dates = y.map((x: { openTime: string | number | Date; }) =>{return new Date(x.openTime).toISOString()})
        console.log(this.dates)
        console.log(this.candleStickDataSet)
        const end = this.candleStickDataSet.length - 1
        const start = end - 30
        this.chartOption = {
          xAxis: {
            data: this.dates.slice(start,end)
          },
          yAxis: {
          },
          series: [
            {
              type: 'candlestick',
              data: this.candleStickDataSet.slice(start,end)
            }
          ]
        };

      })

    }

    console.log('nothing')
  }

  ngOnInit(): void {
    console.log('candlestick initialized')
  }

}
