import { Injectable } from '@angular/core';
import {ApiService} from '../../../shared/dataservice/api.service';
import { Observable,of,forkJoin } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ObjectService {

  constructor(public apiService:ApiService) { }
  createStructureObject(model:string,type:string,properties:any,name:string,root:boolean){
    let testObject:any={type:type+"@1",model:model, properties:properties,name:name};

    this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects",testObject).subscribe(x=>{
      console.log(x);
      //pass data to the list component via angualr communication service
      alert("Object Structure created successfully!!");
    })
  }
  createObject(model:string,type:string,properties:any,name:string):Observable<any>
  {
    let testObject:any={type:type+"@1",model:model, properties:properties,name:name};
    let post$:Observable<any>=this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects",testObject);
    return post$;      
  }

  createReference(
    model:string,
    type:string,
    objectList:any[],
    objectId:string
  ):Observable<any>
  {
    let posts$:Observable<any>[]=[];

   objectList.forEach(arg=>{
    let reference:any={
      name: "children",
      to: {
        objectId: arg,
        model: model
      }
  }
    
    let post$=this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects/"+objectId+"/models/"+model+"/references/out", [reference]);
    post$.subscribe(x=>{
      console.log("reference object created....");
      console.log(x)
    })
    posts$.push(post$);

      });

      return forkJoin(posts$);     
  }  

  public geReferenceDataByObjectId(id:string,model:string):Observable<any>{
    let url:string="https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects/"+id+"/models/"+model+"/references"
    return this.apiService.getData(url);
   }

  getObjects(model:string,type:string):Observable<any>{
    //abb.ability.device.rack@5
    let postData:any={
      query: "models('"+model+"').ofType('"+type+"')"
    }
    return this.apiService.postData("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/query",postData);
  }
  getObjectById(model:string,objectId:string):Observable<any>{
    let url:string="https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects/"+objectId+"/models/"+model;
    return this.apiService.getData(url)
  }

  deleteObjectByObjectId(objectId:string,abilityModel:string):Observable<any>{
      return this.apiService.deleteDataAbility("https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/objects/"+objectId+"/models/"+abilityModel);     

  }

  executeQuery(model:string,type:string):Observable<any>{
    let url:string="https://abiimsvcasbtc2eundev.azurewebsites.net/api/v1.0/query";
   let jsonBody:any;
   jsonBody={
    query: "models('"+model+"').ofType('"+type+"')"
  }
  
  return   this.apiService.postData(url,jsonBody);
    
  }
}
