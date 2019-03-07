import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddComponent } from './component/user-add/user-add.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserImportComponent } from './component/user-import/user-import.component';
import { UserExportComponent } from './component/user-export/user-export.component';
import { DatacenterSelectComponent } from './component/datacenter-select/datacenter-select.component';
import {MaterialModule} from './material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { UserTenantAddComponent } from './component/user-tenant-add/user-tenant-add.component';
import { UserTenantListComponent } from './component/user-tenant-list/user-tenant-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {SharedModule} from '../../shared/shared.module';
import {userDatacenterReducer} from './reducer/user.access.datacenter.reducer';
import {userReducer} from './reducer/user.access.reducer';
import {UserAccessEffects} from './effect/user.access.effect';
import {UserDatacenterEffects} from './effect/user.access.datacenter.effect';

@NgModule({
  declarations: [UserAddComponent, UserListComponent, UserImportComponent, UserExportComponent, DatacenterSelectComponent, UserTenantAddComponent, UserTenantListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    StoreModule.forFeature('userAccessState', userReducer),
    StoreModule.forFeature('userDatacenterState', userDatacenterReducer),
    EffectsModule.forFeature([UserAccessEffects,UserDatacenterEffects]),
  ],
  exports:[
    UserAddComponent,
    UserListComponent,
    UserExportComponent,
    UserImportComponent,
    UserTenantAddComponent
  ]
})
export class UserModule { }
