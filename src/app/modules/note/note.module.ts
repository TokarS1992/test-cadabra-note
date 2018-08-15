import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteListSingleComponent } from './note-list-single/note-list-single.component';
import { NoteListSettingsComponent } from './note-list-settings/note-list-settings.component';
import { NoteIndexComponent } from './note-index/note-index.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [
        MaterialModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        NoteListComponent,
        NoteListSingleComponent,
        NoteListSettingsComponent
    ],
    declarations: [
        NoteListComponent,
        NoteListSingleComponent,
        NoteListSettingsComponent,
        NoteIndexComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class NoteModule { }
