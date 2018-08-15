import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Note } from '../../../interfaces/note';

@Component({
  selector: 'app-note-list-single',
  templateUrl: './note-list-single.component.html',
  styleUrls: ['./note-list-single.component.scss']
})
export class NoteListSingleComponent implements OnInit {
    @Input() currentItem: Note = null;
    @Output() updateItem = new EventEmitter<any>();
    constructor() { }

    ngOnInit() {
    }

    update() {
        this.updateItem.emit({ item: this.currentItem });
    }

}
