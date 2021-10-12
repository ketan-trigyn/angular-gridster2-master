import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  constructor(private http: HttpClient) { }

  private getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

  catchError(err) {
    console.log('Error:' + err.status);
    console.log(err);
    throw err;
  }

  getApi(url: string): Observable<any> {
    return this.http.get(url, { headers: this.getHeaders() }).pipe(
      map(res => res),
      catchError(err => { this.catchError(err); return of(err.message) })
    );
  }
}
