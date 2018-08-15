import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { dropDownAnimate } from '../../../utils/animations';
import * as _ from 'underscore';
import { IlistSort, listSort } from './list-sort';
import { NoteService } from '../../../services/note.service';
import { Note } from '../../../interfaces/note';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../../../components/login/login.component';

export interface IQueryParams {
    search_keywords: string;
    filter: string;
    page?: number;
    per_page?: number;
}

@Component({
    selector: 'app-note-index',
    templateUrl: './note-index.component.html',
    styleUrls: ['./note-index.component.scss'],
    animations: [ dropDownAnimate ],
    encapsulation: ViewEncapsulation.None
})
export class NoteIndexComponent implements OnInit {
    listSort: IlistSort[] = listSort;
    selectedSort: IlistSort;
    selectedItem: Note = null;
    toggleMenu = false;
    searchVal = '';
    notes: Note[] = [];
    pendingNotes = false;
    pendingUpdateNote = false;
    constructor(
        private noteService: NoteService,
        private snackBar: MatSnackBar
    ) {}

   get stateAnimate() {
        return this.toggleMenu ? 'active' : 'inactive';
    }

   get queryParams(): IQueryParams {
        return {
            search_keywords: this.searchVal,
            filter: this.selectedSort.val,
            page: 0,
            per_page: 10
        };
   }

    ngOnInit() {
        this.selectedSort = _.first(this.listSort);
        this.getNotes(this.queryParams);
    }

    selectSortItem(selected: IlistSort) {
        this.selectedSort = selected;
        this.selectedItem = null;
        this.toggleMenu = false;
        this.getNotes(this.queryParams);
    }

    selectItem({ item }) {
        this.selectedItem = item;
    }

    getNotes(params: IQueryParams) {
        this.pendingNotes = true;
        this.noteService.getNotes(params).subscribe((res: Note[]|any) => {
            console.log(res);
            this.notes = res
                .sort((note1: Note, note2: Note) => {
                    return note1.position > note2.position ? 1 : -1;
                });
                // .sort((note1: Note): number => {
                //     return note1.archived ? 1 : -1;
                // });
            this.pendingNotes = false;
        });
    }

    updateItem({ item }) {
        this.pendingUpdateNote = true;
        this.noteService.updateNote(item).subscribe(() => {
            this.pendingUpdateNote = false;
            this.snackBar.openFromComponent(SnackBarComponent,{
                data: {
                    type: 'success',
                    message: `Note with id: ${item.id} was successful updated`
                }
            });
        });
    }
}
