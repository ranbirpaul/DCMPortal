import { Injectable } from '@angular/core';
import { AppState } from '../state/app.state';
import * as ErrorActions from '../action/error.actions';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {Error} from '../model/common/error';
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  error : Observable<any>=of('');
  constructor(private store: Store<AppState>) { }

  getError():Observable<Error>{
      return this.store.select('error');
  }
  addError(error:Error){
    this.store.dispatch(new ErrorActions.AddError(error) );
  }
}
