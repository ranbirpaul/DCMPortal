  import { Component } from '@angular/core';
  import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
  import {BuildingService} from '../../service/building.service';
  import {FloorService} from '../../service/floor.service';
  import {DataCenterLocation} from '../../../../shared/model/location/datacenter-location.model';
  import {CommunicationService} from '../../service/communication.service';
  import { AuthenticationService } from '../../../../authentication.service';
  @Component({
  selector: 'app-datacenter-add',
  templateUrl: './datacenter-add.component.html',
  styleUrls: ['./datacenter-add.component.scss']
})

 
  export class DatacenterAddComponent  {
    isAuthor:boolean=true;
    formGroup: FormGroup;
    selectedLocation:any;
    editLocatiion:any;
    editBuilding:DataCenterLocation;
    titleAlert: string = 'This field is required';
    regions: Region[] = [
      {value: '1', viewValue: 'Asia Pacific'},
      {value: '2', viewValue: 'Europe'},
      {value: '3', viewValue: 'North America'}
    ];
    constructor(
      private formBuilder: FormBuilder,
      private buildingService:BuildingService,
      private communicationService:CommunicationService,
      private authenticationService:AuthenticationService
    ) { 
      this.isAuthor=this.authenticationService.isAuthor;
      this.buildingService.getBuildings().subscribe(x=>{
        if(x.editBuildingId!=''){
        this.editBuilding=buildingService.getBuildingById(x.editBuildingId);
        this.editLocatiion={
          regionId:this.editBuilding.regionId,
          countryId:this.editBuilding.countryId,
          stateId:this.editBuilding.stateId,
          cityId:this.editBuilding.cityId
        }
        this.communicationService.changeMessage(this.editLocatiion);
        this.formGroup.patchValue({
        site:this.editBuilding.siteName,
        building:this.editBuilding.buildingName
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
    console.log(this.selectedLocation);
    }

    createForm() {
      
      this.formGroup = this.formBuilder.group({
        'site':  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        'building':  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
        
      });
    }
  
    setChangeValidate() {

    }  

    onSubmit() {
      let datacenterlocationObject : DataCenterLocation ={
        buildingName:this.formGroup.value.building,
        buildingId:'',
        cityId:this.selectedLocation.cityId,
        regionId:this.selectedLocation.regionId,
        countryId:this.selectedLocation.countryId,
        stateId : this.selectedLocation.stateId,
        siteName : this.formGroup.value.site
      }
      if(this.editBuilding){
        datacenterlocationObject.buildingId = this.editBuilding.buildingId;
        this.buildingService.updateBuilding(datacenterlocationObject);
      }
      else
        this.buildingService.addBuilding(datacenterlocationObject);
    }
  
  }

  export interface Region {
    value: string;
    viewValue: string;
  }