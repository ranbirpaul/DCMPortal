import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable, of, observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DataCenterLocation } from '../../../shared/model/Location/datacenter-location.model';
import { AppState } from '../state/app.state';
import * as BuildingActions from '../action/datacenter-location.actions';
import {DataCenterLocationState} from '../state/building.state';
import {map} from 'rxjs/operators';
import {ParentChild} from '../../../shared/model/common/parent.child';
import * as _ from 'lodash';
import {CommonService} from '../../../shared/service/common.service';
import {Region} from '../../../shared/model/common/region';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  datacenterLocations:DataCenterLocation[];
  parentChildArrary:ParentChild[];
  sitesArray: string[]=new Array<string>();
  regionList:Region[];
  
  constructor(
    private store: Store<AppState>,
    private commonService:CommonService
  ) {
    

    console.log(this.commonService.regionList);
    this.commonService.regionList$.subscribe(x=>{
      console.log('Region from service >>');
      console.log(x);
      this.regionList=x;
    });
    this.getBuildingsOnly().subscribe(x=>{
      this.datacenterLocations=x;
      this.parentChildArrary=this.getParentChildArray(x);
    });
   }
   convert(array){
    var map = {}
    for(var i = 0; i < array.length; i++){
        var obj = array[i]
        if(!(obj.Id in map)){
            map[obj.Id] = obj
            map[obj.Id].children = []
        }

        if(typeof map[obj.Id].Id == 'undefined'){
            map[obj.Id].Id = obj.Id
            map[obj.Id].Parent= obj.Parent
        }

        var parent = obj.Parent || '-';
        if(!(parent in map)){
            map[parent] = {}
            map[parent].children = []
        }

        map[parent].children.push(map[obj.Id])
    }
    return map['-']
}

getNestedChildren(arr, parentid) {
  var out = []
  for (var i in arr) {
    if (arr[i].Parent == parentid) {
      var children = this.getNestedChildren(arr, arr[i].item)

      if (children.length) {
        arr[i].children = children
      }
      let element:any={item:'',children:[]};
      element.children=arr[i].children;
      element.item=arr[i].item;
      if(arr[i].children==undefined)
      element.children=null;
      out.push( element)
    }
  }
  return out
}


getParentChildArray(locations:DataCenterLocation[]):any{
  
  var parentChildDictionary: { [id: string] : ParentChild; } = {};
  console.log('...locations...');
  //observable.forkJoin(this.commonService.getRegion()).;
  console.log(this.regionList);
  for(var location of locations){
    console.log(this.commonService.getRegionById(location.regionId));
    parentChildDictionary[location.regionId] = {item:this.commonService.getRegionById(location.regionId),Parent:''};
    parentChildDictionary[location.countryId+location.regionId] = {item:this.commonService.getCountryById(location.countryId),Parent:this.commonService.getRegionById(location.regionId)};
    parentChildDictionary[location.stateId+location.countryId] ={item:this.commonService.getStateById(location.stateId),Parent:this.commonService.getCountryById(location.countryId)};
    parentChildDictionary[location.cityId+location.stateId] ={item:this.commonService.getCityById(location.cityId),Parent:this.commonService.getStateById(location.stateId)};
    parentChildDictionary[location.siteName+location.cityId] ={item:location.siteName,Parent:this.commonService.getCityById(location.cityId)};
    parentChildDictionary[location.siteName+location.buildingName] ={item:location.buildingName,Parent:location.siteName};

  }
  console.log('lodash...>>');
  console.log(_.values(parentChildDictionary));
  console.log('end lodash....');
  return parentChildDictionary;
} 

getNestedNode(){
  //console.log(this.parentChildArrary);
  var array = [{ "Id": "1", "Name": "abc", "Parent": "", "attr": "abc" },
           { "Id": "2", "Name": "abc", "Parent": "1", "attr": "abc" },
           { "Id": "3", "Name": "abc", "Parent": "2", "attr": "abc" },
           { "Id": "4","Name": "abc" , "Parent": "2", "attr": "abc" }];
  if(this.parentChildArrary.length>0){
           //console.log(this.convert(this.parentChildArrary));
           return this.parentChildArrary;
  }
}
   getDistinctSite():string[]{
     for(var datacenterBuilding of this.datacenterLocations){
        console.log(this.sitesArray.indexOf(datacenterBuilding.siteName));
        if(this.sitesArray.indexOf(datacenterBuilding.siteName)==-1)
          this.sitesArray.push(datacenterBuilding.siteName);        
       }
       console.log(this.sitesArray);
       return this.sitesArray;
   }   
  getBuildings(): Observable<DataCenterLocationState> {
    
    return this.store.select('dataCenterLocationState');
  }
  getBuildingById(buildingId:string):DataCenterLocation{
    console.log('building id>>'+buildingId);
    console.log(this.datacenterLocations);
    return this.datacenterLocations.find(x=>x.buildingId==buildingId);
  }

  getBuildingsOnly(): Observable<DataCenterLocation[]> {
    
    return this.store.select('dataCenterLocationState')
    .pipe(map(x=>x.buildingList));
  }

  addBuilding(datacenterlocationObject:DataCenterLocation){
    this.store.dispatch(new BuildingActions.AddDataCenterLocation (datacenterlocationObject));
  }
  updateBuilding(datacenterlocationObject:DataCenterLocation){
    this.store.dispatch(new BuildingActions.UpdateDataCenterLocation(datacenterlocationObject));
  }
  initiateUpdateBuilding(buildingId:string){
    this.store.dispatch(new BuildingActions.DataCenterLocationsUpdateInitiate(buildingId));
  }

  deleteBuilding(datacenterlocationObject:DataCenterLocation){
    this.store.dispatch(new BuildingActions.RemoveDataCenterLocation(datacenterlocationObject.buildingId));
  }
  fetchBuilding(){
    this.store.dispatch(new BuildingActions.FetchDataCenterLocations());
  } 
}
