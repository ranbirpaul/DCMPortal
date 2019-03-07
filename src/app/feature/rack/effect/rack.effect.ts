import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { catchError, map, concatMapTo, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import * as RackActions from '../action/rack.actions';
import { ApiService } from '../../../shared/dataservice/api.service';
import { Rack } from '../../../shared/model/rack/rack';


@Injectable()
export class RackEffects {
  constructor(private action$: Actions, private apiServices: ApiService) { }

  @Effect()
  addTenant$: Observable<Action> = this.action$
    .pipe(
    ofType<RackActions.AddRack>(RackActions.ADD_RACK)
    )
    .pipe(
    switchMap(
      (action) => {
        var obj = {
          rackName: action.payload.rackName,
          procurementDate: action.payload.procurementDate,
          rackCapacity: action.payload.rackCapacity

        }
        console.log('Final Object...');
        console.log(obj);
        return this.apiServices.postData('Rack/AddRack', obj);
      }
    ),
    mergeMap((obj: any) => {
      return [new RackActions.FetchRack()
      ];
    })
    )
      @Effect()
      public fetchListOfRack$: Observable<Action> = this.action$.pipe(
        ofType(RackActions.FETCH_RACK),
        switchMap(() => this.apiServices.getData('Rack/GetAllRacks')),
        map((racks: Rack[]) => {
          console.log('Fetch Completes');
          console.log(racks);
          return new RackActions.RefreshRack(racks); 
        })
      );    
     
      @Effect() 
      removeRack$: Observable<Action> = this.action$
      .pipe(
        ofType<RackActions.DeleteRack>(RackActions.DELETE_RACK)
      )
        .pipe(
            switchMap(
            (action)=>{ 
                
              return this.apiServices.deleteData('Rack/DeleteRackById','?id='+action.payload)        
            }
          ), 
          mergeMap((tenant: any) => {
            return [new RackActions.FetchRack()]; 
          })
        ) 
     
        @Effect() 
        updateRack$: Observable<Action> = 
        this.action$
        .pipe(
        ofType<RackActions.UpdateRack>(RackActions.UPDATE_RACK)
        )
          .pipe(
              switchMap(
              (action)=>{ 
                console.log(action.payload);
                return this.apiServices.putData('Rack/UpdateRack',action.payload)        
              }
            ), 
            mergeMap((tenant: any) => {
              return [new RackActions.FetchRack()]; 
            })
          )      


}
