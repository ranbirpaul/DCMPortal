import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {TestapitokenService} from '../testapitoken.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit 
{
  user:string;
  apiuser:string;
  constructor(private authService:AuthenticationService, private testapiService:TestapitokenService) 
  { 
    this.user = this.authService.loginInfo();
    // Get user name from testapitoken service 
    this.testapiService.getUserName()
    .subscribe(resp => {
      this.apiuser = resp.body;
      console.log(this.apiuser);
    },
    err => {
	  console.log(err);
      }
    );
  }

  ngOnInit() 
  {
  }
}
