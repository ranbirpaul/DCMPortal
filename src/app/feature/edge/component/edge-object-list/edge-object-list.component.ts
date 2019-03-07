import { Component, OnInit, Inject } from '@angular/core';
import { Observable,of } from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogConfirmDelete,DialogData} from '../../../../shared/component/dialog/dialog-confirm-delete';
import { AuthenticationService } from '../../../../authentication.service';
import {ObjectService} from '../../../object/service/object.service';
import {CommunicationService} from '../../../datacenter/service/communication.service';
import {ObjectDetailComponent} from '../../../object/component/object-detail/object-detail.component';

@Component({
  selector: 'app-edge-object-list',
  templateUrl: './edge-object-list.component.html',
  styleUrls: ['./edge-object-list.component.scss']
})
export class EdgeObjectListComponent implements OnInit {

    objectArray:Object[]=[];
    isAuthor:boolean=true;
    displayedColumns: string[] = [ 'name','type','detail','edit','delete'];
    dataSource = new MatTableDataSource(this.objectArray);
    
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
    constructor(
      private objectService:ObjectService,
      private authenticationService:AuthenticationService,
      public dialog: MatDialog,
      public dialogDetail: MatDialog,
      //public dialogDetailRef: MatDialogRef<ObjectDetailComponent>,
      //private communicationService:CommunicationService
    ) {
  
      /*this.communicationService.currentMessage.subscribe(x=>{
        console.log("got values in list");
        console.log(x);
        if(x!="default message"){
        this.objectService.getObjects("abb.ability.device","abb.ability.device.rack@5").subscribe(x=>{
          this.objectArray=[];
          x.data.forEach(element => {
            this.objectArray.push({objectId:element.objectId,name:element.name,type:element.type});
          });
      
           this.dataSource = new MatTableDataSource(this.objectArray);
          });
        } 
        
      })
  
      this.communicationService.dcaTypeMessage.subscribe(x=>{
       
        if(x!="default message"){
        this.objectService.getObjects("abb.ability.device",x+"@1").subscribe(x=>{
          this.objectArray=[];
          x.data.forEach(element => {
            this.objectArray.push({objectId:element.objectId,name:element.name,type:element.type});
          });
      
           this.dataSource = new MatTableDataSource(this.objectArray);
          });
        } 
        
      })
  
  */
  
  
      this.isAuthor=this.authenticationService.isAuthor;
      this.objectService.getObjects("abb.ability.device","abb.ability.device.rack@5").subscribe(x=>{
      x.data.forEach(element => {
        this.objectArray.push({objectId:element.objectId,name:element.name,type:element.type});
      });
  
       this.dataSource = new MatTableDataSource(this.objectArray);
      });    
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
    this.objectService.deleteObjectByObjectId(arg.objectId,"abb.dca.location").subscribe(x=>{
      console.log("related object got deleted!!");
    });
    this.objectService.deleteObjectByObjectId(arg.objectId,"abb.ability.device").subscribe(x=>{
      this.objectService.getObjects("abb.ability.device","abb.ability.device.rack@5").subscribe(x=>{
        this.objectArray=[];
        x.data.forEach(element => {
          this.objectArray.push({objectId:element.objectId,name:element.name,type:element.type});
        });
    
         this.dataSource = new MatTableDataSource(this.objectArray);
        });
    })
  
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
  
  
  
  
  
  