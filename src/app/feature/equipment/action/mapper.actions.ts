import { Action } from '@ngrx/store'
import { Mapper } from '../../../shared/model/mapper/mapper'

export const FETCH_MAPPER = '[MAPPER] Fetch';
export const LOAD_MAPPER = '[MAPPER] Load';

export const ADD_MAPPER = '[MAPPER] Add';
export const REMOVE_MAPPER = '[MAPPER] Remove';
export const UPDATE_MAPPER = '[MAPPER] Update';

export const SUCCESS_MAPPER = '[MAPPER] Success';
export const FAILURE_MAPPER = '[MAPPER] Failure';
export const INITIATE_UPDATE_MAPPER ='[MAPPER]Initiateupdate';
export const APPLY_FILTER ='[MAPPER]Filter';

export class AddMapper implements Action {
    readonly type = ADD_MAPPER
    constructor(public payload: Mapper) {}
}

export class RemoveMapper implements Action {
    readonly type = REMOVE_MAPPER
    constructor(public payload: string) {}
}

export class UpdateMapper implements Action {
    readonly type = UPDATE_MAPPER
    constructor(public payload: Mapper) {}
}

export class SuccessMapper implements Action {
    readonly type = SUCCESS_MAPPER
    constructor(public payload: string) {}
}

export class FailureMapper implements Action {
    readonly type = FAILURE_MAPPER
    constructor(public payload: string) {}
}

export class FetchMapper implements Action {
    readonly type = FETCH_MAPPER
}

export class LoadMapper implements Action {
    readonly type = LOAD_MAPPER
    constructor(public payload: Mapper[]) {}
}

export class InitiateUpdateMapper implements Action {
    readonly type = INITIATE_UPDATE_MAPPER
    constructor(public payload: string) {}
}

export class ApplyFilter implements Action {
    readonly type = APPLY_FILTER
    constructor(public payload: any) {}
}


export type Actions = InitiateUpdateMapper | FetchMapper | LoadMapper| AddMapper | UpdateMapper | RemoveMapper | SuccessMapper | FailureMapper | ApplyFilter