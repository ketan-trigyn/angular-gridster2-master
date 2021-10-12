import { Component, Input, OnInit } from '@angular/core';
import { widget } from '../models/dashboard_model';

@Component({
    template: ``,
})

export class DashboardCardContainer implements OnInit {
    @Input() item:widget;

    /**
     *
     */
    constructor() {

    }

    ngOnInit() {
        console.log(this.item);
    }


}
