import { Action, ActionReducer } from '@ngrx/store';
import {Error} from '../model/common/error';
import * as ErrorActions from '../action/error.actions';


export const initialState: Error={error:''};
 
export function errorreducer(state:Error = initialState, action: ErrorActions.Actions) {

    switch (action.type) {
        case ErrorActions.ADD_ERROR:
            state=action.payload;
            return state;
        case ErrorActions.LOAD_ERROR:
            return state; 
        case ErrorActions.REMOVE_ERROR:
            state=initialState;
            return state;                        
        default:
            return state;
    }
}