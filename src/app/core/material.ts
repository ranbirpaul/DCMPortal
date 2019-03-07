import {MatButtonModule,MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import  {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
imports:[MatSlideToggleModule,MatListModule,MatButtonModule,MatCheckboxModule,MatToolbarModule,MatIconModule,MatMenuModule,MatSidenavModule],
exports:[MatSlideToggleModule,MatListModule,MatButtonModule,MatCheckboxModule,MatToolbarModule,MatIconModule,MatMenuModule,MatSidenavModule]
})
export class MaterialModule{

}