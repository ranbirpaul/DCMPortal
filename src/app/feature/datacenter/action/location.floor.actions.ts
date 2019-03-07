import { Action } from '@ngrx/store'
import { Floor } from '../../../shared/model/location/floor';

export const FETCH_FLOOR_LOCATION = '[FLOOR] Fetch';
export const LOAD_FLOOR_LOCATION = '[FLOOR] Load';

export const ADD_FLOOR_LOCATION = '[FLOOR] Add';
export const REMOVE_FLOOR_LOCATION = '[FLOOR] Remove';
export const UPDATE_FLOOR_LOCATION = '[FLOOR] Update';

export const SUCCESS_FLOOR_LOCATION = '[FLOOR] Success';
export const FAILURE_FLOOR_LOCATION = '[FLOOR] Failure';
export const INITIATE_UPDATE_FLOOR_LOCATION ='[FLOOR]Initiateupdate'

export class AddFloor implements Action {
    readonly type = ADD_FLOOR_LOCATION
    constructor(public payload: Floor) {}
}

export class RemoveFloor implements Action {
    readonly type = REMOVE_FLOOR_LOCATION
    constructor(public payload: string) {}
}

export class UpdateFloor implements Action {
    readonly type = UPDATE_FLOOR_LOCATION
    constructor(public payload: Floor) {}
}

export class SuccessFloor implements Action {
    readonly type = SUCCESS_FLOOR_LOCATION
    constructor(public payload: string) {}
}

export class FailureFloor implements Action {
    readonly type = FAILURE_FLOOR_LOCATION
    constructor(public payload: string) {}
}

export class FetchFloor implements Action {
    readonly type = FETCH_FLOOR_LOCATION
}

export class LoadFloor implements Action {
    readonly type = LOAD_FLOOR_LOCATION
    constructor(public payload: Floor[]) {}
}

export class InitiateUpdateFloor implements Action {
    readonly type = INITIATE_UPDATE_FLOOR_LOCATION
    constructor(public payload: string) {}
}


export type Actions = InitiateUpdateFloor | FetchFloor | LoadFloor| AddFloor | UpdateFloor | RemoveFloor | SuccessFloor | FailureFloor