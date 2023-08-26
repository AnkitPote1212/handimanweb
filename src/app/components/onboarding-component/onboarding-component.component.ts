import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/models/city';
import { CityServiceService } from 'src/app/services/city-service.service';

@Component({
  selector: 'app-onboarding-component',
  templateUrl: './onboarding-component.component.html',
  styleUrls: ['./onboarding-component.component.css'],
})
export class OnboardingComponentComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cityService: CityServiceService
  ) {}
  action: string = '';
  onboardCityForm: FormGroup | any;
  onboardServiceForm: FormGroup | any;
  selectedImage: File | any;
  imagePreview: string | any;
  newpin: string = '';
  pincodes: string[] = [];
  isOnboardClicked: boolean = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.action = params['onboard'];
      console.log(this.action);
    });
    this.onboardCityForm = new FormGroup({
      cityImage: new FormControl(null, Validators.required),
      cityName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
      pincodes: new FormControl('', [
        Validators.pattern('^[0-9]{6}$'),
        // Validators.minLength(6),
        // Validators.maxLength(6),
      ]),
    });
    this.onboardServiceForm = new FormGroup({
      serviceName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
      ]),
    });
  }
  onboardCity() {
    if (this.isOnboardClicked) {
      console.log('Onboard City');
      const formdata = new FormData();
      // formdata.append('cityImage', this.onboardCityForm.value.cityImage);
      formdata.append('cityImage', this.onboardCityForm.value.cityImage);
      formdata.append('cityName', this.onboardCityForm.value.cityName);
      formdata.append('pincodes', this.pincodes.join(','));
      this.cityService.addCity(formdata).subscribe(
        (response) => {
          console.log('cityAdded');
        },
        (error) => {
          console.log('already added');
        }
      );
    }
  }
  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    this.generateImagePreview();
    this.onboardCityForm.patchValue({ cityImage: this.selectedImage });
  }
  generateImagePreview() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.selectedImage);
  }
  addName() {
    if (this.newpin.trim() !== '') {
      this.pincodes.push(this.newpin);
      this.newpin = '';
    }
  }

  removeName(name: string) {
    const index = this.pincodes.indexOf(name);
    if (index !== -1) {
      this.pincodes.splice(index, 1);
    }
  }
  checkDisablity(): boolean {
    if (this.pincodes.length == 0) {
      return true;
    }
    return false;
  }
  onboardService() {
    console.log('onboardService');
  }
}
