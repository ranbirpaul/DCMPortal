import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserDatacenterState } from '../state/user.access.datacenter.state';
import { UserAccessDatacenter } from '../../../shared/model/user/user.access.datacenter';
import { Observable } from 'rxjs';
import * as UserDatacenterActions from '../action/user.access.datacenter.actions';

@Injectable({
  providedIn: 'root'
})
export class UserDatacenterService {

  constructor(private store: Store<UserDatacenterState>) 
  { 
    
  }

getUserAccess(): Observable<UserAccessDatacenter[]> {
  this.fetchUserDatacenter();
  this.store.select('userDatacenterState').subscribe(x=>{
  console.log('User Datacenter Access State >>');
  console.log(x);

  });

    return this.store.select('userDatacenterState');
}

fetchUserDatacenter(){
  return this.store.dispatch(new UserDatacenterActions.FetchUserDatacenter());
}

  
  addUserAccess(userAccess:UserAccessDatacenter)
  {
    
  }
  
  
  deleteUserAccess(userAccess:UserAccessDatacenter)
  {
    
  }
  updateUserAccess(userAccess:UserAccessDatacenter)
  {
    
  }


}





