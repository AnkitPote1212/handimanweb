import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/app-user';
import { CityServiceDetails } from 'src/app/models/city-service-details';
import { PinVerification } from 'src/app/models/pin-verification';
import { ServiceEntity } from 'src/app/models/service-entity';
import { CityServiceService } from 'src/app/services/city-service.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  truthyValue: boolean = false;
  isLabelBold: boolean = true;
  // variablesCityList:string[]=[];
  // public cityList = this.variablesCityList.slice();
  userRegisterForm: FormGroup | any;
  handimanRegisterForm: FormGroup | any;
  appUser: AppUser | any;
  cities: string[] | any;
  aboutMe: string | any;
  selectedImage: File | any;
  imagePreview: string | any;
  selectedDocument: File | any;

  variablesServiceList: any = [];
  variablesCityList: any = [];
  variablesPostalCodeList: any = [];
  //handimanInfo:HandimanInfo[] | any;
  public ServiceList = this.variablesServiceList.slice();
  public CityList = this.variablesServiceList.slice();
  public PostalCodeList = this.variablesServiceList.slice();
  cityServiceDetails: CityServiceDetails | any;
  serviceEntity: ServiceEntity[] = [];
  cityPincodeMap = new Map<string, number[]>();
  userExist: boolean = false;
  showDialog: boolean = false;
  isRegistered: boolean = false;
  registeredEmail: string | any;
  otp: string = '';
  wrongPin: boolean = false;
  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private cityServiceService: CityServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cityServiceService.getServiceDetails().subscribe((response) => {
      //console.log(response);
      this.cityServiceDetails = response;
      this.serviceEntity = this.cityServiceDetails.serviceList;
      this.serviceEntity.forEach((item) => {
        console.log(item.serviceName.toString());
        this.variablesServiceList.push(item.serviceName.toString());
        this.ServiceList.push(item.serviceName.toString());
      });
      this.cityPincodeMap = new Map(
        Object.entries(this.cityServiceDetails.cityPincodeMap)
      );
      this.variablesCityList = Array.from(this.cityPincodeMap.keys());
      this.CityList = Array.from(this.cityPincodeMap.keys());
      console.log(this.variablesCityList);
    });
    // this.registrationService.getCity().subscribe(
    //   (response)=>{
    //     console.log(response);
    //     this.cities=response;
    //     this.cityList=this.cities;
    //     this.variablesCityList=this.cities;

    //   }
    // );
    this.handimanRegisterForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
      city: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      service: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$'),
      ]),
      confirmPassword: new FormControl('', Validators.required),
      imageUpload: new FormControl(null, Validators.required),
      documentUpload: new FormControl(null, Validators.required),
      aboutMe: new FormControl('', [
        Validators.required,
        Validators.minLength(150),
      ]),
    });
    this.userRegisterForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      city: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$'),
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  onSwitcheryChange(newValue: boolean) {
    // Method to be called when the status changes
    console.log('Switchery value changed:', newValue);

    // Add your logic here to perform the desired actions
  }
  getLabelText(): string {
    return 'Register yourself as handyman';
  }
  onSubmit() {
    console.log(this.userRegisterForm.value.firstName);
    this.appUser = new AppUser(
      this.userRegisterForm.value.firstName,
      this.userRegisterForm.value.lastName,
      this.userRegisterForm.value.email,
      this.userRegisterForm.value.city,
      this.userRegisterForm.value.password
    );
    this.registeredEmail = this.userRegisterForm.value.email;
    console.log(this.appUser);
    this.registrationService.sendUserData(this.appUser).subscribe(
      (response) => {
        console.log(response);
        this.userExist = false;
        console.log(this.isRegistered);
        this.isRegistered = true;
        console.log('test hdbashdj       dasd');
        console.log(this.isRegistered);
      },
      (error) => {
        console.log('Status Code:', error.status);
        if (error.status == '403') {
          console.log(this.isRegistered);
          this.userExist = true;
        }
      }
    );
  }
  onSubmitHandiman() {
    const formdata = new FormData();
    this.registeredEmail = this.handimanRegisterForm.value.email;
    formdata.append('firstName', this.handimanRegisterForm.value.firstName);
    formdata.append('lastName', this.handimanRegisterForm.value.lastName);
    formdata.append('email', this.handimanRegisterForm.value.email);
    formdata.append(
      'contactNumber',
      this.handimanRegisterForm.value.contactNumber
    );
    formdata.append('city', this.handimanRegisterForm.value.city);
    formdata.append('pincode', this.handimanRegisterForm.value.pincode);
    formdata.append('service', this.handimanRegisterForm.value.service);
    formdata.append('password', this.handimanRegisterForm.value.password);
    formdata.append('imageUpload', this.handimanRegisterForm.value.imageUpload);
    formdata.append(
      'documentUpload',
      this.handimanRegisterForm.value.documentUpload
    );
    formdata.append('aboutMe', this.handimanRegisterForm.value.aboutMe);
    console.log(formdata);
    this.registrationService.sendHandimanUserData(formdata).subscribe(
      (response) => {
        console.log(response);
        this.userExist = false;
        this.isRegistered = true;
      },
      (error) => {
        if (error.status == '403') {
          this.userExist = true;
        }
      }
    );
  }
  arePasswordsEqual(): boolean {
    const password = this.userRegisterForm.get('password').value;
    const confirmPassword = this.userRegisterForm.get('confirmPassword').value;
    return password === confirmPassword;
  }
  arePasswordsEqualHandiman(): boolean {
    const password = this.handimanRegisterForm.get('password').value;
    const confirmPassword =
      this.handimanRegisterForm.get('confirmPassword').value;
    return password === confirmPassword;
  }
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.generateImagePreview();
    this.handimanRegisterForm.patchValue({ imageUpload: this.selectedImage });
  }

  generateImagePreview() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
  }
  onFileSelectedDocs(event: any) {
    this.selectedDocument = event.target.files[0];
    this.handimanRegisterForm.patchValue({
      documentUpload: this.selectedDocument,
    });
  }

  uploadDocument() {
    if (this.selectedDocument) {
      // Logic to upload the document goes here
      console.log('Uploading document:', this.selectedDocument);
    } else {
      console.log('No document selected.');
    }
  }
  onCitySelected(event: any) {
    const selectedCity = event.value;
    // Perform your desired action with the selected city
    console.log('Selected City:', selectedCity);
    // Call your function or perform any other operations here
    this.getPincodeForCity(selectedCity);
  }

  getPincodeForCity(selectedCity: string) {
    // Your function logic goes here
    this.PostalCodeList = [];
    this.variablesCityList = [];
    console.log(this.cityPincodeMap.get(selectedCity));
    this.PostalCodeList = this.cityPincodeMap.get(selectedCity);
    this.variablesCityList = this.cityPincodeMap.get(selectedCity);
    // this.cityServiceService.getPostalCodeByCityName(selectedCity).subscribe(
    //   (response)=>{
    //     console.log(response);
    //     this.PostalCodeList=response;
    //     this.variablesPostalCodeList=response;
    //   }
    // )
    console.log('Function called with selected city:', selectedCity);
  }

  isCitySelected(): boolean {
    return !!this.handimanRegisterForm.value.city;
  }
  openDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '80px',
      height: '80px',
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
}
