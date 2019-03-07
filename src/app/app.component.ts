import { Component } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import {ApiService} from './shared/dataservice/api.service';
import {Observable} from 'rxjs';
import {ThemeService} from '../app/core/service/theme.service';
//import { ErrorService } from './shared/errorservice/error.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DCMPortal';
  isDarkTheme: Observable<boolean>;
  
  constructor(private adalSvc: MsAdalAngular6Service,
  private apiService:ApiService,
  private themeService: ThemeService
  ) {
   
    console.log(this.adalSvc.userInfo);
    var token = this.adalSvc.acquireToken('https://graph.microsoft.com').subscribe((token: string) => {
      console.log(token);
      this.isDarkTheme = this.themeService.isDarkTheme;

    })}
}
