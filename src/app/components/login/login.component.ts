import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginCredential } from 'src/app/models/login-credential';
import { TokenJwt } from 'src/app/models/token-jwt';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  credntial : LoginCredential | any;
  tokenValue : TokenJwt | any;
  jwtToken: string | any;
  invalidCredential:boolean=false;

  constructor(private fb: FormBuilder,private loginService:LoginService) { }
 // this.credntial= new LoginCredential();
//  model = new LoginCredential("ap","pwd");

  submitted = false;

  onSubmit() { 
    console.log("submit called");
   // console.log(this.model.email);
    console.log(this.loginForm.value.email);
    this.submitted = true; 
    this.credntial= new LoginCredential(this.loginForm.value.email,this.loginForm.value.password);
    this.loginService.doLogin(this.credntial).subscribe(
      (response)=>{
        const apiResponse = response as TokenJwt;
        console.log(apiResponse.user);
        console.log(apiResponse);
        localStorage.setItem("isLoggedIn","true")
        localStorage.setItem("token",apiResponse.jwtToken)
        localStorage.setItem("username",apiResponse.username)
        localStorage.setItem("user Detail",JSON.stringify(apiResponse.user))
        //this.loginService.loginuser(apiResponse);
        window.location.href="/handymanList"
      },error=>{
        //this.loginService.loginuser("erorr");
        console.log('Status Code:', error.status);
        localStorage.setItem("isLoggedIn","false")
        localStorage.setItem("token","erorr")
        this.invalidCredential=true;
      }
    );
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
        email : new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',Validators.required)
      });
  }
  newHero() {
    //this.model = new LoginCredential("ap","pwd");
  }

}