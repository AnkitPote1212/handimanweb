import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper/bundle';
import { SwiperOptions } from 'swiper';
import { CityServiceService } from 'src/app/services/city-service.service';
import { City } from 'src/app/models/city';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 cities:City[] | any;
 constructor(private cityServiceService:CityServiceService,private router: Router){}

  ngOnInit(): void { 
    this.cityServiceService.getCityList().subscribe(
      (response)=>{
        console.log(response);
        this.cities=response;
        console.log(response);
      }
    )
  }

  config: SwiperOptions = {
    pagination: { 
      el: '.swiper-pagination', 
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 10,
    slidesPerView: 3,
    autoplay: {
      delay: 3000, // Set the delay between each slide transition in milliseconds
      disableOnInteraction: false // Allow autoplay to continue even when the user interacts with the swiper
    },
    loop: true // Enable continuous sliding 
  };  
  handleImageClick(cityName: string) {
    console.log("Clicked on image of city:", cityName);
    this.router.navigate(['/handymanList'], { queryParams: { city: cityName } });
  }

  

}
