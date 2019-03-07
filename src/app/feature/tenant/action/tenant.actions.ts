import { Action } from '@ngrx/store'
import { Tenant } from '../../../shared/model/tenant/tenant'

export const FETCH_TENANT = '[TENANT] Fetch';
export const LOAD_TENANT = '[TENANT] Load';

export const ADD_TENANT = '[TENANT] Add';
export const REMOVE_TENANT = '[TENANT] Remove';
export const UPDATE_TENANT = '[TENANT] Update';

export const SUCCESS_TENANT = '[TENANT] Success';
export const FAILURE_TENANT = '[TENANT] Failure'
export const INITIATE_UPDATE_TENANT ='[TENANT]Initiateupdate'


export class AddTenant implements Action {
    readonly type = ADD_TENANT
    constructor(public payload: Tenant) {}
}

export class RemoveTenant implements Action {
    readonly type = REMOVE_TENANT
    constructor(public payload: string) {}
}

export class UpdateTenant implements Action {
    readonly type = UPDATE_TENANT
    constructor(public payload: Tenant) {}
}

export class SuccessTenant implements Action {
    readonly type = SUCCESS_TENANT
    constructor(public payload: string) {}
}

export class FailureTenant implements Action {
    readonly type = FAILURE_TENANT
    constructor(public payload: string) {}
}

export class FetchTenant implements Action {
    readonly type = FETCH_TENANT
}

export class LoadTenant implements Action {
    readonly type = LOAD_TENANT
    constructor(public payload: Tenant[]) {}
}

export class InitiateUpdateTenant implements Action {
    readonly type = INITIATE_UPDATE_TENANT
    constructor(public payload: string) {}
}


export type Actions = InitiateUpdateTenant | FetchTenant | LoadTenant| AddTenant | UpdateTenant | RemoveTenant | SuccessTenant | FailureTenant