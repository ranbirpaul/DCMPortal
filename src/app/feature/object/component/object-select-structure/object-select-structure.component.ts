import { Component,Inject, OnInit } from '@angular/core';
import {CommonService} from '../../../../shared/service/common.service';
import {ApiService} from '../../../../shared/dataservice/api.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { forkJoin,Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {ObjectService} from '../../service/object.service';


export interface DialogData {
  parentObjectId: string;
  model:string;
  type:string;
  objects:any[];
}

@Component({
  selector: 'app-object-select-structure',
  templateUrl: './object-select-structure.component.html',
  styleUrls: ['./object-select-structure.component.scss']
})
export class ObjectSelectStructureComponent implements OnInit {
  types:any[]=[];
  edgeTypes:any[]=[];
  form: FormGroup;
  edgeForm: FormGroup;
  objects:any[]=[];
  objectList:any[]=[];
  constructor( 
    private objectService:ObjectService,
    private commonService:CommonService,
    private apiService:ApiService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ObjectSelectStructureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    console.log('<<< Data >>>');
    console.log(this.data);
    this.form = this.formBuilder.group({
      'objectList':  [null, null]
      
    });
    this.edgeForm = this.formBuilder.group({
      'edgeObjectList':  [null, null]
      
    });

    commonService.getConfig().then(x=>{
      console.log('Configuration File>>>...');
      this.types=x;
      console.log(this.types);
    });
    commonService.getEdgeConfig().then(x=>{
      console.log('Configuration File...');
      this.edgeTypes=x;
      console.log(this.edgeTypes);
    });
   }
   onObjectTypeChange(arg:any){
    

   let object= this.types.find(x=>x.type==arg);
    //Ability Object query API
     this.objectService.executeQuery(object.model,arg+"@1").subscribe(x=>{
      console.log("Response received...");
      console.log(x);
      this.objectArray=[];
      x.data.forEach(element => {
        console.log('Name >>>');
        console.log(element.name);
        
        this.objectArray.push({name:element.name,objectId:element.objectId});
      });
    })
  }
  onEdgeObjectTypeChange(arg:any){
    console.log(arg);
     let object= this.edgeTypes.find(x=>x.type==arg);
     console.log(object);
     this.objectService.executeQuery(object.model,arg+"@1").subscribe(x=>{
      this.objectSensorArray=[];
      x.data.forEach(element => {
        this.objectSensorArray.push({name:element.name,objectId:element.objectId});
      });
    })
  }

   objectArray = [];
   objectSensorArray = [];

  onSelection(e, v){
    console.log(e.option.value);
   console.log(v);
  }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.form.value);
    console.log(this.data);
    let list:any;
   if(this.form.value.objectList)
    list=this.form.value.objectList;
  else if(this.edgeForm.value.edgeObjectList)
    list=this.edgeForm.value.edgeObjectList;
    console.log(list);
    
    this.createChildren(list).subscribe(listObservable=>{
      //create the reference object from the created object
      this.createChildrenReference(list).subscribe(list=>{
        console.log("Reference created...");
        alert('Structure Node Created!!');
        this.dialogRef.close();
      });
      console.log("Objects in structure got cretaed....");
    }); 
    
      
  }

  createChildrenReference(args:any){
    let posts$:Observable<any>[]=[];
    return this.objectService.createReference(this.data.model,this.data.type,args,this.data.parentObjectId);
    
  }
getObjectNameByObjectId(id:string){
console.log(this.objectSensorArray);
  if(this.objectArray.find(x=>x.objectId==id))
    return this.objectArray.find(x=>x.objectId==id).name;
  else
  return this.objectSensorArray.find(x=>x.objectId==id).name;
}
  createChildren(objectList:any):Observable<any[]>{
    let posts$:Observable<any>[]=[];
    
    objectList.forEach(arg=>{
      this.objects=[];
      this.objects.push({objectId:arg,name:this.getObjectNameByObjectId(arg)});
      this.data.objects=this.objects;
    let testObject:any={
      type:this.data.type,
      model:this.data.model,
      objectId:arg, 
      name:this.getObjectNameByObjectId(arg)
    };
    let post$=this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects", testObject);
    post$.subscribe(x=>{
      console.log("Object used in reference is created...");
      console.log(x)
    })
    posts$.push(post$);
    });
    return forkJoin(posts$);
  }

}


