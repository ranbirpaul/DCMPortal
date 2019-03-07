import { NgModule } from '@angular/core';

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
    MatSelectModule,  
    MatOptionModule,
    MatCheckboxModule,  
    MatSlideToggleModule,
    MatDialog, 
    MatDialogRef
  } from '@angular/material'; 


@NgModule({
imports:[    MatButtonModule,  
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
    MatSlideToggleModule
],
exports:[    MatButtonModule,  
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
    MatSlideToggleModule
]
})
export class MaterialModule{

}