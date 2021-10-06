import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  CompactType,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridsterPush,
  GridType,
  DisplayGrid
} from 'angular-gridster2';
import { single } from '../../data';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 

  options: GridsterConfig;
  dashboard: GridsterItem[];
  itemToPush: GridsterItemComponent;
  single: any[];
  multi: any[];
  view: any[];

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

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  labelFormatting(c) {
    return `${(c.label)} Population`;
  }

  charts=[{'name':'bar'},{'name':'treemap'},{'name':'gauge'},{'name':'pie'}];
  chartSelected='bar';

  constructor() {
    Object.assign(this, { single })
  }

  onSelect(event) {
    console.log(event);
  }

  onOptionsSelected(data){
    debugger;
    console.log(data);
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      pushItems: true,
      displayGrid: DisplayGrid.None,
      disableScrollHorizontal:true,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
    };

    this.dashboard = [
      { cols: 2, rows: 1, y: 0, x: 0},
      { cols: 2, rows: 1, y: 0, x: 2 },
     
    ];

  }

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item:any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 2, rows:1 });
  }

  initItem(item: GridsterItem, itemComponent: GridsterItemComponent): void {
    this.itemToPush = itemComponent;
  }

  pushItem(): void {
    const push = new GridsterPush(this.itemToPush); // init the service
    this.itemToPush.$item.rows += 4; // move/resize your item
    if (push.pushItems(push.fromNorth)) {
      // push items from a direction
      push.checkPushBack(); // check for items can restore to original position
      push.setPushedItems(); // save the items pushed
      this.itemToPush.setSize();
      this.itemToPush.checkItemChanges(
        this.itemToPush.$item,
        this.itemToPush.item
      );
    } else {
      this.itemToPush.$item.rows -= 4;
      push.restoreItems(); // restore to initial state the pushed items
    }
    push.destroy(); // destroy push instance
    // similar for GridsterPushResize and GridsterSwap
  }

  getItemComponent(): void {
    if (this.options.api && this.options.api.getItemComponent) {
      console.log(this.options.api.getItemComponent(this.dashboard[0]));
    }
  }

}
