import {Floor} from '../../../shared/model/location/floor';
import {BaseState} from '../state/base.state';
export interface FloorState extends BaseState{
    floorList:Floor[],
    editFloorId
}