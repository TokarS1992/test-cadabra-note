import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Note } from '../../../interfaces/note';
import * as moment from 'moment';

@Component({
    selector: 'app-note-list-settings',
    templateUrl: './note-list-settings.component.html',
    styleUrls: ['./note-list-settings.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class NoteListSettingsComponent implements OnInit, OnChanges {
    @Output() addNewNote = new EventEmitter<any>();
    @Output() deleteNote = new EventEmitter<any>();
    @Input() currentItem: Note|any = {};
    minDate: any = moment().day(moment().day() + 1).toDate();
    selectedDate: FormControl;
    constructor() { }

    ngOnInit() {
        this.selectedDate = new FormControl(this.currentItem['due_date']);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.selectedDate = new FormControl(changes['currentItem'].currentValue.due_date);
    }

    addItem() {
        this.addNewNote.emit();
    }

    deleteItem() {
        this.deleteNote.emit({ item: this.currentItem });
    }

}
