import { Action,ActionReducer } from '@ngrx/store';
import { group } from '@angular/animations';
import * as MapperActions from '../action/mapper.actions';
import { Mapper } from '../../../shared/model/mapper/mapper';
import {MapperState} from '../state/mapper.state';

export const initialState: MapperState = { 
    editMapperId:'',
    error:'',
    loaded:false,
    loading:false,
    saved:false,
    saving:false,
    sourceTypeMasterId:'',
    destinationTypeMasterId:'',
    mapperList: [{sourceTypeMasterId:'',sourceName:'', assignId:'',destinationId:'',destinationName:'',destinationTypeMasterId:'',sourceId:''}]};

export function mapperreducer(state: MapperState = initialState, action: MapperActions.Actions) {
    
  switch(action.type) {
    case MapperActions.LOAD_MAPPER:
    console.log('>>');
        console.log(action.payload);
        var mapperList:Mapper[]= action.payload.filter(
            x=>x.destinationTypeMasterId==state.destinationTypeMasterId &&
            x.sourceTypeMasterId==state.sourceTypeMasterId
        );
        let obj :MapperState={destinationTypeMasterId: state.destinationTypeMasterId,sourceTypeMasterId:'', editMapperId:'', mapperList:mapperList,loaded:true,loading:false,error:'',saved:false,saving:false};
        state=obj;
        return state; 
    case MapperActions.INITIATE_UPDATE_MAPPER:
        return {...state,editTenantId:action.payload}; 
    case MapperActions.SUCCESS_MAPPER:
         return {...state,saved:true};
    case MapperActions.FAILURE_MAPPER:
        return {...state,saved:false};
    case MapperActions.APPLY_FILTER:
        return {...state,
                destinationTypeMasterId:action.payload.destinationTypeMasterId,
                sourceTypeMasterId:action.payload.sourceTypeMasterId            
            };                       
    default:
        return state;
}

}