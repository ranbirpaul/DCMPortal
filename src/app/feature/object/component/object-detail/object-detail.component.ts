import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ObjectService} from '../../service/object.service';

@Component({
  selector: 'app-object-detail',
  templateUrl: './object-detail.component.html',
  styleUrls: ['./object-detail.component.scss']
})
export class ObjectDetailComponent implements OnInit {
  objectDetail:any;
  constructor(
    private objectService:ObjectService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.objectService.getObjectById('abb.ability.device',this.data.objectId).subscribe(x=>{
      this.objectDetail=x;
      console.log(x);
    });
    console.log(this.data);
    
  }

  ngOnInit() {
  }

}
