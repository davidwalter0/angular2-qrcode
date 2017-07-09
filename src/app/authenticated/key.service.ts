import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { JsonResponse } from './json.response';
import { KeyResponse } from './key.response';

@Injectable()
export class KeyService {

  constructor(public http: Http) { }

  public key(url: string): Observable<KeyResponse> {
    console.log("key:", url)
    return this.http.get(`${url}`)
      .map(res => {
        return <KeyResponse>res.json();
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
