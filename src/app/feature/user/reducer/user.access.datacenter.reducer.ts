import { Action, ActionReducer } from '@ngrx/store';
import { group } from '@angular/animations';
import * as UserDatacenterActions from '../action/user.access.datacenter.actions';
import { UserAccess } from '../../../shared/model/user/user.access';
import {UserDatacenterState} from '../state/user.access.datacenter.state';

export const initialState: UserDatacenterState ={ editUserDatacenterId:'', error:'',loaded:false,loading:false,saved:false,saving:false, userAccessList: [
    {userAccessId: '1', userDataCenterId: 'datacenterid',buildingId:'buildingId'}    
  ]};
 
export function userDatacenterReducer(state: UserDatacenterState = initialState, action: UserDatacenterActions.Actions) {

    switch(action.type) {
        case UserDatacenterActions.REFRESH_USER_DATACENTER:
            let obj :UserDatacenterState={editUserDatacenterId:'',userAccessList: action.payload,loaded:true,loading:false,error:'',saved:false,saving:false};
            state=obj;
            return state; 
        case UserDatacenterActions.INITIATE_UPDATE_USER_DATACENTER:
            return {...state,editUserDatacenterId:action.payload};               
        default:
            return state;
    }
}