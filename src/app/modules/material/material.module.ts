import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        MatSnackBarModule,
        MatInputModule,
        MatDatepickerModule,
        MatProgressSpinnerModule
    ],
    declarations: []
})
export class MaterialModule { }
