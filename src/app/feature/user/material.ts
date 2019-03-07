import { NgModule } from '@angular/core';
import {MatTreeModule} from '@angular/material/tree';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
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
    MatTable
  } from '@angular/material'; 


@NgModule({
imports:[    
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
    MatProgressBarModule
]
})
export class MaterialModule{

}