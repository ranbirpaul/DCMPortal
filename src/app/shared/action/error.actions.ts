import { Action } from '@ngrx/store'
import { Error  } from '../model/common/error'

export const ADD_ERROR = '[ERROR] Add';
export const REMOVE_ERROR = '[ERROR] Remove';
export const LOAD_ERROR='[ERROR] Load'



export class AddError implements Action {
    readonly type = ADD_ERROR
    constructor(public payload: Error) {}
}

export class RemoveError implements Action {
    readonly type = REMOVE_ERROR
    constructor() {}
}

export class LoadError implements Action {
    readonly type = LOAD_ERROR
    constructor() {}
}

export type Actions = AddError|RemoveError|LoadError

