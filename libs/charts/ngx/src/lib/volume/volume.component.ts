import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { BotService } from '@new-trader/bot/ngx';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'new-trader-volume-chart',
  template: '<div echarts [options]="chartOption" class="chart"></div>',
  styleUrls: ['./volume.component.scss'],
})
export class VolumeComponent implements OnInit {
  @Input() pair? = new BehaviorSubject<string>('ETHBTC');
  chartOption: EChartsOption = {};
  rawData: any;
  volumeChartDataSet?: number[];
  dates?: string[];
  constructor(private botService: BotService) {}

  ngOnInit(): void {
    this.pair?.subscribe((x) => {
      console.log('get data');

      this.botService.tradingPair.next(x);
      this.rawData = this.botService.tradingData;

      this.rawData.subscribe((y: any[]) => {
        this.volumeChartDataSet = y.map((x) => {
          return Number(x.volume);
        });
        this.dates = y.map((x: { openTime: string | number | Date }) => {
          return new Date(x.openTime).toISOString().split('T')[0];
        });
        const end = this.volumeChartDataSet.length - 1;
        const start = end - 30;
        this.chartOption = {
          title: {
            text: 'Trade Volume',
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
              data: this.volumeChartDataSet.slice(start, end),
            },
          ],
        };
      });
    });
  }
}
