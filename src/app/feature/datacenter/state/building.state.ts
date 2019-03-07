import {DataCenterLocation} from '../../../shared/model/location/datacenter-location.model';
import {BaseState} from '../state/base.state';
export interface DataCenterLocationState extends BaseState {
    buildingList:DataCenterLocation[],
    editBuildingId
}