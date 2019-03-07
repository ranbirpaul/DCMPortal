import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {CommonService} from '../../shared/service/common.service';
import { MaterialDesignFrameworkModule } from 'angular6-json-schema-form';
import {CommunicationService} from '../datacenter/service/communication.service';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { EdgeObjectAddComponent } from './component/edge-object-add/edge-object-add.component';
import { EdgeObjectListComponent } from './component/edge-object-list/edge-object-list.component';
import {ObjectModule} from '../../feature/object/object.module';
import { EdgeObjectManagementComponent } from './component/edge-object-management/edge-object-management.component';
import { EdgeObjectTreeComponent } from './component/edge-object-tree/edge-object-tree.component';


@NgModule({
  declarations: [EdgeObjectAddComponent, EdgeObjectListComponent, EdgeObjectManagementComponent, EdgeObjectTreeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexModule ,
    MaterialDesignFrameworkModule,
    NgxJsonViewerModule,
    ObjectModule
  ],
  exports:[
    EdgeObjectAddComponent,
    EdgeObjectManagementComponent
  ],
  providers:[CommonService,CommunicationService],
  entryComponents: []
})
export class EdgeModule { }
