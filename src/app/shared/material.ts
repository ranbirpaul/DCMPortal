import { NgModule } from '@angular/core';
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
    MatTable,    
     } from '@angular/material'; 


@NgModule({
imports:[ 
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
    MatTableModule
],
exports:[   
 
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
    MatTableModule
]
})
export class MaterialModule{

}