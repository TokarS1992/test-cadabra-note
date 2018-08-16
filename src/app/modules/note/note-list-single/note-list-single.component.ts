import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Note } from '../../../interfaces/note';
import * as _ from 'underscore';

@Component({
  selector: 'app-note-list-single',
  templateUrl: './note-list-single.component.html',
  styleUrls: ['./note-list-single.component.scss']
})
export class NoteListSingleComponent implements OnInit {
    @Input() currentItem: Note = null;
    @Output() updateItem = new EventEmitter<any>();
    @Output() createItem = new EventEmitter<any>();
    constructor() { }

    get isEmptyItem() {
        return _.isEmpty(this.currentItem);
    }

    ngOnInit() {
    }

    update() {
        this.updateItem.emit({ item: this.currentItem });
    }

    create() {
        this.createItem.emit({ item: this.currentItem });
    }

}
