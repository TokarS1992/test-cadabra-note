import { Observable } from 'rxjs/observable';
import 'rxjs-compat';
import { throwError } from 'rxjs';

export abstract class ErrorsTypes {
    public handleCatchError(err: any): Observable<any> {
        console.log(err);
        return Observable.throwError(err);
    }
}
