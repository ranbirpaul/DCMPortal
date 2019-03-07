import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Tenant } from '../../../shared/model/tenant/tenant';
import {AppState} from '../state/app.state';
import * as TenantActions from '../action/tenant.actions';
//import { TreeviewModule,TreeviewItem } from 'ngx-treeview';


@Injectable({
  providedIn: 'root'
})

export class TenantService {
  constructor(private store: Store<AppState>) {

   }
   
   tenants:Tenant[]=new Array<Tenant>();
   tenantStructures:TenantStructure[]=new Array<TenantStructure>();
  
   getTenants(): Observable<AppState> {
    this.store.select('error').subscribe(x=>{
      console.log('error occurred ...123');
      console.log(x);
    });
    return this.store.select('tenant');
  }
  fetchTenanats(){
    this.store.dispatch(new TenantActions.FetchTenant());
  }

  addTenant(tenant:Tenant){
    console.log(tenant);
    this.store.dispatch(new TenantActions.AddTenant(tenant));
  }

  
  removeTenant(tenant:Tenant){
    this.store.dispatch(new TenantActions.RemoveTenant(tenant.tenantId));
  }
  updateTenant(tenant:Tenant){
    this.store.dispatch(new TenantActions.UpdateTenant(tenant));
  }

  updateInitiate(id:string){
    this.store.dispatch(new TenantActions.InitiateUpdateTenant(id));
  }

  itemExists(ts:TenantStructure):boolean{
    for(var tenant of this.tenantStructures){
      if(ts.value==tenant.value && ts.text==tenant.text && ts.parentid==tenant.parentid)
        return true;
    }
    return false;
  }
  

 /* getTenantsTreeView(): TreeviewItem[] {
    console.log(this.tenants);

    for(var tenant of this.tenants ){

      console.log('Tree View Finisehed');
      var objGroup=new TenantStructure(tenant.group,tenant.group,'');      
      if(!this.itemExists(objGroup))
        this.tenantStructures.push(objGroup);

      var objCompany=new TenantStructure(tenant.company,tenant.company,tenant.group);      
        if(!this.itemExists(objCompany))
          this.tenantStructures.push(objCompany);       

      var objDepartment=new TenantStructure(tenant.department,tenant.department,tenant.company);      
         if(!this.itemExists(objDepartment))
           this.tenantStructures.push(objDepartment);    

      var objTenant=new TenantStructure(tenant.tenantName,tenant.tenantId,tenant.department);      
        if(!this.itemExists(objTenant))
           this.tenantStructures.push(objTenant); 
           
    }
    
    var items=this.getNestedChildren(this.tenantStructures,'');

    var result=[];
    for (var item of items){
      result.push(new TreeviewItem({
        text: item.text, value: item.value, collapsed: true, children: item.children
  }));
    }
    return result;
}
*/

 getNestedChildren(arr, parentid) {
  var out = []
  for(var i in arr) {
      if(arr[i].parentid == parentid) {
          var children = this.getNestedChildren(arr, arr[i].value)

          if(children.length) {
              arr[i].children = children
          }
          out.push(arr[i])
      }
  }
  return out
}
}

export class TenantStructure{
  constructor(public text:string,public value:string,public parentid:string){

  }
}
