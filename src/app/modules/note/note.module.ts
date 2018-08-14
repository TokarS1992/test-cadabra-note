import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteListSingleComponent } from './note-list-single/note-list-single.component';
import { NoteListSettingsComponent } from './note-list-settings/note-list-settings.component';
import { NoteListSearchComponent } from './note-list-search/note-list-search.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        NoteListComponent,
        NoteListSingleComponent,
        NoteListSettingsComponent,
        NoteListSearchComponent
    ],
    declarations: [
        NoteListComponent,
        NoteListSingleComponent,
        NoteListSettingsComponent,
        NoteListSearchComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NoteModule { }
