import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { catchError, map, concatMapTo, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import * as UserDatacenterActions from '../action/user.access.datacenter.actions';
import { ApiService } from '../../../shared/dataservice/api.service';
import { UserAccessDatacenter } from '../../../shared/model/user/user.access.datacenter';


@Injectable()
export class UserDatacenterEffects {
  constructor(private action$: Actions, private apiServices: ApiService) { }

  @Effect()
  addUserDatacenter$: Observable<Action> = this.action$
    .pipe(
    ofType<UserDatacenterActions.AddUserDatacenter>(UserDatacenterActions.ADD_USER_DATACENTER)
    )
    .pipe(
    switchMap(
      (action) => {
        var obj = {
        userAccessId:action.payload.userAccessId,
        buildingId:action.payload.buildingId
        }
        console.log('Final Object...');
        console.log(obj);
        return this.apiServices.postData('UserAceess/AddUserAccess', obj);
      }
    ),
    mergeMap((obj: any) => {
      return [new UserDatacenterActions.FetchUserDatacenter()
      ];
    })
    )
      @Effect()
      public fetchListOfUserDatacenter$: Observable<Action> = this.action$.pipe(
        ofType(UserDatacenterActions.FETCH_USER_DATACENTER),
        switchMap(() => this.apiServices.getData('UserAccess/GetAlluserAccess')),
        map((userDatacenter: UserAccessDatacenter[]) => {
          console.log('Fetch Completes');
          console.log(userDatacenter);
          return new UserDatacenterActions.RefreshUserDatacenter(userDatacenter); 
        })
      );    
     
      @Effect() 
      removeUserDatacenter$: Observable<Action> = this.action$
      .pipe(
        ofType<UserDatacenterActions.DeleteUserDatacenter>(UserDatacenterActions.DELETE_USER_DATACENTER)
      )
        .pipe(
            switchMap(
            (action)=>{ 
                
              return this.apiServices.deleteData('Rack/DeleteRackById','?id='+action.payload)        
            }
          ), 
          mergeMap((tenant: any) => {
            return [new UserDatacenterActions.FetchUserDatacenter()]; 
          })
        ) 
     
        @Effect() 
        updateDatacenter$: Observable<Action> = 
        this.action$
        .pipe(
        ofType<UserDatacenterActions.UpdateUserDatacenter>(UserDatacenterActions.UPDATE_USER_DATACENTER)
        )
          .pipe(
              switchMap(
              (action)=>{ 
                console.log(action.payload);
                return this.apiServices.putData('UserAccess/UpdateUser',action.payload)        
              }
            ), 
            mergeMap((tenant: any) => {
              return [new UserDatacenterActions.FetchUserDatacenter()]; 
            })
          )      


}

