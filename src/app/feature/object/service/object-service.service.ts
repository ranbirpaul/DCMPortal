import { Injectable }       from '@angular/core';

import { BaseObjectConfig } from '../model/base-object-config';
import {DropdownObject  } from '../model/drop-down-object-config';
import { TextboxObject } from '../model/text-box-object-config';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ObjectServiceService {

  constructor() { 

  }
  getObjectConfiguration1(arg) {
    let configs: BaseObjectConfig<any>[] = [];
    let formTypestring:string;
     let rackStr="{\"model\": \"abb.ability.device\",\"typeId\": \"abb.ability.device.rack\",  \"version\": \"3.0.0\",  \"unique\": [ \"serialNumber\" ],\"properties\": { \"serialNumber1\": { \"dataType\": \"string\", \"isMandatory\": false }, \"rackName1\": { \"dataType\": \"string\", \"isMandatory\": true } }, \"variables\": { \"power\": { \"dataType\": \"number\" } }}";
    let tenantGroupStr="{\"model\": \"abb.ability.device\",\"typeId\": \"abb.ability.device.tenant.group\",  \"version\": \"3.0.0\",  \"unique\": [ \"tenantGroup\" ],\"properties\": { \"tenantGroup\": { \"dataType\": \"string\", \"isMandatory\": true }, \"groupDescription\": { \"dataType\": \"string\", \"isMandatory\": false } }, \"variables\": { \"power\": { \"dataType\": \"number\" } }}";
    if(arg=="Tenant Group")
      formTypestring=tenantGroupStr;
    else
      formTypestring=rackStr;
      
    let jsonObject:any= JSON.parse(formTypestring);
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
          order: 1
        })

      );
      }
    
    return configs.sort((a, b) => a.order - b.order);
  }




}


