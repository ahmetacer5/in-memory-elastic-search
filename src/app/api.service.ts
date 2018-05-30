import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/operator/delay';
import 'rxjs/operator/mergeMap';
import 'rxjs/operator/switchMap';
import 'rxjs/add/observable/interval';

import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable()
export class ApiService {
  apihost = environment.apihost;
  apibase = '/api';

  constructor(private http: Http) {
  }


  search(query: string) {
    const formData: FormData = new FormData();
    formData.append('query', query);
    return this.intercept(this.http.post(this.apihost + this.apibase + '/search', formData))
      .map((response: Response) => response.json());
  }

  fileUpload(files: File) {
    const formData: FormData = new FormData();
    formData.append('csvFile', files, files.name);
    return this.intercept(this.http.post(this.apihost + this.apibase + '/import', formData))
      .map((response: Response) => response.json());
  }


  intercept(observable: Observable<any>) {
    return observable.catch(err => {
      alert(JSON.stringify(err));
      return Observable.empty();
    });
  }


  private jwt(forpost) {
    // create authorization header with jwt token
    const currentUser = JSON.parse(sessionStorage.getItem('SESSIONID'));
    if (currentUser && currentUser.token) {

      const headers = new Headers({'Content-Type': (!forpost ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded')});
      const options = new RequestOptions({headers: headers});
      options.headers.set('x-access-token', currentUser.token);

      return new RequestOptions({headers: headers});
    }
  }
}
