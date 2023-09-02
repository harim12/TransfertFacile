import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8081/transporteur';

  constructor(private http: HttpClient) {}

  getTransporteurPersonalInfo(email: any): Observable<any> {
    const url = `${this.baseUrl}/get/${email}/personal-info`;
    return this.http.get<any>(url);
  }
  updateTransporteurInfo(transporteurData: any,image: File): Observable<any> {
    const formData = new FormData();
    formData.append('testeEntity', JSON.stringify(transporteurData));
    formData.append('image', image);

    
    return this.http.put<any>(
      `${this.baseUrl}/update`,
      formData
    );
  }
}
