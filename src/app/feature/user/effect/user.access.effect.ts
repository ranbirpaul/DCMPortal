import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { catchError, map, concatMapTo, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import * as UserActions from '../action/user.access.actions';
import { ApiService } from '../../../shared/dataservice/api.service';
import { UserAccess } from '../../../shared/model/user/user.access';
import { UserAccessDatacenter } from '../../../shared/model/user/user.access.datacenter';


@Injectable()
export class UserAccessEffects {
  constructor(private action$: Actions, private apiServices: ApiService) { }

  @Effect()
  addUserAccess$: Observable<Action> = this.action$
    .pipe(
    ofType<UserActions.AddUser>(UserActions.ADD_USER)
    )
    .pipe(
    switchMap(
      (action) => {
        var obj = {
        roleId:action.payload.roleId,
        userAccessId:action.payload.userAccessId
        }
        console.log('Final Object...');
        console.log(obj);
        return this.apiServices.postData('UserAceess/AddUserAccess', obj);
      }
    ),
    mergeMap((obj: any) => {
      return [new UserActions.FetchUser()
      ];
    })
    )
      @Effect()
      public fetchListOfRack$: Observable<Action> = this.action$.pipe(
        ofType(UserActions.FETCH_USER),
        switchMap(() => this.apiServices.getData('UserAccess/GetAlluserAccess')),
        map((userAccess: UserAccess[]) => {
          console.log('Fetch Completes');
          console.log(userAccess);
          return new UserActions.RefreshUser(userAccess); 
        })
      );    
     
      @Effect() 
      removeRack$: Observable<Action> = this.action$
      .pipe(
        ofType<UserActions.DeleteUser>(UserActions.DELETE_USER)
      )
        .pipe(
            switchMap(
            (action)=>{ 
                
              return this.apiServices.deleteData('Rack/DeleteRackById','?id='+action.payload)        
            }
          ), 
          mergeMap((tenant: any) => {
            return [new UserActions.FetchUser()]; 
          })
        ) 
     
        @Effect() 
        updateRack$: Observable<Action> = 
        this.action$
        .pipe(
        ofType<UserActions.UpdateUser>(UserActions.UPDATE_USER)
        )
          .pipe(
              switchMap(
              (action)=>{ 
                console.log(action.payload);
                return this.apiServices.putData('UserAccess/UpdateUser',action.payload)        
              }
            ), 
            mergeMap((tenant: any) => {
              return [new UserActions.FetchUser()]; 
            })
          )      


}

