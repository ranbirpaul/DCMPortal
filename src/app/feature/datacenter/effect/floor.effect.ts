import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { catchError, map, concatMapTo, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import * as FloorActions from '../action/location.floor.actions';
import { ApiService } from '../../../shared/dataservice/api.service';
import { Floor } from '../../../shared/model/location/floor';

@Injectable()
export class FloorEffects {
  constructor(private action$: Actions, private apiServices: ApiService) { }

  @Effect()
  addDataCenterFloor$: Observable<Action> = this.action$
    .pipe(ofType<FloorActions.AddFloor>(FloorActions.ADD_FLOOR_LOCATION))
    .pipe(
    switchMap(
      (action) => {
        var obj = {
          floorName: action.payload.floorName,
          zone: action.payload.zone,
          buildingId: action.payload.buildingId
        }
        return this.apiServices.postData('BuildingFloor/AddBuildingFloor', obj);
      }
    ),
    mergeMap((datacenterlocations: any) => {
      return [new FloorActions.FetchFloor(), new FloorActions.SuccessFloor('Floor Submitted Succesfully')
      ];
    })
    )


  @Effect()
  public fetchListOfFloor$: Observable<Action> = this.action$.pipe(
    ofType(FloorActions.FETCH_FLOOR_LOCATION),
    switchMap(() => this.apiServices.getData('BuildingFloor/GetAllBuildingFloors')),
    map((floors: any) => {
      return new FloorActions.LoadFloor(floors);
    })
  );

  @Effect()
  removeFloor$: Observable<Action> = this.action$
    .pipe(ofType<FloorActions.RemoveFloor>(FloorActions.REMOVE_FLOOR_LOCATION))
    .pipe(
    switchMap(
      (action) => {

        return this.apiServices.deleteData('/BuildingFloor/DeleteBuildingFloorById', '?id=' + action.payload)
      }
    ),
    mergeMap((datacenterlocations: any) => {
      return [new FloorActions.FetchFloor(), new FloorActions.SuccessFloor('Floor Deleted Successfully')
      ];
    })
    )

  @Effect()
  updateFloor$: Observable<Action> =
    this.action$
      .pipe(ofType<FloorActions.UpdateFloor>(FloorActions.UPDATE_FLOOR_LOCATION))
      .pipe(
      switchMap(
        (action) => {
          return this.apiServices.putData('BuildingFloor/UpdateBuildingFloor', action.payload)
        }
      ),
      mergeMap((floor: any) => {
        return [new FloorActions.FetchFloor(), new FloorActions.SuccessFloor('Floor Updated Successfully')
        ];
      })
      )


}
