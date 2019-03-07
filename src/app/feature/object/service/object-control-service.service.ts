import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseObjectConfig } from '../model/base-object-config';

@Injectable({
  providedIn: 'root'
})
export class ObjectControlServiceService {

  constructor() { }
  toFormGroup(configs: BaseObjectConfig<any>[] ) {
    let group: any = {};

    configs.forEach(config => {
      group[config.key] = config.required ? new FormControl(config.value || '', Validators.required)
                                              : new FormControl(config.value || '');
    });

    console.log(">>Config");
    console.log(configs);
    return new FormGroup(group);
  }
}



