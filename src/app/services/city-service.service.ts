import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceParameters } from '../models/service-parameters';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class CityServiceService {
  url = 'http://localhost:8082';
  //serviceParameters: ServiceParameters | any;

  constructor(private http: HttpClient, private loginService: LoginService) {}
  getServiceDetails() {
    return this.http.get(`${this.url}/home/getCityService`);
  }
  getHandimanList(serviceParameters: ServiceParameters) {
    return this.http.post(`${this.url}/api/getHandimanlist`, serviceParameters);
  }
  getPostalCodeByCityName(cityName: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('cityName', cityName);
    return this.http.get(`${this.url}/api/getPostalCode`, {
      params: queryParams,
    });
  }
  getCityList() {
    return this.http.get(`${this.url}/home/getHomePageDetails`);
  }
  getUnApprovedHandimanList() {
    return this.http.get(`${this.url}/admin/getUnApprovedList`);
  }
}
