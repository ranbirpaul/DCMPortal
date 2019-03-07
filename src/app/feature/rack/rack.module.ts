import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RackExportComponent } from './component/rack-export/rack-export.component';
import { RackImportComponent } from './component/rack-import/rack-import.component';
import { RackAddComponent } from './component/rack-add/rack-add.component';
import { RackListComponent } from './component/rack-list/rack-list.component';
import { RackToSpaceComponent } from './component/rack-to-space/rack-to-space.component';
import { RackToSpaceListComponent } from './component/rack-to-space-list/rack-to-space-list.component';
import { RackToTenantComponent } from './component/rack-to-tenant/rack-to-tenant.component';
import { RackToTenantListComponent } from './component/rack-to-tenant-list/rack-to-tenant-list.component';
import { RackToBcmComponent } from './component/rack-to-bcm/rack-to-bcm.component';
import { RackToBcmListComponent } from './component/rack-to-bcm-list/rack-to-bcm-list.component';
import {DatacenterModule} from '../../feature/datacenter/datacenter.module';
import {MaterialModule} from './material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {rackreducer} from './reducer/rack.reducer';
import {RackEffects} from './effect/rack.effect';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
  declarations: [RackExportComponent, RackImportComponent, RackAddComponent, RackListComponent, RackToSpaceComponent, RackToSpaceListComponent, RackToTenantComponent, RackToTenantListComponent, RackToBcmComponent, RackToBcmListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DatacenterModule,
    StoreModule.forFeature(
      'rackState',rackreducer
    ),
    EffectsModule.forFeature([RackEffects])
  ],
  exports:[
    RackAddComponent,
    RackListComponent,
    RackImportComponent,
    RackExportComponent,
    RackToBcmComponent,
    RackToSpaceComponent,
    RackToTenantComponent
  ]
})
export class RackModule { }
