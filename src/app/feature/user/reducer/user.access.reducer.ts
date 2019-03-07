import { Action, ActionReducer } from '@ngrx/store';
import { group } from '@angular/animations';
import * as UserActions from '../action/user.access.actions';
import { UserAccess } from '../../../shared/model/user/user.access';
import {UserAccessState} from '../state/user.access.state';

export const initialState: UserAccessState ={ editUserAccessId:'', error:'',loaded:false,loading:false,saved:false,saving:false, userAccessList: [
    {userAccessId: '1', userId: 'guruprasad.tiwari@in.abb.com',roleId:'DCM Exec'}    
  ]};
 
export function userReducer(state: UserAccessState = initialState, action: UserActions.Actions) {

    switch(action.type) {
        case UserActions.REFRESH_USER:
            let obj :UserAccessState={editUserAccessId:'',userAccessList: action.payload,loaded:true,loading:false,error:'',saved:false,saving:false};
            state=obj;
            return state; 
        case UserActions.INITIATE_UPDATE_USER:
            return {...state,editUserAccessId:action.payload};               
        default:
            return state;
    }
}