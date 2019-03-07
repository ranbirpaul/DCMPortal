import { Action } from '@ngrx/store'

import { Room } from '../../../shared/model/Location/Room';

export const ADD_ROOM_LOCATION = '[ROOM] Add';
export const UPDATE_ROOM_LOCATION = '[ROOM] Update';
export const DELETE_ROOM_LOCATION = '[ROOM] Delete';

export const FETCH_ROOM_LOCATION = '[ROOM] Fetch';
export const LOAD_ROOM_LOCATION = '[ROOM] Load';
export const SUCCESS_ROOM_LOCATION = '[ROOM] Success';
export const FAILURE_ROOM_LOCATION = '[ROOM] Failure';
export const INITIATE_UPDATE_ROOM_LOCATION ='[ROOM]Initiateupdate'

export class InitiateUpdateRoom implements Action {
    readonly type = INITIATE_UPDATE_ROOM_LOCATION
    constructor(public payload: string) {}
}

export class FailureRoom implements Action {
    readonly type = FAILURE_ROOM_LOCATION
    constructor(public payload: string) {}
}

export class SuccessRoom implements Action {
    readonly type = SUCCESS_ROOM_LOCATION
    constructor(public payload: string) {}
}

export class FetchRoom implements Action {
    readonly type = FETCH_ROOM_LOCATION
    constructor() {}
}

export class LoadRoom implements Action {
    readonly type = LOAD_ROOM_LOCATION
    constructor(public payload: Room[]) {}
}

export class AddRoom implements Action {
    readonly type = ADD_ROOM_LOCATION
    constructor(public payload: Room) {}
}

export class UpdateRoom implements Action {
    readonly type = UPDATE_ROOM_LOCATION
    constructor(public payload: Room) {}
}
export class DeleteRoom implements Action {
    readonly type = DELETE_ROOM_LOCATION
    constructor(public payload: string) {}
}
export type Actions = AddRoom|UpdateRoom|DeleteRoom|FetchRoom|LoadRoom|InitiateUpdateRoom|SuccessRoom|FailureRoom