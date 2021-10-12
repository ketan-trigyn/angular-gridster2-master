import { Component, OnInit, ViewChildren, QueryList, Inject, ViewChild, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { CdkDropList, CdkDragDrop, CdkDragEnter, moveItemInArray } from '@angular/cdk/drag-drop';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { single } from '../../../data';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DragulaService } from 'ng2-dragula';

export interface DialogData {
  id: string,
  cols: number,
  rows: number,
  x: number,
  y: number,
  chartType: string
}
const COLORS = [
  '#ea4335',
  '#4285f4',
  '#fbbc04',
  '#34a853',
  '#fa7b17',
  '#f538a0',
  '#a142f4',
  '#24c1e0',
  '#9aa0a6',
  '#5195ea',
  '#e25142',
  '#f5c518',
  '#41af6a',
  '#f6aea9',
  '#a50e0e',
  '#aecbfa',
  '#174ea6',
  '#fde293',
  '#a8dab5',
  '#0d652d',
  '#fdc69c',
  '#fba9d6',
  '#c92786',
  '#d7aefb',
  '#8430ce',
  '#a1e4f2',
  '#007b83',
  '#e8eaed',
  '#b9d4f6',
  '#f3b9b3',
  '#fbe7a2',
  '#b3dfc3',
]

function getColor() {
  return COLORS[Math.floor(Math.random() * 32)];
}
@Component({
  selector: 'app-dashboard-new',
  templateUrl: './dashboard-new.component.html',
  styleUrls: ['./dashboard-new.component.css']
})
export class DashboardNewComponent implements OnInit {

  dropped($event: CdkDragDrop<string>) {
    console.log($event);
  }

  entered($event: CdkDragEnter) {
    console.log($event.item.data, $event.container.data);
    moveItemInArray(this.cards, $event.item.data, $event.container.data);
  }
  entered2($event: CdkDragEnter) {
    console.log($event.item.data, $event.container.data);
    moveItemInArray(this.cards, $event.item.data, $event.container.data);
  }

  @ViewChildren(CdkDropList) dropsQuery: QueryList<CdkDropList>;

  drops: CdkDropList[];

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
  @ViewChild('containerRef') elementView: ElementRef;
  ngAfterViewInit() {
    // if (this.elementView) {
    //   let height = this.elementView.nativeElement.offsetHeight
    // }

    this.dropsQuery.changes.subscribe(() => {
      this.drops = this.dropsQuery.toArray()
    })
    Promise.resolve().then(() => {
      this.drops = this.dropsQuery.toArray();
      console.log(this.drops);
    })
  }

  /** Based on the screen size, switch from standard to one column per row */
  cards = [
    { title: 'Card 1', cols: 2, rows: 2, color: getColor() },
    { title: 'Card 2', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 3', cols: 3, rows: 1, color: getColor() },
    { title: 'Card 4', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 5', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 6', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 7', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 8', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 9', cols: 1, rows: 3, color: getColor() },
    { title: 'Card 10', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 11', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 12', cols: 2, rows: 1, color: getColor() },
    { title: 'Card 13', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 14', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 15', cols: 1, rows: 2, color: getColor() },
    { title: 'Card 16', cols: 2, rows: 1, color: getColor() },
    { title: 'Card 17', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 18', cols: 2, rows: 1, color: getColor() },
    { title: 'Card 19', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 20', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 21', cols: 1, rows: 1, color: getColor() },
    /* { title: 'Card 22', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 23', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 24', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 25', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 26', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 27', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 28', cols: 1, rows: 1, color: getColor() },
    { title: 'Card 29', cols: 1, rows: 1, color: getColor() } */
  ];

  isCardExpanded = false;
  expand(item) {
    //  debugger;
    item.isCardExpanded = !item.isCardExpanded;
  }

  single: any[];
  multi: any[];
  view: any[];
  dashboard: any[];

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

  constructor(public dialog: MatDialog, private cdr: ChangeDetectorRef, private dragulaService: DragulaService) {
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

    this.dragulaService.createGroup('DRAGULA_CONTAINER', {});
    this.dashboard = [
      // { cols: 2, rows: 1, y: 0, x: 0,chartType:'bar' },
      // { cols: 2, rows: 1, y: 0, x: 0,chartType:'treemap' },

    ];

  }

  charts = [{ 'name': 'bar' }, { 'name': 'treemap' }, { 'name': 'gauge' }, { 'name': 'pie' }];
  chartSelected = 'bar';



  removeItem($event: MouseEvent | TouchEvent, item: any): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem(): void {
    this.dashboard.push({ x: 0, y: 0, cols: 1, rows: 1 });
  }
  editDialog(dataWidget) {
    const dialogRef = this.dialog.open(DialogContent, {
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
    const dialogRef = this.dialog.open(DialogContent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        // this.dashboard.push(result);
        let data = { x: result.x, y: result.y, chartType: result.chartType, id: result.id };
        this.dashboard = [...this.dashboard, data];
        this.cdr.detectChanges();
      }
    });



  }
}


@Component({
  selector: 'dialog-content',
  templateUrl: 'dialog-content.html',
})
export class DialogContent {
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
    public dialogRef: MatDialogRef<DialogContent>,
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

