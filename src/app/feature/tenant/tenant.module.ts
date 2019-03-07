import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantAddComponent } from './component/tenant-add/tenant-add.component';
import {TenantListComponent} from './component/tenant-list/tenant-list.component';
import {MaterialModule} from './material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {tenantReducer} from '../tenant/reducer/tenant.reducer';
import {TenantEffects} from '../tenant/effect/tenant.effect';
import { TenantService } from './service/tenant.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [TenantAddComponent,TenantListComponent],
  entryComponents: [],
  imports: [
    MatDialogModule,
    MaterialModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    StoreModule.forFeature(
      'tenant',tenantReducer
    ),
    EffectsModule.forFeature([TenantEffects]),
  ],
  exports:[TenantAddComponent],
  providers:[TenantService]
})
export class TenantModule { }
