import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserAccessState } from '../state/user.access.state';
import { UserAccess } from '../../../shared/model/user/user.access';
import { Observable } from 'rxjs';
import * as UserActions from '../action/user.access.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    rackArray:UserAccess[]=[];
  constructor(private store: Store<UserAccessState>) 
  { 
    
  }

getUserAccess(): Observable<UserAccess[]> {
  this.fetchUserAccess();
  this.store.select('userAccessState').subscribe(x=>{
  console.log('User Access State >>');
  console.log(x);

  });

    return this.store.select('userAccessSate');
}

fetchUserAccess(){
  return this.store.dispatch(new UserActions.FetchUser());
}

  
  addUserAccess(userAccess:UserAccess)
  {
    
  }
  
  
  deleteUserAccess(userAccess:UserAccess)
  {
    
  }
  updateUserAccess(userAccess:UserAccess)
  {
    
  }


}





