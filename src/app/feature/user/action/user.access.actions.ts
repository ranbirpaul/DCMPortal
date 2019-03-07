import { Action } from '@ngrx/store'
import { UserAccess } from '../../../shared/model/user/user.access';
export const ADD_USER = '[USER] Add';
export const UPDATE_USER = '[USER] Update';
export const DELETE_USER = '[USER] Delete';
export const REFRESH_USER = '[USER] Refresh';
export const FETCH_USER = '[USER] Fetch';
export const INITIATE_UPDATE_USER ='[USER]Initiateupdate'

export class AddUser implements Action {
    readonly type = ADD_USER
    constructor(public payload: UserAccess) {}
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;
    constructor(public payload: UserAccess) {}
}
export class DeleteUser implements Action {
    readonly type = DELETE_USER;
    constructor(public payload: UserAccess) {}
}
export class RefreshUser implements Action {
    readonly type = REFRESH_USER;
    constructor(public payload: UserAccess[]) {}
}

export class FetchUser implements Action {
    readonly type = FETCH_USER
}

export class InitiateUpdateUser implements Action {
    readonly type = INITIATE_UPDATE_USER
    constructor(public payload: string) {}
}

export type Actions = AddUser|UpdateUser|DeleteUser|RefreshUser|FetchUser|InitiateUpdateUser