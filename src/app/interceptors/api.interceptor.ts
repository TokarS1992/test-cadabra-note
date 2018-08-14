import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of, throwError } from 'rxjs';
import 'rxjs-compat';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    api = 'api/v1';
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = `/${this.api}/${req.url}`;
        const apiReq = req.clone({ url: url });

        return next.handle(apiReq)
            .map(event => {
                return event;
            })
            .catch((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    return Observable.throwError({
                        status: err.status,
                        message: err.error.errors
                    });
                }
            });
    }
}
