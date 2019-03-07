import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {CoreModule} from './core/core.module';
import {TenantModule} from './feature/tenant/tenant.module';
import {DatacenterModule} from './feature/datacenter/datacenter.module';
import {EquipmentModule} from './feature/equipment/equipment.module';
import {RackModule} from './feature/rack/rack.module';
import {UserModule} from './feature/user/user.module'

import {ObjectModule} from './feature/object/object.module';
import {ConfigurationModule} from './feature/configuration/configuration.module';
import {SharedModule} from './shared/shared.module';
import {MaterialModule} from './material';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthenticationGuard, MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthenticationService } from './authentication.service';
import { WelcomeComponent } from './welcome/welcome.component';
import {ObjectTypeConfigurationAddComponent} from './feature/configuration/component/object-type-configuration-add/object-type-configuration-add.component';
import {ObjectTypeAddComponent} from './feature/configuration/component/object-type-add/object-type-add.component';
import {ObjectTypeListComponent} from './feature/configuration/component/object-type-list/object-type-list.component'
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {EdgeModule} from './feature/edge/edge.module';
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    MsAdalAngular6Module.forRoot({
      tenant: '372ee9e0-9ce0-4033-a64a-c07073a91ecd',
      clientId: '5a7fbb94-305d-485a-a4bb-027780060d64',
      redirectUri: window.location.origin,
      endpoints: {
        "https://localhost/Api/": "xxx-bae6-4760-b434-xxx"
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage',
    }),
    CoreModule,
    TenantModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    DatacenterModule,
    EquipmentModule,
    UserModule,
    RackModule,
    ObjectModule,
    ConfigurationModule,
    EdgeModule
  ],
  providers: [AuthenticationGuard,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
