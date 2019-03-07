import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {BuildingService} from '../../service/building.service';
import {FloorService} from '../../service/floor.service';
import {DataCenterLocation} from '../../../../shared/model/location/datacenter-location.model';
import {Floor} from '../../../../shared/model/location/floor';
import {CommunicationService} from '../../service/communication.service';
import { AuthenticationService } from '../../../../authentication.service';

@Component({
  selector: 'app-floor-add',
  templateUrl: './floor-add.component.html',
  styleUrls: ['./floor-add.component.scss']
})


export class FloorAddComponent {
  isAuthor:boolean=true;
  formGroup: FormGroup;
  selectedLocation:any;
  editLocatiion:any;
  editFloor:Floor;
  titleAlert: string = 'This field is required';
  buildingList:DataCenterLocation[];
  buildingMasterList:DataCenterLocation[];  
  siteArray:string[]=new Array<string>();

  constructor(
    private formBuilder: FormBuilder,
    private buildingService:BuildingService,
    private communicationService:CommunicationService,
    private floorService:FloorService,
    private authenticationService:AuthenticationService
  ) { 
    this.isAuthor=this.authenticationService.isAuthor;
    this.buildingService.getBuildingsOnly().subscribe(x=>{
      this.buildingMasterList=x;
      //this.siteList=this.buildingService.getDistinctSite();
    });
    this.floorService.getFloors().subscribe(x=>{
      if(x.editFloorId!=''){
        console.log('Edit Floor Id >>'+x.editFloorId);
      this.editFloor=floorService.getFloorById(x.editFloorId);
      console.log(this.editFloor);
      if(!this.editFloor)
        return;
      let buildingEditFloor=this.buildingService.getBuildingById(this.editFloor.buildingId);
      if(buildingEditFloor){
      this.editLocatiion={
        regionId:buildingEditFloor.regionId,
        countryId:buildingEditFloor.countryId,
        stateId:buildingEditFloor.stateId,
        cityId:buildingEditFloor.cityId
      }
      this.communicationService.changeMessage(this.editLocatiion);
      this.formGroup.patchValue({
      site:buildingEditFloor.siteName,
      building:this.editFloor.buildingId,
      floor:this.editFloor.floorName,
      zone:this.editFloor.zone
      })
    }
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
  createForm() {
    
    this.formGroup = this.formBuilder.group({
      'site':  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'building':  [null, [Validators.required]],
      'floor' : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'zone' : [null, []]
    });
  }

  setChangeValidate() {

  }  

  onSubmit() {
    let floor : Floor ={
      buildingId:this.formGroup.value.building,
      cityId:this.selectedLocation.cityId,
      regionId:this.selectedLocation.regionId,
      countryId:this.selectedLocation.countryId,
      stateId : this.selectedLocation.stateId,
      siteName : this.formGroup.value.site,
      floorId:'',
      floorName:this.formGroup.value.floor,
      buildingName:this.buildingService.getBuildingById(this.formGroup.value.building).buildingName,
      zone:this.formGroup.value.zone
    }
    if(this.editFloor){
      floor.floorId = this.editFloor.floorId;
     this.floorService.editFloor (floor);
    }
    else
    this.floorService.addFloor(floor);
  }

}

export interface Region {
  value: string;
  viewValue: string;
}