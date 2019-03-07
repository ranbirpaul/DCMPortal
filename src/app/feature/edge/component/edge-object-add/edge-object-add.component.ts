import { Component, Input, OnInit, Injectable, ElementRef, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';
import { FormGroup }        from '@angular/forms';
import { AuthenticationService } from '../../../../authentication.service';
import {CommonService} from '../../../../shared/service/common.service';
import {ApiService} from '../../../../shared/dataservice/api.service';
import {CommunicationService} from '../../../datacenter/service/communication.service';
import { BaseObjectConfig }     from '../../../object/model/base-object-config';
import { TextboxObject } from '../../../object/model/text-box-object-config';
import { ObjectControlServiceService }    from '../../../object/service/object-control-service.service';
import {EdgeObjectService} from '../../service/edge-object.service';
import { Observable,of } from 'rxjs';
import * as _ from 'lodash';


@Component({
  selector: 'app-edge-object-add',
  templateUrl: 'edge-object-add.component.html',
  styleUrls: ['edge-object-add.component.scss'],
  providers: [ 
    ObjectControlServiceService,
    CommonService,
    ApiService
   ]
})
export class EdgeObjectAddComponent implements OnInit {
  configs: BaseObjectConfig<any>[] = [];
  selectedValue: string;
  selectedEdgeSystemValue: string;
  selectedValueFeder: string;
  feders:any[]=[];
  systems:any[]=[];
  types:any[]=[];
  titleAlert: string = 'This field is required';
  objectName:string="Object";
  objectTypeId:string;
  editId:string='';
  editMode:boolean=false;
  isAuthor:boolean=true;

  form: FormGroup;
  form1: FormGroup;
  payLoad = '';
  
  constructor(
    private ocs: ObjectControlServiceService,
    private os:EdgeObjectService,
    private authService:AuthenticationService,
    private commonService:CommonService,
    private apiService:ApiService,
    private communicationService:CommunicationService,
    private edgeObjectService:EdgeObjectService

  ){

/*
{
	"dcaType":"Rack",
	"properties":{
	"serialNumber":{
	"value" : "2121211"
	 }
	}
}
*/


    this.isAuthor=this.authService.isAuthor;
    commonService.getEdgeConfig().then(x=>{
      console.log('Configuration File...');
      this.types=x;
      console.log(this.types);
    });

  }
  onSubmit() {

    let serialNumberValue:any={value:"xyz"};
    let property1:any={serialNumber:serialNumberValue};
    let property2:any={serialNumber:serialNumberValue};
    let properties:any={};
    
    console.log('Testing an object....');
    console.log(this.selectedValue);
    //console.log(JSON.stringify(testObject));
    console.log(this.form.value);
    for (let key in this.form.value) {
      if(key!="name"){
      let propertyValue={value:this.form.value[key]};
      properties[key]=propertyValue;
      }
      //let property:any={key:propertyValue};
      //properties.push(property);
      //console.log(key);
      //console.log(propertyValue);
    }
    let testObject:any;
    console.log("First");
    console.log(JSON.stringify(properties));
if(JSON.stringify(properties)=="{}")
{
  testObject={type:this.selectedValue+"@1",model:"abb.ability.device", name:this.form.value["name"]};
}
else{
  testObject={type:this.selectedValue+"@1",model:"abb.ability.device", properties:properties,name:this.form.value["name"]};
}
console.log(JSON.stringify(testObject));

    this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects",testObject).subscribe(x=>{
      alert("Edge Object created successfully!!");
      //pass data to the list component via angualr communication service
      let post$:Observable<any>;
      if(this.objectName=="Feeder A" || this.objectName=="Feeder B"){
      
        post$=this.edgeObjectService.createChildrenReference(this.selectedEdgeSystemValue,x.objectId,"abb.ability.device","Feeders");
        post$.subscribe(x=>{
          console.log('Reference Object Created ');
          this.communicationService.currentMessage=x.objectId;
        })
      }
      else if(this.objectName=="BCM"){
        post$=this.edgeObjectService.createChildrenReference(this.selectedValueFeder,x.objectId,"abb.ability.device","BCM");
        post$.subscribe(x=>{
          console.log('Reference Object Created ');
          this.communicationService.currentMessage=x.objectId;
        })
      }

      
    })
    this.payLoad = JSON.stringify(this.form.value);
  }

  
  ngOnInit() {
    this.form = this.ocs.toFormGroup(this.configs);
  }

  onEdgeSystemChange(arg:any){
    if(this.objectName=="Feeder A" || this.objectName=="Feeder B"){
      this.edgeObjectService.getObjects("abb.ability.device",this.selectedValue+"@1").subscribe(
        x=>{
          console.log(x);
          this.feders=x.data;
        }
      )
    }
  }

  onFederChange(arg:any){

  }
  onObjectTypeChange(arg:any){
    //this.configs=this.os.getObjectConfiguration1(arg);
    this.communicationService.changeDcaTypeMessage(arg);
    
    this.objectName= this.types.find(x=>x.type==arg).typeDisplayName;
    if(this.objectName!=="Edge System"){
      this.edgeObjectService.getObjects("abb.ability.device","abb.ability.device.edge.system@1").subscribe(
        x=>{
          console.log(x);
          this.systems=x.data;
        }
      )
    }
    let url:string="https://abitydefregasbtc2eundev.azurewebsites.net//api/v1.0/modelDefinitions/abb.ability.device/types/"+arg;
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
    /*let formTypestring:string;
    let rackStr="{\"model\": \"abb.ability.device\",\"typeId\": \"abb.ability.device.rack\",  \"version\": \"3.0.0\",  \"unique\": [ \"serialNumber\" ],\"properties\": { \"serialNumber1\": { \"dataType\": \"string\", \"isMandatory\": false }, \"rackName1\": { \"dataType\": \"string\", \"isMandatory\": true } }, \"variables\": { \"power\": { \"dataType\": \"number\" } }}";
    let tenantGroupStr="{\"model\": \"abb.ability.device\",\"typeId\": \"abb.ability.device.tenant.group\",  \"version\": \"3.0.0\",  \"unique\": [ \"tenantGroup\" ],\"properties\": { \"tenantGroup\": { \"dataType\": \"string\", \"isMandatory\": true }, \"groupDescription\": { \"dataType\": \"string\", \"isMandatory\": false } }, \"variables\": { \"power\": { \"dataType\": \"number\" } }}";
    if(arg=="Tenant Group")
      formTypestring=tenantGroupStr;
    else
      formTypestring=rackStr;
      */
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


