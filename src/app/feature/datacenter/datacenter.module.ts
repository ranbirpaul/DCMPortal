import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatacenterAddComponent } from './component/datacenter-add/datacenter-add.component';
import {MaterialModule} from './material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SharedModule} from '../../shared/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import { BuildingService } from './service/building.service';
import {  FloorService } from './service/floor.service';
import { RoomService } from './service/room.service';
import { DatacenterService } from './service/datacenter.service';

import {datacenterlocationreducer} from '../datacenter/reducer/datacenterlocation.reducer';
import {floorreducer} from '../datacenter/reducer/location.floor.reducer';
import {roomreducer} from '../datacenter/reducer/location.room.reducer';
import { MasterLocationComponent } from './component/master-location/master-location.component';
import { DatacenterListComponent } from './component/datacenter-list/datacenter-list.component';
import {BuildingEffects} from './effect/building-effects';
import {FloorEffects} from './effect/floor.effect';
import { RoomEffects} from './effect/room.effect';

import {CommunicationService} from '../datacenter/service/communication.service';
import { FloorAddComponent } from './component/floor-add/floor-add.component';
import { FloorListComponent } from './component/floor-list/floor-list.component';
import { RoomListComponent } from './component/room-list/room-list.component';
import { RoomAddComponent } from './component/room-add/room-add.component';
@NgModule({
  declarations: [DatacenterAddComponent, MasterLocationComponent, DatacenterListComponent, FloorAddComponent, FloorListComponent, RoomListComponent, RoomAddComponent],
  imports: [MatDialogModule,
    MaterialModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
    StoreModule.forFeature('dataCenterLocationState', datacenterlocationreducer),
    StoreModule.forFeature('rooms', roomreducer),
    StoreModule.forFeature('floorState', floorreducer),
    EffectsModule.forFeature([BuildingEffects,RoomEffects,FloorEffects]),
  ],
  exports:[DatacenterAddComponent,MasterLocationComponent],
  providers:[
    BuildingService,
    FloorService,
    RoomService,
    DatacenterService,
    CommunicationService
  ]
})
export class DatacenterModule { }





