import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { catchError, map, concatMapTo, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import * as MapperActions from '../action/mapper.actions';
import { ApiService } from '../../../shared/dataservice/api.service';
import { Mapper } from '../../../shared/model/mapper/mapper';

@Injectable()
export class MapperEffects {

  constructor(private action$: Actions, private apiServices: ApiService) { }
  mapperFetchUrl: string = 'GenericMapper/GetAllGenericMappers';
  mapperAddUrl: string = 'GenericMapper/AddGenericMapper';
  mapperRemoveUrl: string = 'GenericMapper//DeleteGenericMapperById';

  @Effect()
  addMapper$: Observable<Action> = this.action$
    .pipe(ofType<MapperActions.AddMapper>(MapperActions.ADD_MAPPER))
    .pipe(
    switchMap(
      (action) => {
        var obj = {
            destinationId: action.payload.destinationId,
            destinationName: action.payload.destinationName,
            sourceName: action.payload.sourceName,
            sourceId: action.payload.sourceId,
            destinationTypeMasterId: action.payload.destinationTypeMasterId,
            sourceTypeMasterId: action.payload.sourceTypeMasterId
        }
        console.log('Submitting Mapper');
        console.log(obj);

        return this.apiServices.postData(this.mapperAddUrl, obj)
      }
    ),
    mergeMap((mapper: any) => {
      return [new MapperActions.FetchMapper()];
    })
    )
    @Effect()
    public fetchListOfMapping$: Observable<Action> = this.action$.pipe(
      ofType<MapperActions.FetchMapper>(MapperActions.FETCH_MAPPER),
      switchMap(() => this.apiServices.getData(this.mapperFetchUrl)),
      map((obj: any) => {
        return new MapperActions.LoadMapper(obj);
      })
    );
  
  
@Effect()
  removeMapping$: Observable<Action> = this.action$
    .pipe(ofType<MapperActions.RemoveMapper>(MapperActions.REMOVE_MAPPER))
    .pipe(
    switchMap(
      (action) => {

        return this.apiServices.deleteData(this.mapperRemoveUrl, '?id=' + action.payload)
      }
    ),
    mergeMap((datacenterlocations: any) => {
      return [new MapperActions.FetchMapper(), new MapperActions.SuccessMapper('Successfully removed mapping')
      ];
    })
    )
/*
  @Effect()
  updateDataCenterLocation$: Observable<Action> =
    this.action$
      .ofType<DataCenterActions.UpdateDataCenterLocation>(DataCenterActions.DATACENTER_LOCATIONS_UPDATE)
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


  */
}

