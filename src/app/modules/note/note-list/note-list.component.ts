import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Note } from '../../../interfaces/note';
import * as moment from 'moment';

@Component({
    selector: 'app-note-list',
    templateUrl: './note-list.component.html',
    styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
    @Output() selectedItem = new EventEmitter<any>();
    @Input() notes: Note[] = [];
    defaultTitle = 'Note title';
    defaultContent = 'Some detail here';
    moment = moment;
    constructor() { }

    ngOnInit() {}

}
