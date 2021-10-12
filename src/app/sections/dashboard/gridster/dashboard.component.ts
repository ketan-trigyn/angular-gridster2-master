import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Inject,
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
import { single } from '../../../data';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
export interface DialogData {
  id: string,
  cols: number,
  rows: number,
  x: number,
  y: number,
  chartType: string
}


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

  constructor(public dialog: MatDialog) {
    Object.assign(this, { single })
  }



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

  ngOnInit(): void {
    this.options = {
      gridType: GridType.Fit,
      compactType: CompactType.None,
      pushItems: true,
      displayGrid: DisplayGrid.None,
      disableScrollHorizontal: true,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
    };

    this.dashboard = [
      // { cols: 2, rows: 1, y: 0, x: 0,chartType:'bar' },
      // { cols: 2, rows: 1, y: 0, x: 0,chartType:'treemap' },

    ];

  }

  charts = [{ 'name': 'bar' }, { 'name': 'treemap' }, { 'name': 'gauge' }, { 'name': 'pie' }];
  chartSelected = 'bar';

  changedOptions(): void {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  removeItem($event: MouseEvent | TouchEvent, item: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }
  editDialog(dataWidget) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      width: '250px',
      data: dataWidget
    });

    dialogRef.afterClosed().subscribe(result => {
      let existWidget = this.dashboard.find(a => a.id == result.id);

      console.log(existWidget);
      if (existWidget) {
        existWidget.rows = result.rows,
          existWidget.x = result.x,
          existWidget.y = result.y,
          existWidget.chartType = result.chartType,
          existWidget.id = result.id
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog,);

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      setTimeout(() => {                           // <<<---using ()=> syntax
        this.dashboard.push(result);
      }, 100);

      //this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1,chartType:'bar' });

    });
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

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
  modelWidget = {
    cols: 1,
    rows: 2,
    x: 0,
    y: 0,
    chartType: 'bar',
    id: this.guidGenerator()
  }

  charts = [{ 'name': 'bar' }, { 'name': 'treemap' }, { 'name': 'gauge' }, { 'name': 'pie' }];
  chartSelected = 'bar';

  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    if (data) {
      this.modelWidget.cols = data.cols,
        this.modelWidget.rows = data.rows,
        this.modelWidget.x = data.x,
        this.modelWidget.y = data.y,
        this.modelWidget.chartType = data.chartType,
        this.modelWidget.id = data.id
    }

  }

  guidGenerator() {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  }


}
