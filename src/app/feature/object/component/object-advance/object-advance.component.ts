import { AuthenticationService } from '../../../../authentication.service';
import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import {CommonService} from '../../../../shared/service/common.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {ApiService} from '../../../../shared/dataservice/api.service';
import {CommunicationService} from '../../../datacenter/service/communication.service';
import {ObjectService} from '../../service/object.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-object-advance',
  templateUrl: './object-advance.component.html',
  styleUrls: ['./object-advance.component.scss']
})
export class ObjectAdvanceComponent implements OnInit {
  isAuthor:boolean=true;
  formGroup: FormGroup;
  types:any[]=[];
  name:string;
  selectedType:string;
  objectById$:Observable<any>;
compoundObject:{}

  constructor(
    private objectService:ObjectService,
    private authenticationService:AuthenticationService,
    private commonService:CommonService,
    private formBuilder: FormBuilder,
    private apiService:ApiService,
    private communicationService:CommunicationService
    
    
  ) {
    this.isAuthor=this.authenticationService.isAuthor;
    this.communicationService.editMessage.subscribe(x=>{
      if(x!="default message"){
        console.log("Got Edit Values...");
        //console.log(x);
        this.objectById$=this.objectService.getObjectById("abb.ability.device",x);
        this.objectById$.subscribe(x=>{
          console.log("Get Object By Id");
          //console.log(x);
          let values:any=this.getValues(x,"value");
          //console.log(values);
          let objStr:string=JSON.stringify(x);
          let objStrNew:string;
          values.forEach(x=>{
            //console.log(JSON.stringify(x));
            let y="\""+ x.value+"\"";
            console.log();
            objStr=objStr.replace(JSON.stringify(x),y);
          })
          //console.log(objStr);
          console.log("{\"value\":");
          //objStr=objStr+"";
         //objStr=objStr.replace("\"value\"\:","");
         objStr=objStr.replace(new RegExp("{\"value\"\:",'g'), "");
         objStr=objStr.replace(new RegExp("]}",'g'),"]");

          //objStr=objStr.replace("]}","]");
          console.log(objStr);
          this.initialiseForm(JSON.parse(objStr));
          
        })
        } 
    });


    commonService.getConfig().then(x=>{
      console.log('Configuration File...');
      this.types=x;
      console.log(this.types);
    });
    this.createForm();

  }

  ngOnInit() {
    
  }


  createForm() {
      
    this.formGroup = this.formBuilder.group({
      'name':  [null],
      'type':  [null]      
    });
  }
  onObjectTypeChange(arg:any){
    this.initialiseForm("");
  }


current:any;
flag:boolean=false;
tempArray:string[]=[];
  updateWithValue(obj:any){
    var k;
    if (obj instanceof Object) {
        for (k in obj){
            if (obj.hasOwnProperty(k)){
               this.updateWithValue( obj[k] ); 
                let maybeNumber = Number("this.current")

            if(obj instanceof Array){
              console.log(4);
              console.log(obj[k]);
              console.log(5);
            }
            else{
              if(this.flag ){
                obj[k]={"value":obj[k]};
                this.flag=false;
              }
            }
                console.log(obj[k]);
                this.current=k; 
            
            }                
        }
    } else {
      console.log(this.current);  
      console.log(obj);
      this.flag=true;
    };
  }

  objectOnSubmitFn(event:any){
    console.log(JSON.stringify(event));

    let testJson:any={properties:{function:{arg:"hello"},trick:"trickworked...",test:{trig:{lets:{grid:"thankyou",args:["xyz","abc"]}}}}};
    //let testJson:any={args:["xyz","abc"]}
    //testJson.hello={value:"guru"};
    for(let i in testJson){
    console.log(testJson[i]);
    }
    this.updateWithValue(event)
    /*
   {
  "model": "abb.ability.device",
  "type": "abb.ability.device.dca.rack@1",
  "name": "FirstRack",
  "description": "description",
  "properties": {
    "SerialNumber": {
      "value": "oktest"
    },
    "functions": {
      "triggers": {
        "variableChange": {
          "VariableValue": {
            "ref": {
              "value": [
                "hjhjhjjj",
                "jkkjkjjk"
              ]
            }
          }
        }
      }
    }
  }
}

    */
console.log(this.formGroup.value);
let finalObj:any={
  "type": "abb.ability.device.dca.rack@1",
  "model":"abb.ability.device",
   "name": this.formGroup.value.name,
   "properties":event
}
 console.log( JSON.stringify(finalObj));

 this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects",finalObj).subscribe(x=>{
 alert("Object Created Successfully - " + x.objectId);     
 console.log(x);
      //pass data to the list component via angualr communication service
      this.communicationService.changeMessage(x.objectId);
    })
  }

  getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(this.getValues(obj[i], key));
        } else if (i == key) {
            objects.push({value:obj[i]});
        }
    }
    return objects;
}


initialiseForm(data:any){
  let schema:any={
    "type": "object",
    "properties": {
      "SerialNumber": { "type": "string" },
      "functions": {
        "type": "object",
        "properties": {
          "CalculateRackPower": {
             "type": "object",
             "properties":{
               "functionType":{
                 "type":"string"
               },
               "CalculateRackPower":{
                 "type":"object",
                 "properties":{
                   "endpoint":{
                     "type":"string"
                   }
                 }
                },
                "inputs":{
                  "type":"object",
                  "properties":{
                    "parameters":{"type":"string"},
                    "InputVariables":{
                      "type":"object",
                      "properties":{
                        "ref":{
                          "type":"array",
                         "items":{
                           "type":"string"
                         }
                        }
                      }
                    },
                    "OperationType":{"type":"string"}
                  }
                },
                "outputs":{
                  "type":"object",
                  "properties":{
                    "CalculatedOutput":{
                      "type":"string"
                    }
                  }
                }
             }
            },
            "triggers": {
              "type": "object",
              "properties":{
                "variableChange":{
                  "type":"object",
                  "properties":{
                    "VariableValue":{
                      "type":"object",
                      "properties":{
                        "ref":{
                        "type":"array",
                        "items":{
                          "type":"string"
                        }
                      }
                    }
                    }
                  }
                 }
              }
             },
             "InputSource":{
               "type":"object",
               "properties":{
                 "VarName":{
                   "type":"string"
                 },
                 "Reference":{
                  "type":"string"
                }
               }
             }
        }
      }},
    "required": [ "SerialNumber" ]
  };
/*
functions.CalculateRackPower.functionType
functions.CalculateRackPower.CalculateRackPower.endpoint
functions.CalculateRackPower.inputs.parameters
*/
  let layout:any=[

    { "type": "section",
    "title": "Notes",
    "display": "flex",
     "flex-direction": "row",
    "items": [
      { "key": "functions.CalculateRackPower",
        "notitle": false, "placeholder": "rack Function"
      }
    ]
  },

    { "type": "div",
      "display": "flex",
       "flex-direction": "row",
      "items": [
        { "key": "functions.CalculateRackPower.functionType", "flex": "1 1 50px",
          "notitle": true, "placeholder": "Function Type"
        },
        { "key": "functions.CalculateRackPower.CalculateRackPower.endpoint", "flex": "2 2 150px",
          "notitle": true, "placeholder": "Function End Point"
        }
      ]
    },

    { "type": "div",
    "display": "flex",
     "flex-direction": "row",
    "items": [
      { "key": "functions.CalculateRackPower.inputs.parameters",
        "notitle": true, "placeholder": "Input Parameter"
      }
    ]
  },

  { "key": "functions.CalculateRackPower.inputs.InputVariables.ref",
      "type": "array",
      "listItems": 1,
      "items": [ {
        "type": "div",
        "displayFlex": true,
        "flex-direction": "row",
        "items": [
          { "key": "functions.CalculateRackPower.inputs.InputVariables.ref.items[]", "flex": "1 1 50px",
            "notitle": true, "placeholder": "InputVariables"
          }
        ]
      } ]
    }
  ]
  if(data===""){
  this.compoundObject = {
    schema: schema  ,  // REQUIRED
  //  layout:layout,
  framework:"material-design",
          loadExternalAssets:"true"
  }
}
else
{
  this.compoundObject = {
    schema: schema  ,  // REQUIRED
  
  framework:"material-design",
          loadExternalAssets:"true",
          //layout:layout,
          "data":data.properties

  }
}
  
}

}
