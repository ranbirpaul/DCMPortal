import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DataCenterLocation } from '../../../shared/model/location/datacenter-location.model';
import { AppState } from '../state/app.state';
import { Observable } from 'rxjs';
//import { TreeviewModule, TreeviewItem } from 'ngx-treeview';

//import {CommonService} from '../services/common/common.service';
//import {TenantService} from '../services/tenant.service';

@Injectable({
  providedIn: 'root'
})
export class DatacenterService {
  
  
  constructor(private store: Store<AppState>
  
  ) {
        
  }
  getDataCenters(): Observable<AppState> {
    return this.store.select('dataCenterLocationState');
  }
  locationStructures: LocationStructure[] = new Array<LocationStructure>();

  itemExists(ts: LocationStructure): boolean {
    for (var tenant of this.locationStructures) {
      if (ts.value == tenant.value  && ts.parentid == tenant.parentid)
        return true;
    }
    return false;
  }
 /* 
  getDataCentersTreeView(): TreeviewItem[] {
    console.log('before treeview processing');
    console.log(this.datacenterlocations);
    for (var datacenter of this.datacenterlocations) {
      
      var obRegion = new LocationStructure(this.commonService.getRegionById(datacenter.regionId), datacenter.regionId, '');
      if (!this.itemExists(obRegion))
        this.locationStructures.push(obRegion);

      var obCountry = new LocationStructure(this.commonService.getCountryById(datacenter.countryId), datacenter.countryId, datacenter.regionId);
      if (!this.itemExists(obCountry))
        this.locationStructures.push(obCountry);

      var obstate = new LocationStructure(this.commonService.getStateById(datacenter.stateId), datacenter.stateId, datacenter.countryId);
      if (!this.itemExists(obstate))
        this.locationStructures.push(obstate);

      var obcity = new LocationStructure(this.commonService.getCityById(datacenter.cityId),datacenter.cityId, datacenter.stateId);
      if (!this.itemExists(obcity))
        this.locationStructures.push(obcity);

      var obsite = new LocationStructure(datacenter.siteName, datacenter.siteName,datacenter.cityId);
      if (!this.itemExists(obsite))
        this.locationStructures.push(obsite);

      var obbuilding = new LocationStructure(datacenter.buildingName, datacenter.buildingId, datacenter.siteName);
      if (!this.itemExists(obbuilding))
        this.locationStructures.push(obbuilding);


    }


    console.log(this.locationStructures);
    var items = this.getNestedChildren(this.locationStructures, '');

    var result = [];
    for (var item of items) {
      result.push(new TreeviewItem({
        text: item.text, value: item.value, collapsed: true, children: item.children
      }));
    }
    return result;
  }
*/
  getNestedChildren(arr, parentid) {
    var out = []
    for (var i in arr) {
      if (arr[i].parentid == parentid) {
        var children = this.getNestedChildren(arr, arr[i].value)

        if (children.length) {
          arr[i].children = children
        }
        out.push(arr[i])
      }
    }
    return out
  }
}

export class LocationStructure {
  constructor(public text: string, public value: string, public parentid: string) {

  }
}
