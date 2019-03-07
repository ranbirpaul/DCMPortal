import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatTreeModule} from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {  
    MatButtonModule,  
    MatMenuModule,  
    MatToolbarModule,  
    MatIconModule,  
    MatCardModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatNativeDateModule,  
    MatRadioModule,  
    MatOptionModule,
    MatCheckboxModule,  
    MatSlideToggleModule,
    MatTable,
    
  } from '@angular/material'; 


@NgModule({
imports:[  
    MatDialogModule,  
    MatTableModule,
    MatButtonModule,  
    MatMenuModule,  
    MatToolbarModule,  
    MatIconModule,  
    MatCardModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatNativeDateModule,  
    MatRadioModule,  
    MatSelectModule,  
    MatOptionModule,
    MatCheckboxModule,  
    MatSlideToggleModule,
    MatTreeModule,
    MatTabsModule,
    MatListModule,
    MatProgressBarModule
],
exports:[ 
    MatTableModule,   
    MatButtonModule,  
    MatMenuModule,  
    MatToolbarModule,  
    MatIconModule,  
    MatCardModule,  
    MatFormFieldModule,  
    MatInputModule,  
    MatNativeDateModule,  
    MatRadioModule,  
    MatSelectModule,  
    MatOptionModule,
    MatCheckboxModule,  
    MatSlideToggleModule,
    MatTreeModule,
    MatDialogModule,
    MatTabsModule  ,
    MatListModule ,
    MatProgressBarModule
]
})
export class MaterialModule{

}