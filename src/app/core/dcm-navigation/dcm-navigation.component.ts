import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../authentication.service';
import {ThemeService} from '../service/theme.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dcm-navigation',
  templateUrl: './dcm-navigation.component.html',
  styleUrls: ['./dcm-navigation.component.scss']
})
export class DcmNavigationComponent implements OnInit {
  isDarkTheme: Observable<boolean>;
  constructor(
    private router:Router,
    private authService:AuthenticationService,
    private themeService:ThemeService
  ) { 
    
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }
  onClick(url){
    console.log('clicked..'+url);
    this.router.navigateByUrl(url);
  }
  logOut(){
    this.authService.logOut();
  }
  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
}
