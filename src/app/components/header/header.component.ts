import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { dropDownAnimate } from '../../utils/animations';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    animations: [ dropDownAnimate ]
})
export class HeaderComponent implements OnInit {
    @Input() titleView = 'Note app';
    toggleMenu = false;
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    get currentUser() {
        const currentUser = localStorage.getItem('currentUser');
        return currentUser ? JSON.parse(currentUser) : null;
    }

    get stateAnimate() {
        return this.toggleMenu ? 'active' : 'inactive';
    }

    ngOnInit() {}

    logout() {
        this.authService.logout().subscribe((status) => {
            this.router.navigate(['/login']).then(() => {
                this.toggleMenu = false;
            });
        });
    }
}
