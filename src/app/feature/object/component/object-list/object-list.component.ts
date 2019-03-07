import { Component, OnInit, Inject } from '@angular/core';
import { Observable,of } from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogConfirmDelete,DialogData} from '../../../../shared/component/dialog/dialog-confirm-delete';
import { AuthenticationService } from '../../../../authentication.service';
import {ObjectService} from '../../service/object.service';
import {CommunicationService} from '../../../datacenter/service/communication.service';
import {ObjectDetailComponent} from '../object-detail/object-detail.component';
import {CommonService} from '../../../../shared/service/common.service';

@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.scss']
})


export class ObjectListComponent implements OnInit {
  objectArray:Object[]=[];
  isAuthor:boolean=true;
  displayedColumns: string[] = [ 'name','type','detail','edit','delete'];
  dataSource = new MatTableDataSource(this.objectArray);
  types:any[]=[];
  model:string;
  type:string;
  
  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  constructor(
    private objectService:ObjectService,
    private authenticationService:AuthenticationService,
    public dialog: MatDialog,
    public dialogDetail: MatDialog,
    private commonService:CommonService,
    
    //public dialogDetailRef: MatDialogRef<ObjectDetailComponent>,
    private communicationService:CommunicationService
  ) {

    commonService.getConfig().then(x=>{
      console.log('Configuration File...');
      this.types=x;
      console.log(this.types);
    });
    this.communicationService.currentMessage.subscribe(x=>{
      console.log("got values in list");
      console.log(x);
      if(x!="default message"){

      } 
      
    })

    this.communicationService.dcaTypeMessage.subscribe(x=>{
     console.log(x);
      if(x!="default message"){
        this.model=this.getModel(x);
        this.refreshData();
      this.objectService.getObjects(this.model,x+"@1").subscribe(x=>{
        this.objectArray=[];
        x.data.forEach(element => {
          this.objectArray.push({objectId:element.objectId,name:element.name,type:element.type});
        });
    
         this.dataSource = new MatTableDataSource(this.objectArray);
        });
      } 
      
    })




    this.isAuthor=this.authenticationService.isAuthor;
    this.refreshData();    
   }



   openDialog(row:any) {
     if(!this.isAuthor){
      alert("You are not authorised to perform this operation");
      return
     }
      
    
    console.log(row);
    const dialogRef =this.dialog.open(DialogConfirmDelete, {
      data: {
        title: 'Object Removal Confirmation'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result)
        this.handleDelete(row);
    });
  }
handleDelete(arg:any){
  this.objectService.deleteObjectByObjectId(arg.objectId,this.model).subscribe(x=>{
    console.log("related object got deleted!!");
  });
  this.refreshData();

}

getModel(arg:string){
  console.log(this.types);
  this.type=arg+"@1";
  return this.types.find(x=>x.type==arg).model;

}
refreshData(){
  this.objectArray=[];
  //to be done - remove hard coding type and model
this.objectService.getObjects(this.model,this.type).subscribe(x=>{
  
  x.data.forEach(element => {
    this.objectArray.push({objectId:element.objectId,name:element.name,type:element.type});
  });

   this.dataSource = new MatTableDataSource(this.objectArray);
  });


  /*this.objectService.getObjects("abb.ability.device","abb.ability.device.dca.type.room@1").subscribe(x=>{
  
    x.data.forEach(element => {
      this.objectArray.push({objectId:element.objectId,name:element.name,type:element.type});
    });

     this.dataSource = new MatTableDataSource(this.objectArray);
    });
    */
}


handleDetail(arg:any){
  
  const dialogRef = this.dialogDetail.open(ObjectDetailComponent,
    {
     data: arg
  }
  );

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
  
}
handleEdit(arg:any){
  if(!this.isAuthor){
    alert("You are not authorised to perform this operation");
    return
   }
 
}
  ngOnInit() {
  }



}

export interface Object{
  objectId:string,
  name:string,
  type:string   
}





