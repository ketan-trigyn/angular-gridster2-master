import { Component, OnInit } from "@angular/core";
import { DashboardApiService } from "src/app/services/dashboard-api.service";
import { DashboardCardContainer } from '../../dashboard/dashboard-card/dashboard-card.container';

@Component({
  template: `
      <app-bar-chart [data]='chartData'></app-bar-chart>
    `,
})


export class BarChartContiner extends DashboardCardContainer implements OnInit {

  public chartData:any;

  /**
   *
   */
  constructor(private service: DashboardApiService) {
    super();

  }

  loadChartData(name) {
    this.service.loadWidgetData(name).subscribe((data) => {
      this.chartData = data.values.map(ele => {
        return {
           'name':ele.category,
           'value':ele.value
        }
      })
      console.log(this.chartData);
    })
  }

  ngOnInit() {
    if (this.item) {
      this.loadChartData(this.item.name);
    }
  }

}