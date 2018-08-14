import { HttpHeaders } from '@angular/common/http';

export abstract class AbstructHttp {
    static getHeaders() {
        const headers: HttpHeaders = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        return headers;
    }
    static bodyToFormData(data) {
        const body: FormData = new FormData();
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                body.append(key, data[key]);
            }
        }
        return body;
    }
}
