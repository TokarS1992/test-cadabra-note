import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        MatMenuModule,
        MatSnackBarModule,
        MatInputModule,
        MatDatepickerModule,
        MatProgressSpinnerModule
    ],
    declarations: []
})
export class MaterialModule { }
