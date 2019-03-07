import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
  import {BuildingService} from '../../../datacenter/service/building.service';
  import {FloorService} from '../../../datacenter/service/floor.service';
  import {RoomService} from '../../../datacenter/service/room.service';
  import {DataCenterLocation} from '../../../../shared/model/location/datacenter-location.model';
  import {Floor} from '../../../../shared/model/location/floor';
  import {CommunicationService} from '../../../datacenter/service/communication.service';
  import { Room } from '../../../../shared/model/location/room';
  import { AuthenticationService } from '../../../../authentication.service';
 
  @Component({
    selector: 'app-rack-to-space',
    templateUrl: './rack-to-space.component.html',
    styleUrls: ['./rack-to-space.component.scss']
  })
  export class RackToSpaceComponent  {
    isAuthor:boolean=true;
    formGroup: FormGroup;
    selectedLocation:any;
    editLocatiion:any;
    editRoom:Room;
    titleAlert: string = 'This field is required';
    buildingList:DataCenterLocation[];
    buildingMasterList:DataCenterLocation[];  
    siteArray:string[]=new Array<string>();
    floorList:Floor[];
    floorMasterList:Floor[];
    constructor(
      private formBuilder: FormBuilder,
      private buildingService:BuildingService,
      private communicationService:CommunicationService,
      private floorService:FloorService,
      private roomservice:RoomService,
      private authenticationService:AuthenticationService
    ) { 
      this.isAuthor=this.authenticationService.isAuthor;
      this.roomservice.fetchRooms();
      this.floorService.fetchFloor();
      this.floorService.getFloors();
      this.floorService.getFloorsOnly().subscribe(x=>{
        this.floorMasterList=x;
      })
      this.buildingService.getBuildingsOnly().subscribe(x=>{
        this.buildingMasterList=x;
        //this.siteList=this.buildingService.getDistinctSite();
      });
      this.roomservice.getRooms().subscribe(x=>{
        console.log('Room edit subscription start');
        console.log(x);
        console.log('Room edit subscription end');
        if(x.editRoomId!=''){
          console.log('Edit Room Id >>'+x.editRoomId);
        this.editRoom=roomservice.getRoomById(x.editRoomId);
        console.log(this.editRoom);
        let editFloorAsPerRoom=this.floorService.getFloorById(this.editRoom.floorId);
        console.log(this.editRoom);
        let buildingEditFloor=this.buildingService.getBuildingById(editFloorAsPerRoom.buildingId);
        this.editLocatiion={
          regionId:buildingEditFloor.regionId,
          countryId:buildingEditFloor.countryId,
          stateId:buildingEditFloor.stateId,
          cityId:buildingEditFloor.cityId
        }
        console.log('Before sending message to master component');
        console.log(this.editLocatiion);
        this.onBuildingSelect(buildingEditFloor.buildingId);
        this.communicationService.changeMessage(this.editLocatiion);
        this.formGroup.patchValue({
        site:buildingEditFloor.siteName,
        building:editFloorAsPerRoom.buildingId,
        floor:this.editRoom.floorId,
        zone:this.editRoom.zone,
        room:this.editRoom.roomName
        })
      }
        
      });
  
    }
  
    ngOnInit() {
      this.createForm();
      this.setChangeValidate()
    }
    locationSelectHandler(eventArgs){
    this.selectedLocation=eventArgs;
    this.applyCityFilter(eventArgs.cityId);
    console.log(this.selectedLocation);
    }
  applyCityFilter(cityId:string){
    console.log('Before applying filter');
    console.log(this.buildingMasterList);
    if(this.buildingMasterList){
      this.buildingList=this.buildingMasterList.filter(x=>x.cityId==cityId)
      for(var datacenterBuilding of this.buildingList){
        console.log(this.siteArray.indexOf(datacenterBuilding.siteName));
        if(this.siteArray.indexOf(datacenterBuilding.siteName)==-1)
          this.siteArray.push(datacenterBuilding.siteName);        
      }
      console.log('SiteArray');
      console.log(this.siteArray);
    }
  
  }
  
  onSiteSelect(site:string){
    if(this.buildingMasterList){
      this.buildingList=this.buildingMasterList.filter(x=>x.siteName==site)
    }
  }
  
  onBuildingSelect(buildingId:string)  {
    console.log('floor master list >>');
    console.log(this.floorMasterList);
      this.floorList=this.floorMasterList.filter(x=>x.buildingId==buildingId)
  }
    createForm() {
      
      this.formGroup = this.formBuilder.group({
        'site':  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        'building':  [null, [Validators.required]],
        'floor' : [null, [Validators.required]],
        'room' : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],      
        'zone' : [null, []],
        'area' : [null,[]],
      });
    }
  
    setChangeValidate() {
  
    }  
  
    onSubmit() {
      let room : Room ={
        buildingId:this.formGroup.value.building,
        cityId:this.selectedLocation.cityId,
        regionId:this.selectedLocation.regionId,
        countryId:this.selectedLocation.countryId,
        stateId : this.selectedLocation.stateId,
        siteName : this.formGroup.value.site,
        floorId:this.formGroup.value.floor,
        floorName:this.floorService.getFloorById(this.formGroup.value.floor).floorName,
        buildingName:this.buildingService.getBuildingById(this.formGroup.value.building).buildingName,
        zone:this.formGroup.value.zone,
        roomName:this.formGroup.value.room,
        roomId:''
      }
      if(this.editRoom){
        room.roomId = this.editRoom.roomId;
       this.roomservice.updateRoom (room);
      }
      else
      this.roomservice.addRoom(room);
    }
  
  }
  
  export interface Region {
    value: string;
    viewValue: string;
  }    
