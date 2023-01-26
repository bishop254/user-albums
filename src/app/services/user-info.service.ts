import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      map((resp) => {
        if (resp) {
          console.log(resp, 'users');
          return resp;
        }
        throw new Error('Could not load data');
      })
    );
  }

  getUserAlbums(id: string | number): Observable<any> {
    return this.http
      .get(`https://jsonplaceholder.typicode.com/users/${id.toString()}/albums`)
      .pipe(
        map((resp) => {
          if (resp) {
            console.log(resp, 'albums');
            return resp;
          }
          throw new Error('Could not load data');
        })
      );
  }
}
