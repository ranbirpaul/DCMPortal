import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectTypeConfigurationAddComponent } from './component/object-type-configuration-add/object-type-configuration-add.component';
import {MaterialModule} from './material';
import { ObjectTypeListComponent } from './component/object-type-list/object-type-list.component';
import { ObjectTypeAddComponent } from './component/object-type-add/object-type-add.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { EdgeConfigurationAddComponent } from './component/edge-configuration-add/edge-configuration-add.component';
import { EdgeConfigurationListComponent } from './component/edge-configuration-list/edge-configuration-list.component';
import {CommunicationService} from '../datacenter/service/communication.service';


@NgModule({
  declarations: [ 
    ObjectTypeConfigurationAddComponent, 
    ObjectTypeListComponent, 
    ObjectTypeAddComponent, 
    EdgeConfigurationAddComponent, 
    EdgeConfigurationListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports:[
    ObjectTypeConfigurationAddComponent,
    ObjectTypeAddComponent,
    ObjectTypeListComponent,
    EdgeConfigurationAddComponent
  ],
  providers:[CommunicationService]
})
export class ConfigurationModule { }
