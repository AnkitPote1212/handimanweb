import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredential } from 'src/app/models/login-credential';
import { PinVerification } from 'src/app/models/pin-verification';
import { TokenJwt } from 'src/app/models/token-jwt';
import { LoginService } from 'src/app/services/login.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  forgotForm: FormGroup | any;
  conformPwdForm: FormGroup | any;
  credntial: LoginCredential | any;
  tokenValue: TokenJwt | any;
  jwtToken: string | any;
  invalidCredential: boolean = false;
  isShowForgotEmail: boolean = false;
  isShowPasscode: boolean = false;
  showEmailNotRegistered: boolean = false;
  registeredEmail: string | any;
  otp: string = '';
  wrongPin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private registrationService: RegistrationService,
    private router: Router
  ) {}
  // this.credntial= new LoginCredential();
  //  model = new LoginCredential("ap","pwd");

  submitted = false;

  onSubmit() {
    console.log('submit called');
    // console.log(this.model.email);
    console.log(this.loginForm.value.email);
    this.submitted = true;
    this.credntial = new LoginCredential(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
    this.loginService.doLogin(this.credntial).subscribe(
      (response) => {
        const apiResponse = response as TokenJwt;
        console.log(apiResponse.user);
        console.log(apiResponse);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', apiResponse.jwtToken);
        localStorage.setItem('username', apiResponse.username);
        localStorage.setItem('user Detail', JSON.stringify(apiResponse.user));
        //this.loginService.loginuser(apiResponse);
        window.location.href = '/handymanList';
      },
      (error) => {
        //this.loginService.loginuser("erorr");
        console.log('Status Code:', error.status);
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.setItem('token', 'erorr');
        this.invalidCredential = true;
      }
    );
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.conformPwdForm = new FormGroup({
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$'),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }
  newHero() {
    //this.model = new LoginCredential("ap","pwd");
  }
  forgotPassword() {
    this.isShowForgotEmail = true;
  }
  onSubmitEmail() {
    this.loginService.forgotpassword(this.forgotForm.value.email).subscribe(
      (response) => {
        this.isShowPasscode = true;
        this.registeredEmail = this.forgotForm.value.email;
      },
      (error) => {
        this.showEmailNotRegistered = true;
      }
    );
  }
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '40px',
      height: '40px',
    },
  };
  onOtpChange(otp: any) {
    this.otp = otp;
  }
  submitPin() {
    this.registrationService
      .verifyPin(new PinVerification(this.registeredEmail, this.otp))
      .subscribe(
        (response) => {
          console.log('user verified');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.wrongPin = true;
        }
      );
  }
  arePasswordsEqualHandiman(): boolean {
    const password = this.conformPwdForm.get('password').value;
    const confirmPassword = this.conformPwdForm.get('confirmPassword').value;
    return password === confirmPassword;
  }
}
