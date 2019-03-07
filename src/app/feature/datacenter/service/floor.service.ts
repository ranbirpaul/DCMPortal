import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Floor } from '../../../shared/model/Location/Floor';
import { AppState } from '../state/app.state';
import * as FloorActions from '../action/location.floor.actions';
import {FloorState} from '../state/floor.state';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FloorService {
  floors:Floor[];
  constructor(private store: Store<AppState>) 
  { 
    this.getFloorsOnly().subscribe(x=>{
     this.floors= x;
    });
  }
  initiateEditFloor(id:string)    {
   this.store.dispatch(new FloorActions.InitiateUpdateFloor(id)); 
  }
  getFloors(): Observable<FloorState> {
    return this.store.select('floorState');
  }
  getFloorById(id:string):Floor{
    if(this.floors)
      return this.floors.find(x=>x.floorId==id);
  }
  getFloorsOnly():Observable<Floor[]>{
    
    return this.store.select('floorState').pipe(
      map(x=> x.floorList)
    );
  }

  addFloor(floor:Floor){
    console.log('Ading Floor');
    console.log(floor);
    this.store.dispatch(new FloorActions.AddFloor(floor));
  }

  fetchFloor(){
    this.store.dispatch(new FloorActions.FetchFloor());
  }
  deleteFloor(id:string){
    var result=confirm('Are you sure to delete floor?')
    if(result)
      this.store.dispatch(new FloorActions.RemoveFloor(id));
  }
  editFloor(floor:Floor){
    this.store.dispatch(new FloorActions.UpdateFloor(floor));
  }
}
