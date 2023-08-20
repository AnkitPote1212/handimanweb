import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn=false;
  @Output() public eventEmitter=new EventEmitter<string>();
  @Input() public parentmsg: any;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.loginService.isLoggedIn();
  }
  logout(){
    this.loginService.logout()
    location.reload()
  }
  addNewitem(item:any){
    this.eventEmitter.emit(item);
  }

}
