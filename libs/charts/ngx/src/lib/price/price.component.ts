import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BotService } from '@new-trader/bot/ngx';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'new-trader-price-chart',
  template: '<div echarts [options]="chartOption" class="chart"></div>',
  styleUrls: ['./price.component.scss'],
})
export class PriceComponent implements OnInit {
  @Input() pair? = new BehaviorSubject<string>('ETHBTC');
  chartOption: EChartsOption = {};
  rawData: any;
  priceChartDataSet?: number[];
  dates?: string[];
  constructor(private botService: BotService) {}

  ngOnInit(): void {
    this.pair?.subscribe((x) => {
      this.botService.tradingPair.next(x);
      this.rawData = this.botService.tradingData;
      this.rawData.subscribe((y: any[]) => {
        this.priceChartDataSet = y.map(
          (x) => {
            return Number(x[4]);
          }
        );
        this.dates = y.map((x) => {
          return new Date(x[0]).toISOString().split('T')[0];
        });
        // console.log(this.dates);
        // console.log(this.priceChartDataSet);
        const end = this.priceChartDataSet.length - 1;
        const start = end - 30;
        this.chartOption = {
          title: {
            text: 'Closing Price Data',
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
              type: 'line',
              data: this.priceChartDataSet.slice(start, end),
            },
          ],
        };
      });
    });
  }
}
