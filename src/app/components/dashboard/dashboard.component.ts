import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  users : User[] | any;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  getUser(){
    this.userService.getUsers().subscribe(
      (user)=>{
        this.users = user as User[];
        console.log(this.users[1].name);
        console.log(user.toString);
      },(error)=>{

      }

    )
  }

}
