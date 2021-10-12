import { Component, Input, OnInit } from '@angular/core';
import { PieChartModel } from '../../dashboard/models/widgetModels';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() data:PieChartModel;

  constructor() { }

  ngOnInit(): void {
  }

  single: any[];
  view: any[] = [500, 400];

  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  onSelect(event) {
    console.log(event);
  }

}
