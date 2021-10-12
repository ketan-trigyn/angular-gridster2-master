import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Track } from './models/track';
import { DashboardCards } from './dashboard-cards.enum';
import { Item } from './models/item';
import { DashboardApiService } from 'src/app/services/dashboard-api.service';
import { DashboardModel, widget } from './models/dashboard_model';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    defaultState: Array<Track> = [];
    allDashboardWidget: Array<widget> = [];
    private subject = new BehaviorSubject<Array<widget>>(this.allDashboardWidget);
    tracks$ = this.subject.asObservable();

    constructor(private dashboardApiService: DashboardApiService) {
        this.getAllDashboardData();
        // this.defaultState = [
        //     {
        //         items: [
        //             {
        //                 component: DashboardCards.HELLO_WORLD,
        //                 id: 'hello-world',
        //                 isCardExpanded: false,
        //             },
        //             {
        //                 component: DashboardCards.HELLO_WORLD,
        //                 id: 'hello-world-11',
        //                 isCardExpanded: false,
        //             },
        //         ],
        //     },
        //     {
        //         items: [
        //             {
        //                 component: DashboardCards.HELLO_WORLD,
        //                 id: 'hello-world-2',
        //                 isCardExpanded: false,
        //             },
        //             {
        //                 component: DashboardCards.BAR_CHART,
        //                 id: 'bar-chart',
        //                 isCardExpanded: false,
        //             },
        //         ],
        //     },
        // ];


    }


    getAllDashboardData() {
        this.dashboardApiService.getDashboardWidgetbyRole('manager')
            .subscribe((data: any) => {
                console.log(data);
                this.allDashboardWidget = data.widgets;

                this.subject.next(this.allDashboardWidget);

                // this.loadTracksFromStorage();

                this.tracks$.subscribe(() => {
                    this.saveTracksToStorage();
                });
            })
    }

    setState = (tracks: Array<widget>) => {
        this.saveTracksToStorage();
        this.reShuffleArray(tracks);
        this.subject.next(tracks);
    };

    reShuffleArray(tracks: Array<widget>) {
        let count = 1;
        let row = 1;
        tracks.forEach((element, index) => {
            if (count > 2) {
                count = 1;
                row++;
            }
            element.column = count;
            element.row = row;
            count++;
        });
    }

    // change
    // addItem = (item: Item) => {
    //     const state = this.subject.getValue();

    //     if (state[0].items.indexOf(item) !== -1 || state[1].items.indexOf(item) !== -1) {
    //         console.warn('Item with the same id exists on the dashboard.');
    //         return;
    //     }
    //     state[0].items.length <= state[1].items.length ? state[0].items.push(item) : state[1].items.push(item);

    //     this.subject.next(state);
    // };

    removeItem = (item: widget) => {
        const state = this.subject.getValue();
        state.forEach((i, index) => {
            if (i === item) {
                state.splice(index, 1);
            }
        });
        this.subject.next(state);
    };

    loadTracksFromStorage = () => {
        const tracks = JSON.parse(localStorage.getItem('tracks') as string);
        if (tracks) {
            this.subject.next(tracks);
        }
    };

    saveTracksToStorage = () => {
        const state = this.subject.getValue();
        localStorage.setItem('tracks', JSON.stringify(state));
    };
}
