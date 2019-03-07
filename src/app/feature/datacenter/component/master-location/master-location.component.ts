import { Component, OnInit,Output,Input,EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import {CommonService} from '../../../../shared/service/common.service';
import {Region} from '../../../../shared/model/common/region';
import { Country} from '../../../../shared/model/common/country';
import {City} from '../../../../shared/model/common/city';
import {State} from '../../../../shared/model/common/state';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {CommunicationService} from '../../service/communication.service';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-master-location',
  templateUrl: './master-location.component.html',
  styleUrls: ['./master-location.component.scss']
})
export class MasterLocationComponent implements OnInit {
  formGroup: FormGroup;
  regionList$:Observable<Region[]>;
  countryList$:Observable<Country[]>;
  stateList$:Observable<State[]>;
  cityList$:Observable<City[]>; 
  @Output() locationSelect=new EventEmitter();
    constructor(
    private commonService:CommonService,
    private formBuilder: FormBuilder,
    private communicationService:CommunicationService
  ) {
    this.regionList$=commonService.getRegion();
    this.countryList$=commonService.getCountry();
    this.stateList$=commonService.getState();
    this.cityList$=commonService.getCity();
    this.communicationService.currentMessage.subscribe(x=>{
      console.log('Fetching values from parent...');
      console.log(x);
     let obj:any;
     obj=x;
     forkJoin(this.regionList$,
              this.countryList$,
              this.stateList$,
              this.cityList$).subscribe(results=>{
                console.log('All the master data of location fetched...');
                if(obj.regionId){
                  console.log(obj.regionId);
                  this.formGroup.patchValue({'regionId':obj.regionId});
                  this.onRegionSelect(obj.regionId);
                  this.formGroup.patchValue({'countryId':obj.countryId});
                  this.onCountrySelect(obj.countryId);
                  this.formGroup.patchValue({'stateId':obj.stateId})
                  this.onStateSelect(obj.stateId);
                  this.formGroup.patchValue({'cityId':obj.cityId})
                  this.onCitySelect(obj.cityId);
                 }
              })
     
    })
   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
      
    this.formGroup = this.formBuilder.group({
      'regionId':  [null, [Validators.required]],
      'countryId':  [null, [Validators.required]],
      'stateId':  [null, [Validators.required]],
      'cityId':  [null, [Validators.required]]
      
    });
  }

  onRegionSelect(value:string){
    this.countryList$=this.commonService.getCountry().pipe(map(x=>x.filter(y=>y.regionId==value)))
  }

  onCountrySelect(value:string){
    this.stateList$=this.commonService.getState().pipe(map(x=>x.filter(y=>y.countryId==value)))
  }
  onStateSelect(value:string){
    this.cityList$=this.commonService.getCity().pipe(map(x=>x.filter(y=>y.stateId==value)))
  }
  onCitySelect(value:string){
    this.locationSelect.emit(this.formGroup.value);
  }  

}

