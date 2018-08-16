import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
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

const filterBy = (key: string, item: any) => {
    return function (el: any) {
        return el[key] !== item[key];
    };
};

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
    selectedItem: Note|object = {};
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

    handleSearch(input?: HTMLInputElement) {
        this.getNotes(this.queryParams);
    }

    selectSortItem(selected: IlistSort) {
        this.selectedSort = selected;
        this.toggleMenu = false;
        this.getNotes(this.queryParams);
    }

    selectItem({ item }) {
        this.selectedItem = item;
    }

    addNewNote() {
        const maxPos: Note|any = this.notes.length > 0 ? _.max(this.notes, (note: Note) => {
           return note.position;
        }) : { position : 1 };

        this.notes.unshift({
            due_date: null,
            text: '',
            title: '',
            archived: false,
            position: maxPos.position++
        });

        this.selectedItem = _.first(this.notes);
    }

    removeNote({ item }) {
        if (item.id) {
            this.pendingNotes = true;
            this.pendingUpdateNote = true;
            this.noteService.deteleNote(item.id).subscribe(res => {
                this.pendingNotes = false;
                this.pendingUpdateNote = false;
                this.notes = _.filter(this.notes, filterBy('id', item));

                this.snackBar.openFromComponent(SnackBarComponent,{
                    data: {
                        type: 'success',
                        message: `Note with id: ${item.id} successful deleted`
                    }
                });
            });
        } else {
            this.notes = _.filter(this.notes, filterBy('position', item));
        }
        this.selectedItem = {};
    }

    createNote({ item }) {
        this.pendingUpdateNote = true;
        delete item.position;

        this.noteService.creteNote(item).subscribe((res: Note) => {
            this.selectedItem = res;
            this.pendingUpdateNote = false;

            this.notes = _.map(this.notes, (note) => {
               if (!note.id && note.position === item.position) {
                   note = res;
               }
               return note;
            });

            console.log(this.notes);

            this.snackBar.openFromComponent(SnackBarComponent,{
                data: {
                    type: 'success',
                    message: `Note was successful created`
                }
            });
        });
    }

    getNotes(params: IQueryParams) {
        this.pendingNotes = true;
        if (!_.isEmpty(this.selectedItem)) this.pendingUpdateNote = true;

        this.noteService.getNotes(params).subscribe((res: Note[]|any) => {
            console.log(res);
            this.selectedItem = {};
            this.pendingUpdateNote = false;
            this.notes = res
                .sort((note1: Note, note2: Note) => {
                    return note1.position > note2.position ? 1 : -1;
                });
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
