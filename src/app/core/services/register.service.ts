import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.model';
import { Parent } from '../models/parent.model';
import { GlobalComponent } from "../../global-component";
const AUTH_API = GlobalComponent.AUTH_API;
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = AUTH_API; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  registerStudent(student: Student): Observable<any> {
    const url = `${this.apiUrl}register-student`;
    return this.http.post(url, student);
  }

  registerParent(parent: Parent): Observable<any> {
    const url = `${this.apiUrl}register-parent`;
    return this.http.post(url, parent);
  }
}
