import { Component, Input,OnInit } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { BaseObjectConfig }     from '../../model/base-object-config';

@Component({
  selector: 'app-dynamic-form-object-config',
  templateUrl: './dynamic-form-object-config.component.html',
  styleUrls: ['./dynamic-form-object-config.component.scss']
})
export class DynamicFormObjectConfigComponent  {
  @Input() config: BaseObjectConfig<any>;
  @Input() form: FormGroup;
  get isValid() { return this.form.controls[this.config.key].valid; }
  showConfig(){
    alert(this.config);
  }
}


