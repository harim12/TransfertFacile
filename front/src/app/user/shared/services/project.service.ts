import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  addProject(project: any): Observable<any> {
    const url = 'http://localhost:8081/project/add';
    return this.http.post(url, project);
  }
}
