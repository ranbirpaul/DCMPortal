import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { DataCenterLocation } from '../../../shared/model/Location/datacenter-location.model'

export const ADD_DATACENTER_LOCATION = '[DATACENTERLOCATION] Add'
export const REMOVE_DATACENTER_LOCATION= '[DATACENTERLOCATION] Remove'
export const LOAD_DATACENTER_LOCATIONS= '[DATACENTERLOCATIONS] Load'
export const DATACENTER_LOCATIONS_SUCCESS= '[DATACENTERLOCATIONSSUCCESS] Success'
export const DATACENTER_LOCATIONS_FAIL= '[DATACENTERLOCATIONSFAIL] Fail'
export const FETCH_DATACENTER_LOCATIONS= '[FETCHDATACENTERLOCATIONS] Fetch'
export const DATACENTER_LOCATIONS_UPDATE = '[DATACENTERLOCATIONS] Update'
export const DATACENTER_LOCATIONS_UPDATE_INITIATE = '[DATACENTERLOCATIONS] Updateinitiate'

export class AddDataCenterLocation implements Action {

    readonly type = ADD_DATACENTER_LOCATION

    constructor(public payload: DataCenterLocation) {}
}

export class FetchDataCenterLocations implements Action {

    readonly type = FETCH_DATACENTER_LOCATIONS

    constructor() {}
}

export class LoadDataCenterLocations implements Action {

    readonly type = LOAD_DATACENTER_LOCATIONS
    constructor(public payload: DataCenterLocation[]) {}
    
}

export class DataCenterLocationsFail implements Action {

    readonly type = DATACENTER_LOCATIONS_FAIL

    constructor(public payload:any) {}
}

export class UpdateDataCenterLocation implements Action {

    readonly type = DATACENTER_LOCATIONS_UPDATE

    constructor(public payload: DataCenterLocation) {}
}

export class DataCenterLocationsUpdateInitiate implements Action {

    readonly type = DATACENTER_LOCATIONS_UPDATE_INITIATE

    constructor(public payload:string) {}
}

export class DataCenterLocationsSuccess implements Action {

    readonly type = DATACENTER_LOCATIONS_SUCCESS

    constructor() {}
}


export class RemoveDataCenterLocation implements Action {
    
    readonly type = REMOVE_DATACENTER_LOCATION

    constructor(public payload: string) {}
}


export type Actions = DataCenterLocationsUpdateInitiate | UpdateDataCenterLocation |  DataCenterLocationsSuccess|DataCenterLocationsFail|LoadDataCenterLocations | AddDataCenterLocation | RemoveDataCenterLocation