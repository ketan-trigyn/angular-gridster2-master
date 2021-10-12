import { Component, OnInit, ViewChildren, QueryList, ChangeDetectorRef, ComponentFactoryResolver } from '@angular/core';
import { Track } from '../models/track';
import { DashboardOutletDirective } from '../dashboard-outlet.directive';
import { dashboardCards } from '../dashboard-cards';
import { DashboardCardContainer } from '../dashboard-card/dashboard-card.container';
import { DashboardCards } from '../dashboard-cards.enum';
import { Item } from '../models/item';
import { DashboardService } from '../dashboard.service';
import { tap } from 'rxjs/operators';
import { widget } from '../models/dashboard_model';

@Component({
  selector: 'app-dashboard-dynamic',
  templateUrl: './dashboard-dynamic.component.html',
  styleUrls: ['./dashboard-dynamic.component.css']
})
export class DashboardDynamicComponent implements OnInit {

  @ViewChildren(DashboardOutletDirective) dashboardOutlet: QueryList<DashboardOutletDirective>;

  tracks: Array<widget> = [
  ]

  constructor(private cd: ChangeDetectorRef,
    private cfr: ComponentFactoryResolver,
    private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.tracks$
      .pipe(
        tap(tracks => (this.tracks = tracks))
        /* Make sure to unsubscribe! */
      )
      .subscribe(() => {
        this.cd.detectChanges();
        this.loadContents();
      });
  }

  ngAfterViewInit() {
    this.loadContents();
  }

  loadContents = () => {
    if (!this.dashboardOutlet || !this.dashboardOutlet.length) {
      return;
    }


    this.dashboardOutlet.forEach(template => {
      this.cd.detectChanges();
      this.loadContent(template, template.item);
    });
    this.cd.detectChanges();
  };

  loadContent = (template: DashboardOutletDirective, item: widget) => {
    if (!item.name) {
      return;
    }

    const viewContainerRef = template.viewContainerRef;
    viewContainerRef.clear();
    const componentFactory = this.cfr.resolveComponentFactory(dashboardCards[item.charttype]);
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const instance = componentRef.instance as DashboardCardContainer;
    instance.item = item;
  };

  removeItem(event, item) {
    this.dashboardService.removeItem(item);
  }

  changed = (items: Array<widget>) => {
    let state = this.tracks;
    state = items as Array<widget>;
    this.dashboardService.setState(state);
  };

  

  expand(item) {
    item.isCardExpanded = !item.isCardExpanded;
  }

}
