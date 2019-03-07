import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Mapper } from '../../../shared/model/mapper/mapper';
import * as MapperActions from '../action/mapper.actions';
import { MapperState} from '../state/mapper.state';
import { mapperreducer } from '../reducer/mapper.reducer';


@Injectable({
  providedIn: 'root'
})
export class MapperService {
  constructor(private store: Store<MapperState>) { }
    
  getMapperState(): Observable<MapperState> {
    this.store.select('mapperState').subscribe(x=>{
    console.log('Mapper Subscription');
    console.log(x);
    });
    return this.store.select('mapperState');
  }
  applyFilter(sourceTypeMasterId,destinationTypeMasterId){
    var obj ={sourceTypeMasterId:sourceTypeMasterId,destinationTypeMasterId:destinationTypeMasterId};
    console.log('Before applying filter');
    console.log(obj);
    this.store.dispatch(new MapperActions.ApplyFilter(obj));
  }
  getMappers():Observable<Mapper[]>{
    return this.store.select('mapperState').pipe(
      map(y=>y.mapperList)
    )
  }

  addMapper(mapper:Mapper){
    this.store.dispatch(new MapperActions.AddMapper(mapper));
  }
  addMappers(mappers:Mapper[]){
    for(let mapper of mappers){
      this.addMapper(mapper);
    }
  }
  fetchMapper(){
    this.store.dispatch(new MapperActions.FetchMapper());
  }
  deleteMapper(id:string){
    this.store.dispatch(new MapperActions.RemoveMapper(id));
  }
  editInitiate(id:string){
    this.store.dispatch(new MapperActions.InitiateUpdateMapper(id));
  }
  editMapper(mapper:Mapper){
    this.store.dispatch(new MapperActions.UpdateMapper(mapper));
  }
}
