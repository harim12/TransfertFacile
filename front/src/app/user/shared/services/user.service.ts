import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfoByEmail(email: string): Observable<any> {
    const url = `http://localhost:8081/user/get/${email}/info`;
    return this.http.get(url);
  }
}
