import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EquipmentAddComponent } from './component/equipment-add/equipment-add.component';
import { EqipmentListComponent } from './component/equipment-list/equipment-list.component';
import { EqipmentImportComponent } from './component/equipment-import/equipment-import.component';
import { EqipmentExportComponent } from './component/equipment-export/equipment-export.component';
import {DatacenterModule} from '../datacenter/datacenter.module';
import {MaterialModule} from './material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {mapperreducer} from './reducer/mapper.reducer';
import {MapperEffects} from './effect/mapper.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [EquipmentAddComponent, EqipmentListComponent, EqipmentImportComponent, EqipmentExportComponent],
  imports: [
    CommonModule,
    DatacenterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    StoreModule.forFeature(
      'mapperState',mapperreducer
    ),
    EffectsModule.forFeature([MapperEffects])
  ],
  exports:[
    EquipmentAddComponent,
    EqipmentListComponent,
    EqipmentImportComponent,
    EqipmentExportComponent
  ]
})
export class EquipmentModule { }
