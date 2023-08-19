import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServiceService {

  private baseUrl = 'http://localhost:8081/auth/user';

  constructor(private http: HttpClient) {}

  registerUser(registrationDTO: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, registrationDTO);
  }
  
  loginUser(registrationDTO: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, registrationDTO);
  }

  verifyRegistration(token: string): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/verifyRegistration?token=${token}`);
  }
}
