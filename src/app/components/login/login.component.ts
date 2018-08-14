import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AbstructForm } from '../../utils/abstructForm';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material';
import { User } from '../../interfaces/user';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LoginComponent extends AbstructForm implements OnInit {
    formLogin: FormGroup;
    errorCredentials: string;
    pending = false;
    constructor(
        private authService: AuthService,
        private router: Router,
        public snackBar: MatSnackBar
    ) {
        super();
    }
    ngOnInit() {
        this.formLogin = new FormGroup({
            email: this.getFormControl('', {required: true, email: true}),
            password: this.getFormControl('', {
                required: true,
                minLength: 8,
                maxLength: 16,
                pattern: `[a-zA-Z0-9]+`})
        });
    }
    login() {
        if (this.checkControlMarkAsTouched(this.formLogin)) {
            this.pending = true;
            this.authService.login(this.getValuesForm(this.formLogin)).subscribe(res => {
                this.pending = false;
                this.router.navigate(['/notes']);
            }, err => {
                this.pending = false;
                if ('status' in err) {
                    this.snackBar.openFromComponent(SnackBarComponent, {
                        data: {
                            type: 'error',
                            message: err.message[0]
                        }
                    });
                    this.errorCredentials = err.message;
                }
            });
        }
        return false;
    }
}

@Component({
    selector: 'app-snack-bar-component',
    template: `
        <div [ngClass]="{
            'snack-error': data.type === 'error',
            'snack-success': data.type === 'success'
        }">{{data.message}}</div>
    `,
    styles: [`
        .mat-snack-bar-container {
            background: none;
            box-shadow: 0 4px 20px 5px rgba(236, 8, 8, 0.1);
        }

        .snack-error {
            color: #FF7275;
        }

        .snack-success {
            color: #6bbf6c;
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class SnackBarComponent implements OnInit {
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: any
    ) {}
    ngOnInit() {}
}
