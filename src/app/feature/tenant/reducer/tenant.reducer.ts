import { Action,ActionReducer } from '@ngrx/store';
import { group } from '@angular/animations';
import * as TenantActions from './../action/tenant.actions';
import { Tenant } from '../../../shared/model/tenant/tenant';
import {AppState} from '../state/app.state';

export const initialState: AppState = { 
    editTenantId:'',
    error:'',
    loaded:false,
    loading:false,
    saved:false,
    saving:false,
    tenantList: [{group:"AAPL",company:'Apple SG Tle Ltd',department:'Finance',tenantId:'1',tenantName:'SF Derivative'},{group:"AAPL",company:'Apple SG Tle Ltd',department:'Finance',tenantId:'2',tenantName:'HF Trading'},

]};

export function tenantReducer(state: AppState = initialState, action: TenantActions.Actions) {
    
  switch(action.type) {
    case TenantActions.LOAD_TENANT:
        let obj :AppState={editTenantId:'', tenantList: action.payload,loaded:true,loading:false,error:'',saved:false,saving:false};
        state=obj;
        return state; 
    case TenantActions.INITIATE_UPDATE_TENANT:
        return {...state,editTenantId:action.payload}; 
    case TenantActions.SUCCESS_TENANT:
         return {...state,saved:true};
    case TenantActions.FAILURE_TENANT:
        return {...state,saved:false};               
    default:
        return state;
}

}