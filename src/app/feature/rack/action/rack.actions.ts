import { Action } from '@ngrx/store'
import { Company } from '../../../shared/model/Tenant/Company'
import { Rack } from '../../../shared/model/Rack/rack';
export const ADD_RACK = '[RACK] Add';
export const UPDATE_RACK = '[RACK] Update';
export const DELETE_RACK = '[RACK] Delete';
export const REFRESH_RACK = '[RACK] Refresh';
export const FETCH_RACK = '[RACK] Fetch';
export const INITIATE_UPDATE_RACK ='[RACK]Initiateupdate'

export class AddRack implements Action {
    readonly type = ADD_RACK
    constructor(public payload: Rack) {}
}
export class UpdateRack implements Action {
    readonly type = UPDATE_RACK;
    constructor(public payload: Rack) {}
}
export class DeleteRack implements Action {
    readonly type = DELETE_RACK;
    constructor(public payload: Rack) {}
}
export class RefreshRack implements Action {
    readonly type = REFRESH_RACK;
    constructor(public payload: Rack[]) {}
}

export class FetchRack implements Action {
    readonly type = FETCH_RACK
}

export class InitiateUpdateRack implements Action {
    readonly type = INITIATE_UPDATE_RACK
    constructor(public payload: string) {}
}

export type Actions = AddRack|UpdateRack|DeleteRack|RefreshRack|FetchRack|InitiateUpdateRack