import { Component, Input, OnInit } from '@angular/core';
import { single } from '../../../data';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  @Input() data;
  single: any[];
  multi: any[];
  view: any[];
  dashboard: any[];

  constructor() {
    Object.assign(this, { single })
   }

  ngOnInit(): void {
  }

  // options
  showXAxis = true;
  showYAxis = true;
  // options
  gradient: boolean = false;
  animations: boolean = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  timeline: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  legend: boolean = true;
  legendPosition = 'below';

  labelFormatting(c) {
    return `${(c.label)} Population`;
  }

  onSelect(event) {
    console.log(event);
  }

  onOptionsSelected(data) {
    console.log(data);
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
