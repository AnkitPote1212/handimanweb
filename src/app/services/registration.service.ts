import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user';
import { PinVerification } from '../models/pin-verification';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  url = 'http://localhost:8082';
  constructor(private http: HttpClient) {}

  getCity() {
    return this.http.get(`${this.url}/api/getCites`);
  }
  sendUserData(appUser: AppUser) {
    return this.http.post(`${this.url}/home/saveUser`, appUser);
  }
  sendHandimanUserData(formdata: FormData) {
    return this.http.post(`${this.url}/home/savehandimanUser`, formdata);
  }
  verifyPin(pinVerification: PinVerification) {
    return this.http.post(`${this.url}/home/verifyPin`, pinVerification);
  }
}
