import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { catchError, map, concatMapTo, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import * as DataCenterActions from '../action/datacenter-location.actions';
import { ApiService } from '../../../shared/dataservice/api.service';
import { DataCenterLocation } from '../../../shared/model/location/datacenter-location.model';

@Injectable()
export class BuildingEffects {

  constructor(private action$: Actions, private apiServices: ApiService) { }
  buildingFetchUrl: string = 'BuildingLocation/GetAllBuildingLocations';
  buildingAddUrl: string = 'BuildingLocation/AddBuildingLocation';

  @Effect()
  addDataCenterLocation$: Observable<Action> = this.action$
    .pipe(ofType<DataCenterActions.AddDataCenterLocation>(DataCenterActions.ADD_DATACENTER_LOCATION))
    .pipe(
    switchMap(
      (action) => {
        var obj = {
          buildingName: action.payload.buildingName,
          cityId: action.payload.cityId,
          regionId: action.payload.regionId,
          countryId: action.payload.countryId,
          stateId: action.payload.stateId,
          siteName: action.payload.siteName
        }
        return this.apiServices.postData('BuildingLocation/AddBuildingLocation', obj)
      }
    ),
    mergeMap((datacenterlocations: any) => {
      return [new DataCenterActions.FetchDataCenterLocations(), new DataCenterActions.DataCenterLocationsSuccess()
      ];
    })
    )


  @Effect()
  removeDataCenterLocation$: Observable<Action> = this.action$
    .pipe(ofType<DataCenterActions.RemoveDataCenterLocation>(DataCenterActions.REMOVE_DATACENTER_LOCATION))
    .pipe(
    switchMap(
      (action) => {

        return this.apiServices.deleteData('BuildingLocation/DeleteBuildingLocationById', '?id=' + action.payload)
      }
    ),
    mergeMap((datacenterlocations: any) => {
      return [new DataCenterActions.FetchDataCenterLocations(), new DataCenterActions.DataCenterLocationsSuccess()
      ];
    })
    )

  @Effect()
  updateDataCenterLocation$: Observable<Action> =
    this.action$
      .pipe(ofType<DataCenterActions.UpdateDataCenterLocation>(DataCenterActions.DATACENTER_LOCATIONS_UPDATE))
      .pipe(
      switchMap(
        (action) => {
          return this.apiServices.putData('BuildingLocation/UpdateBuildingLocation', action.payload)
        }
      ),
      mergeMap((datacenterlocations: any) => {
        return [new DataCenterActions.FetchDataCenterLocations(), new DataCenterActions.DataCenterLocationsSuccess()
        ];
      })
      )

  @Effect()
  public fetchListOfDatacenter$: Observable<Action> = this.action$.pipe(
    ofType(DataCenterActions.FETCH_DATACENTER_LOCATIONS),
    switchMap(() => this.apiServices.getData(this.buildingFetchUrl)),
    map((datacenterlocations: any) => {
      return new DataCenterActions.LoadDataCenterLocations(datacenterlocations);
    })
  );
}

