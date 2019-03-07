  import { Component, OnInit, Inject } from '@angular/core';
  import { Observable,of } from 'rxjs';
  import {MatTableDataSource} from '@angular/material';
  import {MatDialog,MAT_DIALOG_DATA} from '@angular/material';
  import {DialogConfirmDelete,DialogData} from '../../../../shared/component/dialog/dialog-confirm-delete';
  import { AuthenticationService } from '../../../../authentication.service';
 
@Component({
  selector: 'app-edge-configuration-list',
  templateUrl: './edge-configuration-list.component.html',
  styleUrls: ['./edge-configuration-list.component.scss']
})
    export class EdgeConfigurationListComponent implements OnInit {
    
      isAuthor:boolean=true;
      displayedColumns: string[] = [ 'DCA Type', 'Ability Model', 'Ability Type','edit','delete'];
      //dataSource = new MatTableDataSource(this.tenantsArray);
      
      applyFilter(filterValue: string) {
          //this.dataSource.filter = filterValue.trim().toLowerCase();
        }
      constructor(
        private authenticationService:AuthenticationService,
        public dialog: MatDialog
      ) {
        this.isAuthor=this.authenticationService.isAuthor;
        
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
    
    
    
    
    
  