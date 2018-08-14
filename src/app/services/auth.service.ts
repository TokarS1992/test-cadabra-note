import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ErrorsTypes } from '../utils/abstructError';
import { AbstructHttp } from '../utils/abstractHttp';
import Cookies from 'js-cookie';

const keyHeaders = ['access-token', 'client', 'expiry', 'uid'];

@Injectable({
  providedIn: 'root'
})
export class AuthService extends ErrorsTypes {
    headers: HttpHeaders;
    options: object;
    constructor(
        private http: HttpClient
    ) {
        super();
        this.headers = AbstructHttp.getHeaders();
        this.options = { withCredentials: true, observe: 'response', headers: this.headers};
    }
    public login(data: object) {
        const body: FormData = AbstructHttp.bodyToFormData(data);

        return this.http.post('auth/sign_in', body, this.options).pipe(
            map((res: HttpResponse<any>) => {
                const expiry = res.headers.get('expiry');
                for (let k = 0; k < keyHeaders.length; k++) {
                    const headerVal = res.headers.get(keyHeaders[k]);
                    if (headerVal) {
                        Cookies.set(keyHeaders[k], headerVal, { expires: 1});
                    }
                }
                return res.body;
            }));
    }
    public registrate(data: object) {
        const body: FormData = AbstructHttp.bodyToFormData(data);

        return this.http.post('auth', body, this.options).pipe(
            map((res: HttpResponse<any>) => {
                return res.body;
            }));
    }
    public logout() {
        for (let k = 0; k < keyHeaders.length; k++) {
            const headerVal = Cookies.get(keyHeaders[k]);
            if (headerVal) {
                Cookies.remove(keyHeaders[k]);
            }
        }
    }
}
