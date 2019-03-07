import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable,of,combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import {Floor  } from '../../../../shared/model/Location/floor';
import { Room } from '../../../../shared/model/Location/Room';
import {DataCenterLocation} from '../../../../shared/model/location/datacenter-location.model';
import { AppState } from '../../state/app.state';
import * as DataCenterActions from '../../action/datacenter-location.actions';
import * as RoomActions from '../../action/location.room.actions';
import {CommonService} from '../../../../shared/service/common.service';
import {City} from '../../../../shared/model/common/city';
import {Region} from '../../../../shared/model/common/region';
import {Country} from '../../../../shared/model/common/country';
import {State} from '../../../../shared/model/common/state';
import {MatTableDataSource} from '@angular/material';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material';
import {BuildingService} from '../../service/building.service';
import { forkJoin } from "rxjs";
import {DialogConfirmDelete,DialogData} from '../../../../shared/component/dialog/dialog-confirm-delete';
import { FloorState } from '../../state/floor.state';
import { FloorService } from '../../service/floor.service';
import { AuthenticationService } from '../../../../authentication.service';

@Component({
  selector: 'app-floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.scss']
})
export class FloorListComponent implements OnInit {
  floors$: Observable<Floor[]>;
  isAuthor:boolean;
  floors:Floor[];
  floorsState :Observable<FloorState>;
   seacrhText:string;
  regions:Region[];
  countries:Country[];
  states:State[];
  cities:City[];
  displayedColumns: string[] = ['regionName', 'countryName', 'stateName', 'cityName','siteName','buildingName','floorName','edit','delete'];
  floorView:floorView={floorId:'1',floorName:'1', buildingId:'1', buildingName:'',cityName:'',countryName:'',regionName:'',siteName:'',stateName:''}
  floorViews:floorView[]=[this.floorView];
  dataSource = new MatTableDataSource(this.floorViews);
  applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
  
  constructor(private floorservice:FloorService,
              private commonService:CommonService,
              private buildingservice:BuildingService,
              private dialog:MatDialog,
              private authenticationService:AuthenticationService
            ) { 
              this.isAuthor=this.authenticationService.isAuthor;
  this.commonService.getRegion().subscribe(x=>this.regions=x);
  this.commonService.getCountry().subscribe(x=>this.countries=x);
  this.commonService.getCity().subscribe(x=>this.cities=x);
  this.commonService.getState().subscribe(x=>this.states=x); 
  
}



ngOnInit() {
  this.buildingservice.fetchBuilding();
  this.buildingservice.getBuildingsOnly();
  this.floorservice.fetchFloor();
  this.floorservice.getFloors();
  this.floorservice.getFloorsOnly().subscribe(x=>{
    console.log('floorList');
    console.log(x);
    this.floors=x;
    this.updateSource();
  }) 


}

updateSource(){
  forkJoin(
    this.commonService.getRegion(),
    this.commonService.getCountry(),
    this.commonService.getCity(),
    this.commonService.getState()
    ).subscribe(results=>{
      console.log('waiting for other to finished..');
       console.log(this.floors);
       let floorViewArray:floorView[]=new Array<floorView>();
        this.floors.map(z=>
          {
            if(this.buildingservice.getBuildingById(z.buildingId))
            {
              floorViewArray.push({
          
          regionName:this.getRegionNameById(this.buildingservice.getBuildingById(z.buildingId).regionId),
          countryName:this.getCountryNameById(this.buildingservice.getBuildingById(z.buildingId).countryId),
          stateName:this.getStateNameById(this.buildingservice.getBuildingById(z.buildingId).stateId),
          cityName:this.getCityNameById(this.buildingservice.getBuildingById(z.buildingId).cityId),
          siteName:this.buildingservice.getBuildingById(z.buildingId).siteName,
          buildingName:this.buildingservice.getBuildingById(z.buildingId).buildingName,
          buildingId:this.buildingservice.getBuildingById(z.buildingId).buildingId,
          floorName:z.floorName,
          floorId:z.floorId

            }
          )
        }
          })
          this.floorViews=floorViewArray;
        console.log(this.floorViews);
        if(this.floorViews.length>0)
        {
          this.dataSource = new MatTableDataSource(this.floorViews);
          console.log(this.dataSource);
        }
      
    })
    
}
handleDelete(arg:Floor){
  this.floorservice.deleteFloor(arg.floorId);
}
handleEdit(arg:Floor){
  if(!this.isAuthor){
    alert("You are not authorised to perform this operation");
    return
   }
  console.log(arg);
  this.floorservice.initiateEditFloor(arg.floorId);
}

openDialog(row:any) {
  if(!this.isAuthor){
    alert("You are not authorised to perform this operation");
    return
   }
  console.log(row);
 const dialogRef =this.dialog.open(DialogConfirmDelete, {
   data: {
     title: 'Datacenter Floor Removal Confirmation'
   }
 });

 dialogRef.afterClosed().subscribe(result => {
  console.log('The dialog was closed');
  if(result)
    this.handleDelete(row);
});
}

getRegionNameById(id:string){
  console.log("id >>"+id);
if(this.regions!=null)
return this.regions.find(x=>x.regionId==id).regionName;
}
getCountryNameById(id:string){
if(this.countries!=null)    
return this.countries.find(x=>x.countryId==id).countryName;
}
getStateNameById(id:string){
if(this.states!=null)
return this.states.find(x=>x.stateId==id).stateName;
}
getCityNameById(id:string){
if(this.cities!=null)    
return this.cities.find(x=>x.cityId==id).cityName;
}
deleteLocation(location){

  this.floorservice.deleteFloor(location);
}
editLocation(location)
{

  this.floorservice.editFloor(location);
}
}

export interface floorView{
  buildingId:string,
  regionName:string,
  countryName:string,
  stateName:string,
  cityName:string,
  siteName:string,
  buildingName:string,
  floorName:string,
  floorId:string
}

