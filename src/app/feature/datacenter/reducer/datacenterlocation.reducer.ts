import { Action } from '@ngrx/store';
import { DataCenterLocation } from '../../../shared/model/Location/datacenter-location.model';
import {DataCenterLocationState} from '../state/building.state';
import * as DataCenterActions from './../action/datacenter-location.actions';

const initialState:DataCenterLocationState={buildingList:[],editBuildingId:'', loaded:false,loading:false,error:'',saved:false,saving:false};

export function datacenterlocationreducer(state: DataCenterLocationState = initialState,
     action: DataCenterActions.Actions ) {
    
    switch(action.type) {
        case DataCenterActions.LOAD_DATACENTER_LOCATIONS:
            let obj :DataCenterLocationState={editBuildingId:'', buildingList: action.payload,loaded:true,loading:false,error:'',saved:false,saving:false};
            return obj;
        case DataCenterActions.DATACENTER_LOCATIONS_UPDATE_INITIATE:
            return {...state,editBuildingId:action.payload};             
        case DataCenterActions.DATACENTER_LOCATIONS_SUCCESS:
            return {...state,saved:true}; 
        case DataCenterActions.DATACENTER_LOCATIONS_UPDATE_INITIATE:
        return {...state,editBuildingId:action.payload};         
        case DataCenterActions.DATACENTER_LOCATIONS_FAIL:
        return {...state,saved:false};                            
        default:
            return state;
    }
}