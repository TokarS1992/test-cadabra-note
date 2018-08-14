import { Component } from '@angular/core';
import { Router, ActivationEnd, Event } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    nameView: string;
    constructor(
        private router: Router
    ) {
        this.router.events.subscribe((event: Event) => {
            if ( event instanceof ActivationEnd) {
                this.nameView = event.snapshot.data.nameView;
            }
        });
    }
}
