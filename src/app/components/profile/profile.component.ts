import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CityServiceDetails } from 'src/app/models/city-service-details';
import { ServiceEntity } from 'src/app/models/service-entity';
import { CityServiceService } from 'src/app/services/city-service.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userDetail:string | any;
  userDetailObject:object | any;
  enableHandimanEdit = false;
  enableUserEdit=false;
  editHandimanUser:FormGroup | any;
  selectedImage: File | any;
  imagePreview: string | any;
  variablesCityList:any=[];
  public CityList = this.variablesCityList.slice();
  selectedDocument: File | any;
  variablesPostalCodeList:any=[];
  variablesServiceList:any=[];
  serviceEntity:ServiceEntity[]=[];
  public PostalCodeList = this.variablesServiceList.slice();
  public ServiceList = this.variablesServiceList.slice();
  cityServiceDetails: CityServiceDetails | any;
  cityPincodeMap = new Map<string,number[]>();
  editUserForm:FormGroup |any;
  
  constructor(private registrationService:RegistrationService,private cityServiceService:CityServiceService,private userService:UserService) { }

  ngOnInit(): void {

    this.cityServiceService.getServiceDetails().subscribe(
      (response)=>{
        //console.log(response);
        this.cityServiceDetails=response;
        this.serviceEntity=this.cityServiceDetails.serviceList;
        this.serviceEntity.forEach(item=>{
          console.log(item.serviceName.toString())
          this.variablesServiceList.push(item.serviceName.toString());
          this.ServiceList.push(item.serviceName.toString());
        })
        this.cityPincodeMap=new Map(Object.entries(this.cityServiceDetails.cityPincodeMap))
        this.variablesCityList = Array.from(this.cityPincodeMap.keys());
        this.CityList=Array.from(this.cityPincodeMap.keys());
        console.log(this.variablesCityList);
      }
    );
    
    //console.log(localStorage.getItem("user Detail"));
    this.userDetail=localStorage.getItem("user Detail");
    this.userDetailObject=JSON.parse(this.userDetail);
    //this.selectedDocument=this.userDetailObject.resumeUrl
    console.log(this.selectedDocument);
    console.log(this.userDetailObject);
    console.log(this.userDetailObject.firstName);

    this.editHandimanUser=new FormGroup({
      profileImage:new FormControl('',Validators.required),
      firstName: new FormControl(this.userDetailObject.firstName,Validators.required),
      lastName: new FormControl(this.userDetailObject.lastName,Validators.required),
      aboutMe: new FormControl(this.userDetailObject.aboutMe,Validators.required),
      email: new FormControl(this.userDetailObject.email,Validators.required),
      contactNumber: new FormControl(this.userDetailObject.contactNumber,Validators.required),
      city: new FormControl(this.userDetailObject.city,Validators.required),
      pinCodes: new FormControl(this.userDetailObject.postalCode,Validators.required),
      service: new FormControl(this.userDetailObject.serviceProvided,Validators.required),
      resumeUrl: new FormControl(this.userDetailObject.resumeUrl,Validators.required)
    })
    this.editUserForm=new FormGroup({
      firstName: new FormControl(this.userDetailObject.firstName,Validators.required),
      lastName: new FormControl(this.userDetailObject.lastName,Validators.required),
      email: new FormControl(this.userDetailObject.email,Validators.required),
      city:new FormControl(this.userDetailObject.city,Validators.required)
    })
    
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
    this.PostalCodeList=[];
    this.variablesCityList=[];
    console.log(this.cityPincodeMap.get(selectedCity))
    this.PostalCodeList=this.cityPincodeMap.get(selectedCity);
    this.variablesCityList=this.cityPincodeMap.get(selectedCity);
    // this.cityServiceService.getPostalCodeByCityName(selectedCity).subscribe(
    //   (response)=>{
    //     console.log(response);
    //     this.PostalCodeList=response;
    //     this.variablesPostalCodeList=response;
    //   }
    // )
    console.log('Function called with selected city:', selectedCity);
  }
  editHandiman(): void {
    console.log("open Model");
    //this.selectedDocument=this.userDetailObject.resumeUrl;
    this.enableHandimanEdit = true;
    console.log();
    // Prepopulate the form fields if needed
   
  }
  editUser(){
    this.enableUserEdit=true;
  }
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.generateImagePreview();
    this.editHandimanUser.patchValue({ profileImage: this.selectedImage });
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
    this.editHandimanUser.patchValue({ resumeUrl: this.selectedDocument });
  }
  isCitySelected(): boolean {
    return !!this.editHandimanUser.value.city;
  }
  onSubmit(userType?:string){
    console.log(userType);
    console.log(this.editHandimanUser.value.resumeUrl);
    console.log(this.editHandimanUser.value.profileImage);
    const formdata = new FormData();
    if(userType=='appUser'){
    formdata.append('firstName', this.editUserForm.value.firstName);
    formdata.append('lastName', this.editUserForm.value.lastName);
    formdata.append('email', this.editUserForm.value.email);
    formdata.append('city', this.editUserForm.value.city);
    formdata.append('userType', 'appUser');
    console.log(formdata);
    }else{
    console.log(this.editHandimanUser.value.profileImage);
    if(this.editHandimanUser.value.profileImage instanceof File){
    formdata.append('imageUpload', this.editHandimanUser.value.profileImage);
    }
    if(this.editHandimanUser.value.resumeUrl instanceof File){
    formdata.append('documentUpload', this.editHandimanUser.value.resumeUrl);
    }
    formdata.append('aboutMe', this.editHandimanUser.value.aboutMe);
    formdata.append('firstName', this.editHandimanUser.value.firstName);
    formdata.append('lastName', this.editHandimanUser.value.lastName);
    formdata.append('email', this.editHandimanUser.value.email);
    formdata.append('contactNumber', this.editHandimanUser.value.contactNumber);
    formdata.append('city', this.editHandimanUser.value.city);
    formdata.append('pincode', this.editHandimanUser.value.pinCodes);
    formdata.append('service', this.editHandimanUser.value.service);
    formdata.append('userType', 'handiman');
    console.log(formdata.get("contactNumber"));
    console.log(formdata.get("documentUpload"));
    console.log(formdata.get("aboutMe"));
    console.log(formdata.get("email"));
    console.log(formdata.get("service"));
    console.log(formdata.get("city"));
    }
    this.userService.updateUser(formdata).subscribe(
      (response)=>{
        console.log(response);
        localStorage.removeItem("user Detail");
        localStorage.setItem("user Detail",JSON.stringify(response));
        window.location.href="/profile";
      }
    );



  }
}