import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredential } from '../models/login-credential';
import { TokenJwt } from '../models/token-jwt';
import { ForgotPasswordDetails } from '../models/forgot-password-details';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost:8082';
  constructor(private http: HttpClient) {}

  doLogin(credential: LoginCredential) {
    return this.http.post(`${this.url}/login`, credential);
  }

  loginuser(token: TokenJwt) {
    localStorage.setItem('token', token.jwtToken);
    localStorage.setItem('loggedInUser', JSON.stringify(token));
    return true;
  }
  isLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token === '' || token === null) {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    localStorage.clear();
    //localStorage.removeItem("token");
    window.location.reload();
  }
  getToken() {
    return localStorage.getItem('token');
  }
  forgotpassword(email: string) {
    return this.http.post(`${this.url}/home/forgotpassword`, email);
  }
  submitForgotPwd(forgotPwdDetail: ForgotPasswordDetails) {
    return this.http.post(`${this.url}/home/forgotPwdDetail`, forgotPwdDetail);
  }
}
