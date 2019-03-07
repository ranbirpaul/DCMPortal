import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../authentication.service';
@Component({
  selector: 'app-edge-object-management',
  templateUrl: './edge-object-management.component.html',
  styleUrls: ['./edge-object-management.component.scss']
})
export class EdgeObjectManagementComponent implements OnInit {
  isAuthor:boolean=true;
  constructor(  private authService:AuthenticationService) {
    this.isAuthor=this.authService.isAuthor;
   }

  ngOnInit() {
  }

}
