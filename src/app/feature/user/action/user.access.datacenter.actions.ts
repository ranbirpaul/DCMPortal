import { Action } from '@ngrx/store'
import { UserAccessDatacenter } from '../../../shared/model/user/user.access.datacenter';
export const ADD_USER_DATACENTER = '[USERDATACENTER] Add';
export const UPDATE_USER_DATACENTER = '[USERDATACENTER] Update';
export const DELETE_USER_DATACENTER = '[USERDATACENTER] Delete';
export const REFRESH_USER_DATACENTER = '[USERDATACENTER] Refresh';
export const FETCH_USER_DATACENTER = '[USERDATACENTER] Fetch';
export const INITIATE_UPDATE_USER_DATACENTER ='[USERDATACENTER]Initiateupdate'

export class AddUserDatacenter implements Action {
    readonly type = ADD_USER_DATACENTER
    constructor(public payload: UserAccessDatacenter) {}
}
export class UpdateUserDatacenter implements Action {
    readonly type = UPDATE_USER_DATACENTER;
    constructor(public payload: UserAccessDatacenter) {}
}
export class DeleteUserDatacenter implements Action {
    readonly type = DELETE_USER_DATACENTER;
    constructor(public payload: UserAccessDatacenter) {}
}
export class RefreshUserDatacenter implements Action {
    readonly type = REFRESH_USER_DATACENTER;
    constructor(public payload: UserAccessDatacenter[]) {}
}

export class FetchUserDatacenter implements Action {
    readonly type = FETCH_USER_DATACENTER
}

export class InitiateUpdateUserDatacenter implements Action {
    readonly type = INITIATE_UPDATE_USER_DATACENTER
    constructor(public payload: string) {}
}

export type Actions = AddUserDatacenter|UpdateUserDatacenter|DeleteUserDatacenter|RefreshUserDatacenter|FetchUserDatacenter|InitiateUpdateUserDatacenter