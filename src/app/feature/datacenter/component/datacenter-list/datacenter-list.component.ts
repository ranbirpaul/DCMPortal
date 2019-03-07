import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable,of,combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { DataCenterLocation } from '../../../../shared/model/Location/datacenter-location.model';
import { Room } from '../../../../shared/model/Location/Room';
import { AppState } from '../../state/app.state';
import * as DataCenterActions from '../../action/datacenter-location.actions';
import * as RoomActions from '../../action/location.room.actions';
import {DataCenterLocationState} from '../../state/building.state';
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
import { AuthenticationService } from '../../../../authentication.service';

@Component({
  selector: 'app-datacenter-list',
  templateUrl: './datacenter-list.component.html',
  styleUrls: ['./datacenter-list.component.scss']
})
export class DatacenterListComponent implements OnInit {
  isAuthor:boolean=true;
  datacenterlocations: Observable<DataCenterLocation[]>;
  locations:DataCenterLocation[];
  dataCenterLocationState:Observable<DataCenterLocationState>;
  rooms:Observable<Room[]>;
  seacrhText:string;
  regions:Region[];
  countries:Country[];
  states:State[];
  cities:City[];
  displayedColumns: string[] = ['regionName', 'countryName', 'stateName', 'cityName','siteName','buildingName','edit','delete'];
  buildingView:buildingView={buildingId:'', buildingName:'',cityName:'',countryName:'',regionName:'',siteName:'',stateName:''}
  buildingViews:buildingView[]=[this.buildingView];
  dataSource = new MatTableDataSource(this.buildingViews);
  applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
  
  constructor(private buildingService:BuildingService,
              private commonService:CommonService,
              private dialog:MatDialog,
              private authenticationService:AuthenticationService
)
{ 
  this.isAuthor=this.authenticationService.isAuthor;
  this.commonService.getRegion().subscribe(x=>this.regions=x);
  this.commonService.getCountry().subscribe(x=>this.countries=x);
  this.commonService.getCity().subscribe(x=>this.cities=x);
  this.commonService.getState().subscribe(x=>this.states=x); 
  
}



ngOnInit() {
  
  this.buildingService.fetchBuilding();
  this.buildingService.getBuildings();
  this.buildingService.getBuildingsOnly().subscribe(x=>{
    this.locations=x;
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
       console.log(this.locations);
        this.buildingViews=this.locations.map(z=>({
          regionName:this.getRegionNameById(z.regionId),
          countryName:this.getCountryNameById(z.countryId),
          stateName:this.getStateNameById(z.stateId),
          cityName:this.getCityNameById(z.cityId),
          siteName:z.siteName,
          buildingName:z.buildingName,
          buildingId:z.buildingId  
        }))
        console.log(this.buildingViews);
        if(this.buildingViews.length>0)
          this.dataSource = new MatTableDataSource(this.buildingViews);
      
    })
    
}
handleDelete(arg:DataCenterLocation){
  this.buildingService.deleteBuilding(arg);
}
handleEdit(arg:DataCenterLocation){
  if(!this.isAuthor){
    alert("You are not authorised to perform this operation");
    return
   }
  console.log('Editing...');
  console.log(arg);
  this.buildingService.initiateUpdateBuilding(arg.buildingId);
}

openDialog(row:any) {
  if(!this.isAuthor){
    alert("You are not authorised to perform this operation");
    return
   }
  console.log(row);
 const dialogRef =this.dialog.open(DialogConfirmDelete, {
   data: {
     title: 'Datacenter Removal Confirmation'
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
if(confirm("Are you sure to delete "+location.buildingName+"?" ))
{
  this.buildingService.deleteBuilding(location);

}
}
editLocation(location)
{

  this.buildingService.updateBuilding(location);
}
}

export interface buildingView{
  buildingId:string,
  regionName:string,
  countryName:string,
  stateName:string,
  cityName:string,
  siteName:string,
  buildingName:string
}
