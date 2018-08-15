import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { dropDownAnimate } from '../../../utils/animations';
import * as _ from 'underscore';
import { IlistSort, listSort } from './list-sort';
import { NoteService } from '../../../services/note.service';
import { Note } from '../../../interfaces/note';

export interface IQueryParams {
    search_keywords: string;
    filter: string;
    page: number;
    per_page: number;
}

@Component({
    selector: 'app-note-index',
    templateUrl: './note-index.component.html',
    styleUrls: ['./note-index.component.scss'],
    animations: [ dropDownAnimate ]
})
export class NoteIndexComponent implements OnInit {
    listSort: IlistSort[] = listSort;
    selectedSort: IlistSort;
    toggleMenu = false;
    searchVal = '';
    notes: Note[] = [];
    constructor(
        private noteService: NoteService
    ) {}

   get stateAnimate() {
        return this.toggleMenu ? 'active' : 'inactive';
    }

   get queryParams(): IQueryParams {
        return {
            search_keywords: this.searchVal,
            filter: this.selectedSort.val,
            page: 0,
            per_page: 0
        };
   }
   // set queryParams(val) {
   //      return {
   //
   //      }
   // }

    ngOnInit() {
        this.selectedSort = _.first(this.listSort);
        this.getNotes(this.queryParams);
    }

    selectSortItem(selected: IlistSort) {
        this.selectedSort = selected;
        this.toggleMenu = false;
    }

    getNotes(params: IQueryParams) {
        this.noteService.getNotes(params).subscribe((res: Note[]|any[]) => {
            console.log(res);
            this.notes = res;
        });
    }
}
