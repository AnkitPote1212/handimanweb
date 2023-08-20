import { Component, Input, OnInit } from '@angular/core';
import { HandimanInfo } from 'src/app/models/handiman-info';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-filtered-handiman',
  templateUrl: './filtered-handiman.component.html',
  styleUrls: ['./filtered-handiman.component.css'],
})
export class FilteredHandimanComponent implements OnInit {
  @Input() handimanInfos: HandimanInfo[] | any;
  @Input() additionalValue: any;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.additionalValue);
    console.log(this.handimanInfos);
  }
  approveHandiman(email: string) {
    const user = {
      email: email,
    };
    this.userService.approveHandiman(user).subscribe((response) => {
      console.log(response);
    });
    window.location.href = '/handymanList';
  }
}
