import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
import { AbstructForm } from '../../utils/abstructForm';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from '../login/login.component';

// 3 second for redirect to view login
const timingRedirect = 3;

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent extends AbstructForm implements OnInit {
    pending = false;
    formReg: FormGroup;
    statusCreated = false;
    timer = null;
    constructor(
      private authService: AuthService,
      private router: Router,
      private counter: SharedService,
      public snackBar: MatSnackBar
    ) {
        super();
    }
    ngOnInit() {
        this.formReg = new FormGroup({
            name: this.getFormControl('', {required: true, minLength: 2, maxLength: 20}),
            email: this.getFormControl('', {required: true, email: true}),
            password: this.getFormControl('', {
                required: true,
                minLength: 8,
                maxLength: 16,
                pattern: `[a-zA-Z0-9]+`}),
            password_confirmation: this.getFormControl('', {
                required: true,
                minLength: 8,
                maxLength: 16,
                pattern: `[a-zA-Z0-9]+`})
        });
    }
    registrate() {
        if (this.checkControlMarkAsTouched(this.formReg)) {
            const formVal: any = this.getValuesForm(this.formReg);

            if (formVal.password !== formVal.password_confirmation) {
                this.snackBar.openFromComponent(SnackBarComponent, {
                    data: {
                        type: 'error',
                        message: 'Password and Password confirmation will be identity'
                    }
                });
                return false;
            }

            this.pending = true;
            this.authService.registrate(this.getValuesForm(this.formReg)).subscribe(res => {
                this.pending = false;
                this.statusCreated = true;
                // this.router.navigate()

                this.snackBar.openFromComponent(SnackBarComponent, {
                    duration: 2500,
                    data: {
                        type: 'success',
                        message: 'User was successful created'
                    }
                });

                this.acrossTo('/login', timingRedirect);

                console.log(res);
            }, err => {
                this.pending = false;

                if ('status' in err) {
                    this.snackBar.openFromComponent(SnackBarComponent, {
                        data: {
                            type: 'error',
                            message: err.message[0]
                        }
                    });
                }
            });
        }
    }
    acrossTo(pathTo: string, timeout: number) {
        this.counter.setDecimal(timeout);
        this.timer = setInterval(() => {
            this.counter.decimal--;
            if (this.counter.decimal === 0) {
                clearInterval(this.timer);
            }
        }, 1000);
        setTimeout(() => {
            this.router.navigate([pathTo]);
        }, timeout * 1000);
    }
}
