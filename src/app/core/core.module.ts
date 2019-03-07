import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DcmHeaderComponent } from './dcm-header/dcm-header.component';
import { DcmFooterComponent } from './dcm-footer/dcm-footer.component';
import { DcmNavigationComponent } from './dcm-navigation/dcm-navigation.component';
import {MaterialModule} from './material';
import { AppRoutingModule } from '../app-routing.module';
import { DcmMainComponent } from './dcm-main/dcm-main.component';
import { DcmSidebarNavComponent } from './dcm-sidebar-nav/dcm-sidebar-nav.component';
import { DcmHeaderMenuComponent } from './dcm-header-menu/dcm-header-menu.component';
import {ThemeService} from './service/theme.service';

@NgModule({
  declarations: [DcmHeaderComponent, DcmFooterComponent, DcmNavigationComponent, DcmMainComponent, DcmSidebarNavComponent, DcmHeaderMenuComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule
  ],
  exports:[DcmHeaderComponent,DcmFooterComponent,DcmNavigationComponent,DcmMainComponent],
  providers:[ThemeService]
})
export class CoreModule { }
