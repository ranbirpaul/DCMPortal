import { Action, ActionReducer } from '@ngrx/store';
import { group } from '@angular/animations';
import * as RoomAction from '../action/location.room.actions';
import {RoomState} from '../state/room.state'

export const initialState: RoomState = {editRoomId:'',error:'',loading:false,loaded:false,roomList:[],saved:false,saving:false};
// [{buildingName:'ABB Bld',buildingId:'ok', cityId:'Bengaluru',countryId:'India',floorName:'FF',floorId:'test',regionId:'AP',room:'AC Room',siteName:'ABB Site',stateId:'Karnataka',zone:'High Density'}];
export function roomreducer(state: RoomState = initialState, action: RoomAction.Actions) {

    switch (action.type) {
        case RoomAction.LOAD_ROOM_LOCATION:
        let obj :RoomState={editRoomId:'',error:'',loading:false,loaded:false,roomList:action.payload,saved:false,saving:false};
        return obj; 
    case RoomAction.INITIATE_UPDATE_ROOM_LOCATION:
        return {...state,editRoomId:action.payload}; 
    case RoomAction.SUCCESS_ROOM_LOCATION:
         return {...state,saved:true};
    case RoomAction.FAILURE_ROOM_LOCATION:
        return {...state,saved:false};               
    default:
            return state;
    }
}