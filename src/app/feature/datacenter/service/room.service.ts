import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Room } from '../../../shared/model/Location/Room';
import { AppState } from '../state/app.state';
import * as RoomActions from '../action/location.room.actions';
//import { TreeviewModule,TreeviewItem } from 'ngx-treeview';
//import { CommonService } from './common/common.service';
import {Region} from '../../../shared/model/common/region';
import { RoomState } from '../state/room.state';


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  rooms:Room[];
  constructor(private store: Store<RoomState>) { 
    this.getRooms().subscribe(x=>{
      this.rooms=x.roomList;
    });
  }

    
  getRooms(): Observable<RoomState> {
    return this.store.select('rooms');
  }

  getRoomNameById(id:string){
  return this.rooms.find(x=>x.roomId==id).roomName;
  }
  getRoomById(id:string):Room{
    return this.rooms.find(x=>x.roomId==id); 
  }
  getRoomsOnly(): Observable<Room[]> {
    return this.store.select('rooms')
    .pipe(map(x=> x.roomList));
  }
  fetchRooms(){
    console.log('fetch room initiated');
    this.store.dispatch(new RoomActions.FetchRoom());
  }
  initiateEditRoom(id:string){
    this.store.dispatch(new RoomActions.InitiateUpdateRoom(id));
  }
  removeRoom(id:string){
    this.store.dispatch(new RoomActions.DeleteRoom(id));
  }

  addRoom(Room:Room){
    console.log('before submitting room');
    console.log(Room);
    this.store.dispatch(new RoomActions.AddRoom(Room));
  }
  updateRoom(Room:Room){
    this.store.dispatch(new RoomActions.UpdateRoom(Room));
  }

  
  locationStructures:LocationStructure[]=new Array<LocationStructure>();

   itemExists(ts:LocationStructure):boolean{
     for(var tenant of this.locationStructures){
       if(ts.value==tenant.value && ts.text==tenant.text && ts.parentid==tenant.parentid)
         return true;
     }
     return false;
   }
   /*
   getRoomsTreeView(): TreeviewItem[] {
 
 console.log(this.rooms);
     for(var room of this.rooms ){
 
       var obRegion=new LocationStructure(room.regionId,room.regionId,'');      
       if(!this.itemExists(obRegion))
         this.locationStructures.push(obRegion);
 
       var obCountry=new LocationStructure(room.countryId,room.countryId,room.regionId);      
       if(!this.itemExists(obCountry))
         this.locationStructures.push(obCountry);
 
       var obstate=new LocationStructure(room.stateId,room.stateId,room.countryId);      
       if(!this.itemExists(obstate))
         this.locationStructures.push(obstate);
 
       var obcity=new LocationStructure(room.cityId,room.cityId,room.stateId);      
       if(!this.itemExists(obcity))
         this.locationStructures.push(obcity);
 
       var obsite=new LocationStructure(room.siteName,room.siteName,room.cityId);      
       if(!this.itemExists(obsite))
         this.locationStructures.push(obsite);
 
       var obbuilding=new LocationStructure(room.buildingId,room.buildingId,room.siteName);      
       if(!this.itemExists(obbuilding))
         this.locationStructures.push(obbuilding);
 
       var obfloor=new LocationStructure(room.floorName,room.floorName,room.buildingId);      
       if(!this.itemExists(obfloor))
         this.locationStructures.push(obfloor);
 
       var obroom=new LocationStructure(room.roomName,room.roomId,room.floorName);      
       if(!this.itemExists(obroom))
         this.locationStructures.push(obroom);
   
 
            
     }
     
     var items=this.getNestedChildren(this.locationStructures,'');
 
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


export class LocationStructure{
  constructor(public text:string,public value:string,public parentid:string){

  }
}