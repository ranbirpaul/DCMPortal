import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { Rack } from '../../../shared/model/Rack/rack';
import { Observable } from 'rxjs';
import * as RackActions from '../action/rack.actions';

@Injectable({
  providedIn: 'root'
})
export class RackService {
    rackArray:Rack[]=[];
  constructor(private store: Store<AppState>) 
  { 
    
  }

getRacks_old():Rack[]{
    
    return [];

}

getRacks(): Observable<Rack[]> {
  this.fetchRacks();
  this.store.select('rackState').subscribe(x=>this.rackArray=x);

    return this.store.select('rackState');
}

fetchRacks(){
  return this.store.dispatch(new RackActions.FetchRack());
}
  getRackNameById(id:string){
    return this.rackArray.find(x=>x.rackId==id).rackName;
  }
  
  addRacks(rack:Rack)
  {
    
  }
  
  
  deleteRacks(rack:Rack)
  {
    
  }
  updateRacks(rack:Rack)
  {
    
  }


}





