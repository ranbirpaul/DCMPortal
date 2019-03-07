import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { catchError, map, concatMapTo, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import * as TenantActions from '../action/tenant.actions';
import { ApiService } from '../../../shared/dataservice/api.service';
import { Tenant } from '../../../shared/model/tenant/tenant';


@Injectable()
export class TenantEffects {
  constructor(private action$: Actions, private apiServices: ApiService) { }

  @Effect()
  addTenant$: Observable<Action> = this.action$
    .pipe(
    ofType<TenantActions.AddTenant>(TenantActions.ADD_TENANT)
    )
    .pipe(
    switchMap(
      (action) => {
        var obj = {
          tenantName: action.payload.tenantName,
          group: action.payload.group,
          company: action.payload.company,
          department: action.payload.department,
        }
        console.log('Final Object...');
        console.log(obj);
        return this.apiServices.postData('Tenant/AddTenant', obj);
      }
    ),
    mergeMap((datacenterlocations: any) => {
      return [new TenantActions.FetchTenant(), new TenantActions.SuccessTenant('Floor Submitted Succesfully')
      ];
    })
    )
      @Effect()
      public fetchListOfTenant$: Observable<Action> = this.action$.pipe(
        ofType(TenantActions.FETCH_TENANT),
        switchMap(() => this.apiServices.getData('Tenant/GetAllTenants')),
        map((tenants: Tenant[]) => {
          console.log('Fetch Completes');
          console.log(tenants);
          return new TenantActions.LoadTenant(tenants); 
        })
      );    
     
      @Effect() 
      removeTenant$: Observable<Action> = this.action$
      .pipe(
        ofType<TenantActions.RemoveTenant>(TenantActions.REMOVE_TENANT)
      )
        .pipe(
            switchMap(
            (action)=>{ 
                
              return this.apiServices.deleteData('Tenant/DeleteTenantById','?id='+action.payload)        
            }
          ), 
          mergeMap((tenant: any) => {
            return [new TenantActions.FetchTenant(),new TenantActions.SuccessTenant('Tenant Deleted Successfully')
            ]; 
          })
        ) 
     
        @Effect() 
        updateTenant$: Observable<Action> = 
        this.action$
        .pipe(
        ofType<TenantActions.UpdateTenant>(TenantActions.UPDATE_TENANT)
        )
          .pipe(
              switchMap(
              (action)=>{ 
                console.log(action.payload);
                return this.apiServices.putData('Tenant/UpdateTenant',action.payload)        
              }
            ), 
            mergeMap((tenant: any) => {
              return [new TenantActions.FetchTenant(),new TenantActions.SuccessTenant('Floor Updated Successfully')
              ]; 
            })
          )      


}
