import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {UserService}  from '../../service/user.service';
import {UserDatacenterService}  from '../../service/user-datacenter.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';
  roles: Role[] = [
    {value: '1', viewValue: 'DC Exec'},
    {value: '2', viewValue: 'DC Sales'},
    {value: '3', viewValue: 'DC Admin'},
    {value: '4', viewValue: 'DC Engineer'},
    {value: '5', viewValue: 'DC Operator'},
    {value: '5', viewValue: 'ABB Service'},      
    {value: '6', viewValue: 'ABB R&D'}, 
    {value: '7', viewValue: 'ABB LBU'}
  ];
  constructor( 
    private formBuilder: FormBuilder,
    private userService:UserService,
    private userDatacenterService:UserDatacenterService
  ) { }

  ngOnInit() {
    this.createForm();
    this.userDatacenterService.getUserAccess();
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