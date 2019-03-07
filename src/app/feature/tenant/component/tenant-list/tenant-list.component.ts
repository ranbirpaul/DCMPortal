import { Component, OnInit, Inject } from '@angular/core';
import { Observable,of } from 'rxjs';
import {Tenant} from '../../../../shared/model/tenant/tenant';
import {TenantService} from '../../service/tenant.service';
import {MatTableDataSource} from '@angular/material';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material';
import {DialogConfirmDelete,DialogData} from '../../../../shared/component/dialog/dialog-confirm-delete';
import { AuthenticationService } from '../../../../authentication.service';

@Component({
  selector: 'app-tenant-list',
  templateUrl: './tenant-list.component.html',
  styleUrls: ['./tenant-list.component.scss']
})


export class TenantListComponent implements OnInit {

  isAuthor:boolean=true;
  tenants:Observable<Tenant[]>;
  tenantsArray:Tenant[];
  displayedColumns: string[] = [ 'group', 'company', 'department','tenantName','edit','delete'];
  dataSource = new MatTableDataSource(this.tenantsArray);
  
  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  constructor(
    private tenantService:TenantService,
    private authenticationService:AuthenticationService,
    public dialog: MatDialog
  ) {
    this.isAuthor=this.authenticationService.isAuthor;
    this.tenantService.fetchTenanats();
    this.tenantService.getTenants().subscribe(x=>{
      this.tenants=of(x.tenantList);
      this.tenantsArray=x.tenantList;
      this.dataSource = new MatTableDataSource(this.tenantsArray);
      console.log('datasource:'+this.dataSource);
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
handleDelete(arg:Tenant){
   this.tenantService.removeTenant(arg);
}
handleEdit(arg:Tenant){
  if(!this.isAuthor){
    alert("You are not authorised to perform this operation");
    return
   }
  this.tenantService.updateInitiate(arg.tenantId);
}
  ngOnInit() {
  }



}




