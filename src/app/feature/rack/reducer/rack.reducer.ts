import { Action, ActionReducer } from '@ngrx/store';
import { group } from '@angular/animations';
import * as RackActions from '../action/rack.actions';
import { Rack } from '../../../shared/model/Rack/rack';
import {AppState} from '../state/app.state';

export const initialState: AppState ={ editRackId:'', error:'',loaded:false,loading:false,saved:false,saving:false, rackList: [
    {rackId: '1', rackName: 'Rack1',rackCapacity:10,procurementDate:new Date()}
    
  ]};
 
export function rackreducer(state: AppState = initialState, action: RackActions.Actions) {

    switch(action.type) {
        case RackActions.REFRESH_RACK:
            let obj :AppState={editRackId:'',rackList: action.payload,loaded:true,loading:false,error:'',saved:false,saving:false};
            state=obj;
            return state; 
        case RackActions.INITIATE_UPDATE_RACK:
            return {...state,editTenantId:action.payload}; 
              
        default:
            return state;
    }
}