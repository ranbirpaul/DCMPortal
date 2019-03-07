import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  user:string;
  constructor(private authService:AuthenticationService) { 
    this.user= this.authService.loginInfo();
  }

  ngOnInit() {
  }

}
