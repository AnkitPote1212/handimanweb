import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'http://localhost:8082';
  //headers:any;

  token: string | any;
  constructor(private http: HttpClient, private loginService: LoginService) {}

  getUsers() {
    return this.http.get(`${this.url}/api/hello`);
  }
  updateUser(formdata: FormData) {
    return this.http.put(`${this.url}/api/updateUser`, formdata);
  }
  approveHandiman(user: object) {
    return this.http.post(`${this.url}/admin/approve`, user);
  }
}
