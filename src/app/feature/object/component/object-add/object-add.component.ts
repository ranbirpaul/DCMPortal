import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit, Injectable, ElementRef, ViewChild } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { FormGroup }        from '@angular/forms';
import { BaseObjectConfig }     from '../../model/base-object-config';
import { ObjectControlServiceService }    from '../../service/object-control-service.service';
import {ObjectServiceService} from '../../service/object-service.service';
import { AuthenticationService } from '../../../../authentication.service';
import {CommonService} from '../../../../shared/service/common.service';
import {ApiService} from '../../../../shared/dataservice/api.service';
import { TextboxObject } from '../../model/text-box-object-config';
import {CommunicationService} from '../../../datacenter/service/communication.service';
import { ObjectService} from "../../service/object.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-object-add',
  templateUrl: 'object-add.component.html',
  styleUrls: ['object-add.component.scss'],
  providers: [ 
    ObjectControlServiceService,
    CommonService,
    ApiService
   ]
})
export class ObjectAddComponent implements OnInit {
  configs: BaseObjectConfig<any>[] = [];
  selectedValue: string;
  types:any[]=[];
  titleAlert: string = 'This field is required';
  objectName:string="Object";
  editId:string='';
  editMode:boolean=false;
  isAuthor:boolean=true;

  form: FormGroup;
  form1: FormGroup;
  payLoad = '';
  
  constructor(
    private ocs: ObjectControlServiceService,
    private os:ObjectServiceService,
    private authService:AuthenticationService,
    private commonService:CommonService,
    private apiService:ApiService,
    private communicationService:CommunicationService,
    private objectService:ObjectService

  ){
    this.isAuthor=this.authService.isAuthor;
    commonService.getConfig().then(x=>{
      console.log('Configuration File...');
      this.types=x;
      console.log(this.types);
    });

  }
  onSubmit() {
    let properties:any={};
    let model = this.types.find(x=>x.type==this.selectedValue).model;
    for (let key in this.form.value) {
      if(key!="name"){
        if(this.form.value[key]){
      let propertyValue={value:this.form.value[key]};
      properties[key]=propertyValue;
        }
      }
    }

    this.payLoad = JSON.stringify(this.form.value);
    this.objectService.createObject(model,this.selectedValue,properties,this.form.value["name"]).subscribe(x=>{
      alert("Object Created - " + x.objectId);
      this.communicationService.changeMessage(x.objectId);
    })
  }

  
  ngOnInit() {
    this.form = this.ocs.toFormGroup(this.configs);
  }
  onObjectTypeChange(arg:any){
    //this.configs=this.os.getObjectConfiguration1(arg);
    this.communicationService.changeDcaTypeMessage(arg);
    
    this.objectName= this.types.find(x=>x.type==arg).typeDisplayName;
    let url:string="https://abitydefregasbtc2eundev.azurewebsites.net//api/v1.0/modelDefinitions/"+this.types.find(x=>x.type==arg).model+"/types/"+arg;
    console.log("url>>"+url);
    this.apiService.getData(url).subscribe(x=>{
      console.log("Response received...");
      console.log(x);
      this.configs=this.getObject(x);
      this.form = this.ocs.toFormGroup(this.configs);
    })
  }


  getObject(arg) {
    let configs: BaseObjectConfig<any>[] = [];
    let jsonObject:any= arg;
//adding name
console.log('initial...'); 
console.log(jsonObject.name);

if(jsonObject.name){
configs.push(
  new TextboxObject({
    key: "name",
    label: "Name",
    //value: '',
    required: true,
    order: 1
  })

);
}

    console.log(jsonObject.properties);
    for (let key in jsonObject.properties) {
      console.log(jsonObject.properties[key].dataType);
      console.log(jsonObject.properties[key].isMandatory);

      configs.push(
        new TextboxObject({
          key: key,
          label: _.startCase(key),
          //value: '',
          required: jsonObject.properties[key].isMandatory,
          order: 2
        })

      );
      }
      console.log('Config...');
    console.log(configs);
    return configs.sort((a, b) => a.order - b.order);
  }
}

export interface IObjectData{
  name:string;
  type:string;
  model:string;
  properties:{

  }
}

