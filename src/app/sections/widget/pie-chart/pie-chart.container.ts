import { Component, OnInit } from "@angular/core";
import { DashboardApiService } from "src/app/services/dashboard-api.service";
import { DashboardCardContainer } from '../../dashboard/dashboard-card/dashboard-card.container';
import { PieChartModel } from "../../dashboard/models/widgetModels";

@Component({
  template: `
      <app-pie-chart [data]='chartData'></app-pie-chart>
    `,
})


export class PieChartContainer extends DashboardCardContainer implements OnInit {

  public chartData: PieChartModel;

  constructor(private service: DashboardApiService) {
    super();

  }

  ngOnInit() {
    if (this.item) {
      this.loadChartData(this.item.name);
    }
  }



  loadChartData(name) {
    this.service.loadWidgetData(name).subscribe((data) => {

      this.chartData = {
        'value': [{
          'name': data.name,
          'value': data.values
        }],
        'total': data.totalValue
      }

      console.log(this.chartData);
    })
  }

}