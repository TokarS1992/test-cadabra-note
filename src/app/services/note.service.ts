import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AbstructHttp } from '../utils/abstractHttp';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import 'rxjs-compat';
import { Note } from '../interfaces/note';
import * as _ from 'underscore';
import { IQueryParams } from '../modules/note/note-index/note-index.component';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
    headers: HttpHeaders;
    options: any;
    accessControls;
    constructor(
      private http: HttpClient
    ) {
        this.accessControls = AbstructHttp.getAccessControls();
    }

    getNotes(data: IQueryParams): Observable<Note[]|any[]> {
        const checkEmptyData = _.chain(data).values().compact().value();
        this.headers = new HttpHeaders(this.accessControls);
        this.options = { withCredentials: true, observe: 'response', headers: this.headers};

        if (checkEmptyData.length > 0) {
            this.options.params = data;
        }

        return this.http.get('notes', this.options).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            })
        );
    }
}
