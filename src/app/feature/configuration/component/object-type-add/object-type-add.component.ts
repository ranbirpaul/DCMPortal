import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../../authentication.service';
@Component({
  selector: 'app-object-type-add',
  templateUrl: './object-type-add.component.html',
  styleUrls: ['./object-type-add.component.scss']
})
export class ObjectTypeAddComponent implements OnInit {
    formGroup: FormGroup;
    titleAlert: string = 'This field is required';
    editId:string='';
    editMode:boolean=false;
    isAuthor:boolean=true;
    constructor(
        private formBuilder: FormBuilder,
        private authService:AuthenticationService
    ) { 
      this.isAuthor=this.authService.isAuthor;
  
    }
  
    ngOnInit() {
      this.createForm();
      this.setChangeValidate()
    }
  
    createForm() {
      
      this.formGroup = this.formBuilder.group({
        'dcaType':  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        'abilityType':  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
        'abilityModel':  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(40)]]
        
      });
    }
  
    setChangeValidate() {
  
    }
  }