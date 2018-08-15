import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatMenuModule,
        MatSnackBarModule,
        MatInputModule,
        MatDatepickerModule,
        MatProgressSpinnerModule
    ],
    declarations: []
})
export class MaterialModule { }
