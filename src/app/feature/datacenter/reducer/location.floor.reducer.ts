import { Action,ActionReducer } from '@ngrx/store';
import { group } from '@angular/animations';
import * as FloorAction from './../action/location.floor.actions';
import {FloorState} from '../state/floor.state'


export const initialState: FloorState = {floorList:[{buildingId:'ok',buildingName:'',cityId:'',countryId:'',regionId:'',siteName:'',stateId:'',floorId:'',floorName:'',zone:''}],editFloorId:false,error:'',loaded:false,loading:false,saved:false,saving:false};

export function floorreducer(state: FloorState = initialState, action: FloorAction.Actions) {
    
  switch(action.type) {
    case FloorAction.INITIATE_UPDATE_FLOOR_LOCATION:
    console.log('initiate update floor update');
    console.log(action.payload)
        return {...state,editFloorId:action.payload,saved:false}; 
    case FloorAction.SUCCESS_FLOOR_LOCATION:
         return {...state,saved:true};
    case FloorAction.FAILURE_FLOOR_LOCATION:
        return {...state,saved:false};
    case FloorAction.LOAD_FLOOR_LOCATION:
        let obj :FloorState={editFloorId:'', floorList: action.payload,loaded:true,loading:false,error:'',saved:false,saving:false};
        console.log('reducer received list ');
        console.log(obj);
        return obj;        
    default:
        return state;
}
}

