import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ApiService} from './dataservice/api.service';
import {ErrorService} from './errorservice/error.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {errorreducer} from './reducer/error.reducer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MaterialModule} from '../shared/material';
import {DialogConfirmDelete} from '../shared/component/dialog/dialog-confirm-delete';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonService} from './service/common.service';
import { HttpModule } from '@angular/http';
import { Location } from '@angular/common';

@NgModule({
  declarations: [DialogConfirmDelete],
  entryComponents: [DialogConfirmDelete],
  imports: [
    MatDialogModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    CommonModule,
    HttpModule,
    StoreModule.forFeature(
      'error',errorreducer
    ),
    /*StoreModule.forRoot({
      error:errorreducer
    }),*/
    EffectsModule.forRoot([]),
  ],
 // exports:[ConfirmationDialogComponent,MatDialog, MatDialogRef],
 exports:[],
  providers:[ApiService,CommonService,HttpModule,Location]
})
export class SharedModule { }
