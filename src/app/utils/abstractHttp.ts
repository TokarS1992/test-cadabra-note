import { HttpHeaders } from '@angular/common/http';
import { keyHeaders } from './keyHeaders';
import Cookies from 'js-cookie';
import * as _ from 'underscore';

export abstract class AbstructHttp {
    static getHeaders(headersData = {}) {
        const headers: HttpHeaders = new HttpHeaders();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Accept', 'application/json');
        if (!_.isEmpty(headersData)) {
            for (const k in headersData) {
                if (headersData.hasOwnProperty(k)) {
                    headers.append(k, headersData[k]);
                }
            }
        }
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
    static getAccessControls(keys = keyHeaders) {
        const keysHeaders = {};
        for (let k = 0; k < keyHeaders.length; k++) {
            const headerVal = Cookies.get(keyHeaders[k]);
            if (headerVal) {
                keysHeaders[keyHeaders[k]] = headerVal;
            }
        }
        return keysHeaders;
    }
}
