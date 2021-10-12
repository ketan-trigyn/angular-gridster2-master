import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DashboardApiService {

  constructor(private service: BaseApiService) { }

  getDashboardWidgetbyRole(role) {
    return this.service.getApi(`${environment.API_URL}${role}`)
  }

  loadWidgetData(name) {
    return this.service.getApi(`${environment.API_URL}widget/${name}`)
  }

}
