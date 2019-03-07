import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TenantAddComponent} from './feature/tenant/component/tenant-add/tenant-add.component';
import {DatacenterAddComponent} from './feature/datacenter/component/datacenter-add/datacenter-add.component'
import {FloorAddComponent} from './feature/datacenter/component/floor-add/floor-add.component';
import {RoomAddComponent} from './feature/datacenter/component/room-add/room-add.component'

import {EquipmentAddComponent} from './feature/equipment/component/equipment-add/equipment-add.component';
import {EqipmentExportComponent} from './feature/equipment/component/equipment-export/equipment-export.component';
import {EqipmentImportComponent} from './feature/equipment/component/equipment-import/equipment-import.component';

import {RackAddComponent} from './feature/rack/component/rack-add/rack-add.component';
import {RackImportComponent} from './feature/rack/component/rack-import/rack-import.component';
import {RackExportComponent} from './feature/rack/component/rack-export/rack-export.component';

import {RackToSpaceComponent} from './feature/rack/component/rack-to-space/rack-to-space.component';
import {RackToBcmComponent} from './feature/rack/component/rack-to-bcm/rack-to-bcm.component';
import {RackToTenantComponent} from './feature/rack/component/rack-to-tenant/rack-to-tenant.component';

import {UserAddComponent} from './feature/user/component/user-add/user-add.component';
import {UserTenantAddComponent} from './feature/user/component/user-tenant-add/user-tenant-add.component';
import {UserImportComponent} from './feature/user/component/user-import/user-import.component';
import {UserExportComponent} from './feature/user/component/user-export/user-export.component';

import { AuthenticationGuard } from 'microsoft-adal-angular6';
import {WelcomeComponent} from './welcome/welcome.component';
import { ObjectTypeConfigurationAddComponent} from './feature/configuration/component/object-type-configuration-add/object-type-configuration-add.component';
import { ObjectAdvanceComponent} from './feature/object/component/object-advance/object-advance.component';

import {ObjectManagementComponent} from './feature/object/component/object-management/object-management.component';
import {ObjectStructureAddComponent} from './feature/object/component/object-structure-add/object-structure-add.component';
import {ObjectTypeAddComponent} from './feature/configuration/component/object-type-add/object-type-add.component';
import {EdgeConfigurationAddComponent} from './feature/configuration/component/edge-configuration-add/edge-configuration-add.component';


import {EdgeObjectManagementComponent} from './feature/edge/component/edge-object-management/edge-object-management.component';

import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'edgeConfigurationAdd', component: EdgeConfigurationAddComponent, canActivate: [AuthenticationGuard] },
  { path: 'configurationAdd', component: ObjectTypeConfigurationAddComponent, canActivate: [AuthenticationGuard] },
  { path: 'objectTypeAdd', component: ObjectTypeAddComponent, canActivate: [AuthenticationGuard] },
  { path: 'objectEdgeAdd', component: EdgeObjectManagementComponent, canActivate: [AuthenticationGuard] },  
  { path: 'objectAdd', component: ObjectManagementComponent, canActivate: [AuthenticationGuard] },  
  { path: 'objectAdvanceAdd', component: ObjectAdvanceComponent, canActivate: [AuthenticationGuard] },  
  
  { path: 'objectStructureAdd', component: ObjectStructureAddComponent, canActivate: [AuthenticationGuard] },    
  { path: 'tenantAdd', component: TenantAddComponent, canActivate: [AuthenticationGuard] },

{ path: 'datacenterAdd', component: DatacenterAddComponent, canActivate: [AuthenticationGuard] },
{ path: 'floorAdd', component: FloorAddComponent, canActivate: [AuthenticationGuard] },
{ path: 'roomAdd', component: RoomAddComponent, canActivate: [AuthenticationGuard] },

{ path: 'equipmentAdd', component: EquipmentAddComponent, canActivate: [AuthenticationGuard] },
{ path: 'equipmentExport', component: EqipmentExportComponent, canActivate: [AuthenticationGuard] },
{ path: 'equipmentImport', component: EqipmentImportComponent, canActivate: [AuthenticationGuard] },

{ path: 'userAdd', component: UserAddComponent, canActivate: [AuthenticationGuard] },
{ path: 'userTenantAdd', component: UserTenantAddComponent, canActivate: [AuthenticationGuard] },
{ path: 'userImport', component: UserImportComponent, canActivate: [AuthenticationGuard] },
{ path: 'userExport', component: UserExportComponent, canActivate: [AuthenticationGuard] },

{ path: 'rackAdd', component: RackAddComponent, canActivate: [AuthenticationGuard] },
{ path: 'rackImport', component: RackImportComponent, canActivate: [AuthenticationGuard] },
{ path: 'rackExport', component: RackExportComponent, canActivate: [AuthenticationGuard] },

{ path: 'rackSpaceAdd', component: RackToSpaceComponent, canActivate: [AuthenticationGuard] },
{ path: 'rackTenantAdd', component: RackToTenantComponent, canActivate: [AuthenticationGuard] },
{ path: 'rackBcmAdd', component: RackToBcmComponent, canActivate: [AuthenticationGuard] },


{ path: '', component: WelcomeComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
