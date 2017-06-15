import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JsonResponse } from './json.response';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ValidationService {

  constructor(public http: Http) { }

  public validate(url: string): Observable<JsonResponse> {
    console.log("validate:", url)
    return this.http.get(`${url}`)
      .map(res => {
        return res.json();
      })
      .catch(this.handleError);
  }

  private handleError(err) {
    let errorMessage: string;
    console.log(err);
    if (err instanceof Response) {
      let body = err.json() || '';
      let error = body.error || JSON.stringify(body);
      errorMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errorMessage = err.message ? err.message : err.toString();
    }
    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }
}
