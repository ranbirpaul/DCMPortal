import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Tenant} from '../../../../shared/model/tenant/tenant';
import {TenantService} from '../../../tenant/service/tenant.service';
import { AuthenticationService } from '../../../../authentication.service';

@Component({
  selector: 'app-rack-to-space-list',
  templateUrl: './rack-to-space-list.component.html',
  styleUrls: ['./rack-to-space-list.component.scss']
})
export class RackToSpaceListComponent {

    formGroup: FormGroup;
    titleAlert: string = 'This field is required';
    editId:string='';
    editMode:boolean=false;
    tenantList:Tenant[];
    isAuthor:boolean=true;

    constructor(
      private formBuilder: FormBuilder,
      private tenantService:TenantService,
      private authService:AuthenticationService
    ) {       
      this.isAuthor=this.authService.isAuthor;
      tenantService.getTenants()
      .subscribe(x=>{
        this.tenantList=x.tenantList;
        this.editId=x.editTenantId; 
        if(x.saved)
          alert('Tenant Submitted !!!');
        if(x.editTenantId=='')
          this.editMode=false;
        else{
          this.editMode=true;
        this.populateFielddForUpdate()
        }
  
      }    
    )


    }
    populateFielddForUpdate(){
      let tenant:Tenant=this.tenantList.find(x=>x.tenantId==this.editId);
      this.formGroup.setValue({
        group:tenant.group,
        company:tenant.company,
        department:tenant.department,
        tenant:tenant.tenantName
      })
    }
    ngOnInit() {
      this.createForm();
      this.setChangeValidate()
    }
  
    createForm() {
      
      this.formGroup = this.formBuilder.group({
        'group':  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        'company':  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        'department':  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        'tenant': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
      });
    }
  
    setChangeValidate() {

    }
  
    get group() {
      return this.formGroup.get('group') as FormControl
    }

    getGroupError(){

    }
    getCompanyError(){
      
    }
    getDepartmentError(){
      
    }
    getTenantError(){
      
    }            
  
    onSubmit(post) {
      this.handleTenant();
    }

    handleTenant(){

      let obj:Tenant={group:this.formGroup.value.group, department:this.formGroup.value.department,company:this.formGroup.value.company,tenantId:this.editId,tenantName:this.formGroup.value.tenant };
      if(!this.editMode)
        this.tenantService.addTenant(obj);
      else
        this.tenantService.updateTenant(obj);
    }
  
  }


