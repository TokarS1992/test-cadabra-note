import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AbstructHttp } from '../utils/abstractHttp';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import 'rxjs-compat';
import { Note } from '../interfaces/note';
import { IQueryParams } from '../modules/note/note-index/note-index.component';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
    headers: HttpHeaders;
    options: any;
    constructor(
      private http: HttpClient
    ) {
        this.headers = new HttpHeaders(AbstructHttp.getAccessControls());
        this.options = { withCredentials: true, observe: 'response', headers: this.headers};
    }

    getNotes(data: IQueryParams): Observable<Note[]|any[]> {
        if (data.search_keywords) data.filter = 'active';
        this.options.params = data;

        return this.http.get('notes', this.options).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            })
        );
    }

    deteleNote(id: number): Observable<Note[]|any[]> {
        return this.http.delete(`notes/${id}`, this.options).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            })
        );
    }

    creteNote(data: Note): Observable<any> {
        const body = AbstructHttp.bodyToFormData(data);
        return this.http.post(`notes`, body, this.options).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            })
        );
    }

    updateNote(data: Note): Observable<any> {
        const body = AbstructHttp.bodyToFormData(data);
        return this.http.put(`notes/${data.id}`, body, this.options).pipe(
            map((res: HttpResponse<any>) => {
                return res;
            })
        );
    }
}
