import {Tenant} from '../../../shared/model/tenant/tenant';
import {DataCenterLocationState} from './building.state';
import {FloorState} from './floor.state';
import {RoomState} from './room.state';


export interface AppState {
    buildingState:DataCenterLocationState;
    floorState:FloorState;
    roomState:RoomState;
}