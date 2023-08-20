import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/models/city';
import { CityServiceDetails } from 'src/app/models/city-service-details';
import { HandimanInfo } from 'src/app/models/handiman-info';
import { ServiceDetails } from 'src/app/models/service-details';
import { ServiceEntity } from 'src/app/models/service-entity';
import { ServiceParameters } from 'src/app/models/service-parameters';
import { CityServiceService } from 'src/app/services/city-service.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-handiman-list',
  templateUrl: './handiman-list.component.html',
  styleUrls: ['./handiman-list.component.css'],
})
export class HandimanListComponent implements OnInit {
  //websiteList: any = ['ItSolutionStuff.com', 'HDTuto.com', 'Nicesnippets.com']
  //public variables = ['One','Two','County', 'Three', 'Zebra', 'XiOn'];
  variablesServiceList: any = [];
  variablesCityList: any = [];
  variablesPostalCodeList: any = [];
  handimanInfo: HandimanInfo[] | any;
  public ServiceList = this.variablesServiceList.slice();
  public CityList = this.variablesServiceList.slice();
  public PostalCodeList = this.variablesServiceList.slice();
  //public filteredList2 = this.variables.slice();
  showList: boolean = false;
  dropDownForm: FormGroup | any;
  serviceDetails: ServiceDetails | any;
  serviceParameters: ServiceParameters | any;
  serviceEntity: ServiceEntity[] = [];
  constructor(
    private cityServiceService: CityServiceService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  yourAdditionalValue: any = 'Your value for unapprovedList is true';
  cityPincodeMap = new Map<string, number[]>();
  cityName: string | any;
  unapprovedList: boolean = false;
  cityServiceDetails: CityServiceDetails | any;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.cityName = params['city'];
      this.unapprovedList = params['unapproved'];
      if (this.unapprovedList) {
        this.loadUnAapprovedHandiman();
      }
      console.log(this.unapprovedList);
      // Use the cityName parameter as needed in your HandymanListComponent
      console.log('City name:', this.cityName);
    });
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
    this.dropDownForm = new FormGroup({
      service: new FormControl('', [Validators.required]),
      city: new FormControl(this.cityName, Validators.required),
      pincode: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    this.showList = true;
    //console.log(,this.dropDownForm.value.city,this.dropDownForm.value.pincode);
    this.serviceParameters = new ServiceParameters(
      this.dropDownForm.value.service,
      this.dropDownForm.value.city,
      this.dropDownForm.value.pincode
    );
    this.cityServiceService
      .getHandimanList(this.serviceParameters)
      .subscribe((response) => {
        this.handimanInfo = response;
        console.log(this.handimanInfo);
      });
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
    return !!this.dropDownForm.value.city;
  }
  loadUnAapprovedHandiman() {
    this.cityServiceService
      .getUnApprovedHandimanList()
      .subscribe((response) => {
        this.handimanInfo = response;
        console.log(this.handimanInfo);
      });
  }
}
