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
import { RoomService } from '../../service/room.service';
import { AuthenticationService } from '../../../../authentication.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {
  isAuthor:boolean=true;
  regions:Region[];
  countries:Country[];
  states:State[];
  cities:City[];
  buildingarray:DataCenterLocation[];
  floorArray:Floor[];
  seacrhText:string;

  floors$: Observable<Floor[]>;
  floors:Floor[];
  floorsState :Observable<FloorState>;

  rooms$:Observable<Room[]>;
  rooms:Room[];

  displayedColumns: string[] = [ 'countryName', 'stateName', 'cityName','siteName','buildingName','floorName','roomName','edit','delete'];
  roomView:roomView={roomId:'1',roomName:'', floorName:'1', buildingName:'',cityName:'',countryName:'',regionName:'',siteName:'',stateName:''}
  roomViews:roomView[]=[this.roomView];

  dataSource = new MatTableDataSource(this.roomViews);
  applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
  
  constructor(private floorservice:FloorService,
              private commonService:CommonService,
              private buildingservice:BuildingService,
              private roomService:RoomService,
              private dialog:MatDialog,
              private authenticationService:AuthenticationService
            ) { 
              this.isAuthor=this.authenticationService.isAuthor;
              this.commonService.getRegion().subscribe(x=>this.regions=x);
              this.commonService.getCountry().subscribe(x=>this.countries=x);
              this.commonService.getCity().subscribe(x=>this.cities=x);
              this.commonService.getState().subscribe(x=>this.states=x); 
              this.buildingservice.fetchBuilding();
              this.buildingservice.getBuildings();
              this.floorservice.fetchFloor();
              this.floorservice.getFloors();
              this.floorservice.getFloorsOnly().subscribe(x=>{
                this.floorArray=x;
                this.updateSource();
              });
              this.buildingservice.getBuildingsOnly().subscribe(x=>{
                console.log('Building List...>>');
                console.log(x);
                this.buildingarray=this.buildingservice.datacenterLocations;             
                this.updateSource();
              });
              
  
}



ngOnInit() {


  this.roomService.getRoomsOnly().subscribe(x=>{
    console.log('Floor List');
    console.log(this.floorArray);
    console.log('Building List');
    console.log(this.buildingarray);    
    console.log('roomsList');
    console.log(x);
    this.rooms=x;
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
       console.log(this.rooms);
       console.log(this.buildingarray);
       console.log(this.floorArray);
       let roomViewArray:roomView[]=new Array<roomView>();
        this.rooms.map(z=>
          {
            let floor=this.floorArray.find(x=>x.floorId==z.floorId);
            if(floor){
            let building=this.buildingarray.find(x=>x.buildingId==floor.buildingId);

            if(this.buildingservice.getBuildingById(floor.buildingId))
            {
              roomViewArray.push({
          
          regionName:this.getRegionNameById(building.regionId),
          countryName:this.getCountryNameById(building.countryId),
          stateName:this.getStateNameById(building.stateId),
          cityName:this.getCityNameById(building.cityId),
          siteName:building.siteName,
          buildingName:building.buildingName,
          roomId:z.roomId,
          roomName:z.roomName,
          floorName:floor.floorName                 

            }
            
          )
        }
        }
          })
          this.roomViews=roomViewArray;
        console.log(this.roomViews);
        if(this.roomViews.length>0)
        {
          this.dataSource = new MatTableDataSource(this.roomViews);
          console.log(this.dataSource);
        }
      
    })
    
}
handleDelete(arg:Floor){
  this.floorservice.deleteFloor(arg.floorId);
}
handleEdit(arg:Room){
  if(!this.isAuthor){
    alert("You are not authorised to perform this operation");
    return
   }
  console.log('Editing...');
  console.log(arg);
  this.roomService.initiateEditRoom(arg.roomId);
}

openDialog(row:any) {
  if(!this.isAuthor){
    alert("You are not authorised to perform this operation");
    return
   }
  console.log(row);
 const dialogRef =this.dialog.open(DialogConfirmDelete, {
   data: {
     title: 'Datacenter Room Removal Confirmation'
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

  this.roomService.removeRoom(location.roomId);
}
editLocation(location)
{

  this.roomService.initiateEditRoom(location.roomId);
}
}

export interface roomView{
  regionName:string,
  countryName:string,
  stateName:string,
  cityName:string,
  siteName:string,
  buildingName:string,
  floorName:string,
  roomId:string,
  roomName:string
}

