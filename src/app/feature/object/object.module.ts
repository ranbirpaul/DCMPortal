import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectAddComponent } from './component/object-add/object-add.component';
import {MaterialModule} from './material';
import { ObjectStructureAddComponent } from './component/object-structure-add/object-structure-add.component';
import { DynamicFormObjectConfigComponent } from './component/dynamic-form-object-config/dynamic-form-object-config.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {CommonService} from '../../shared/service/common.service';
import { ObjectSelectStructureComponent } from './component/object-select-structure/object-select-structure.component';
import { ObjectManagementComponent } from './component/object-management/object-management.component';
import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import { ObjectListComponent } from './component/object-list/object-list.component';
import { ObjectAdvanceComponent } from './component/object-advance/object-advance.component';
import {CommunicationService} from '../datacenter/service/communication.service';
import { ObjectAdvanceListComponent } from './component/object-advance-list/object-advance-list.component';
import { ObjectDetailComponent } from './component/object-detail/object-detail.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  declarations: [ObjectAddComponent, ObjectStructureAddComponent, DynamicFormObjectConfigComponent, ObjectSelectStructureComponent, ObjectManagementComponent, ObjectListComponent, ObjectAdvanceComponent, ObjectAdvanceListComponent, ObjectDetailComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule ,
    MaterialDesignFrameworkModule,
    NgxJsonViewerModule 
  ],
  exports:[
    ObjectManagementComponent,
    ObjectStructureAddComponent,
    ObjectAdvanceComponent,
    DynamicFormObjectConfigComponent,
    ObjectDetailComponent
  ],
  providers:[CommonService,CommunicationService],
  entryComponents: [ObjectSelectStructureComponent,ObjectDetailComponent]
})
export class ObjectModule { }
