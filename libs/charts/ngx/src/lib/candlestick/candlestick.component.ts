import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BotService } from '@new-trader/bot/ngx';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'new-trader-candlestick',
  template: '<div echarts [options]="chartOption" class="chart"></div>',
  styleUrls: ['./candlestick.component.scss'],
})
export class CandlestickComponent implements OnInit {
  @Input() pair? = new BehaviorSubject<string>('ETHBTC');
  chartOption: EChartsOption = {};
  rawData: any;
  candleStickDataSet?: number[][];
  dates?: string[];
  constructor(private botService: BotService) {}

  ngOnInit(): void {
    this.pair?.subscribe((x) => {
      this.botService.tradingPair.next(x);
      this.rawData = this.botService.tradingData;
      this.rawData.subscribe((y: any[]) => {
        this.candleStickDataSet = y.map((x) => {
          return [
            Number(x[4]), // Close
            Number(x[1]), // Open
            Number(x[3]), // Low
            Number(x[2]), // High
          ];
        });
        console.log(y)
        this.dates = y.map((x) => {
          return new Date(x[0]).toISOString().split('T')[0];
        });
        // console.log(this.dates);
        // console.log(this.candleStickDataSet);
        const end = this.candleStickDataSet.length - 1;
        const start = end - 30;
        this.chartOption = {
          title: {
            text: 'Candlestick Data',
            left: 'center',
          },
          tooltip: {
            show: true,
          },
          xAxis: {
            data: this.dates.slice(start, end),
          },
          yAxis: {},
          series: [
            {
              type: 'candlestick',
              data: this.candleStickDataSet.slice(start, end),
            },
          ],
        };
      });
    });
  }
}
