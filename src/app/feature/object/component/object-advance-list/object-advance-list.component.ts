import { Component, OnInit, Inject } from '@angular/core';
import { Observable,of } from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material';
import {DialogConfirmDelete,DialogData} from '../../../../shared/component/dialog/dialog-confirm-delete';
import { AuthenticationService } from '../../../../authentication.service';
import {ObjectService} from '../../service/object.service';
import {CommunicationService} from '../../../datacenter/service/communication.service';

@Component({
  selector: 'app-object-advance-list',
  templateUrl: './object-advance-list.component.html',
  styleUrls: ['./object-advance-list.component.scss']
})
export class ObjectAdvanceListComponent implements OnInit {

  objectArray:Object[]=[];
  isAuthor:boolean=true;
  displayedColumns: string[] = [ 'name','type','edit','delete'];
  dataSource = new MatTableDataSource(this.objectArray);
  
  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  constructor(
    private objectService:ObjectService,
    private authenticationService:AuthenticationService,
    public dialog: MatDialog,
    private communicationService:CommunicationService
  ) {

    this.communicationService.currentMessage.subscribe(x=>{
      console.log("got values in list");
      console.log(x);
      if(x!="default message"){
      this.objectService.getObjects("abb.ability.device","abb.ability.device.dca.rack@1").subscribe(x=>{
        this.objectArray=[];
        x.data.forEach(element => {
          this.objectArray.push({objectId:element.objectId,name:element.name,type:element.type});
        });
    
         this.dataSource = new MatTableDataSource(this.objectArray);
        });
      } 
      
    })

    this.isAuthor=this.authenticationService.isAuthor;
    //this.tenantService.fetchTenanats();
    this.objectService.getObjects("abb.ability.device","abb.ability.device.dca.rack@1").subscribe(x=>{
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
        title: 'Tenant Removal Confirmation'
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
    this.objectService.getObjects("abb.ability.device","abb.ability.device.dca.rack@1").subscribe(x=>{
      this.objectArray=[];
      x.data.forEach(element => {
        this.objectArray.push({objectId:element.objectId,name:element.name,type:element.type});
      });
  
       this.dataSource = new MatTableDataSource(this.objectArray);
      });
  })

}
handleEdit(arg:any){
  if(!this.isAuthor){
    alert("You are not authorised to perform this operation");
    return
   }
   else{
    console.log("Editing Object");
    console.log(arg);
    this.communicationService.changeEditMessage(arg.objectId);
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








