import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showLogginButton: boolean | any;
  userName: string | any;
  role: string | any;
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {
    if (localStorage.length === 0 || localStorage.token === 'erorr') {
      this.showLogginButton = true;
    }
    const jsonString = localStorage.getItem('user Detail');
    if (jsonString) {
      try {
        const jsonObject = JSON.parse(jsonString);
        this.userName =
          this.capitalizeFirstLetter(jsonObject.firstName) +
          ' ' +
          this.capitalizeFirstLetter(jsonObject.lastName);
        this.role = jsonObject.role;
        console.log(jsonObject.firstName + ' ' + jsonObject.lastName);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
      console.log(jsonString);
    }
    //this.jsonUserDetail=JSON.parse(jsonString);
  }
  capitalizeFirstLetter(str: string): string {
    if (str.length === 0) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  logout() {
    this.loginService.logout();
    this.router.navigate(['']);
  }
  title = 'Handiman- get it done!';
  message = 'this is for navbar';
  items = '';
  AddItem(item: string) {
    this.items = item;
  }
  unapprovedUsers() {
    this.router.navigate(['/handymanList'], {
      queryParams: { unapproved: true },
    });
  }
  onboardCity() {
    this.router.navigate(['/onboard'], {
      queryParams: { onboard: 'city' },
    });
  }
  onboardService() {
    this.router.navigate(['/onboard'], {
      queryParams: { onboard: 'service' },
    });
  }
}
