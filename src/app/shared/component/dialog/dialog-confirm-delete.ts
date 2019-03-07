import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'dialog-confirm-delete',
    templateUrl: 'dialog-confirm-delete.html',
    styleUrls: ['./dialog-confirm-delete.scss']
  })
  export class DialogConfirmDelete {
    constructor(
      public dialogRef: MatDialogRef<DialogConfirmDelete>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    }
    onNoClick(): void {
      this.dialogRef.close();
    }
  }

  export interface DialogData {
    title: string;
  }  