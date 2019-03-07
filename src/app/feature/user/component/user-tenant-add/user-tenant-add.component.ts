import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TenantService } from '../../../tenant/service/tenant.service';
import { Observable } from 'rxjs';
import { Tenant } from '../../../../shared/model/tenant/tenant';

@Component({
  selector: 'app-user-tenant-add',
  templateUrl: './user-tenant-add.component.html',
  styleUrls: ['./user-tenant-add.component.scss']
})
export class UserTenantAddComponent  implements OnInit {
  formGroup: FormGroup;
  tenantList:Tenant[];
  titleAlert: string = 'This field is required';
  post: any = '';
  roles: Role[] = [
    {value: '8', viewValue: ' Tenant Admin'},
    {value: '9', viewValue: 'Tenant Exec'},
    {value: '10', viewValue: 'Tenant User'}
  ];
  constructor( 
    private formBuilder: FormBuilder,
    private tenantService:TenantService
  ) {
    this.tenantService.getTenants().subscribe(x=>{
      this.tenantList=x.tenantList;
    })
   }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'role': [null, Validators.required]
    });
  }

}

export interface Role {
  value: string;
  viewValue: string;
}