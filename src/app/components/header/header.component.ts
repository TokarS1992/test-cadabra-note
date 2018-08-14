import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() titleView = 'Note app';
    toggleMenu = false;
    constructor() { }

    get currentUser() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
    }

    handleClickMenu() {
        this.toggleMenu = !this.toggleMenu;
    }
}
