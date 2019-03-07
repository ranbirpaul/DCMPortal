import { Component, OnInit } from '@angular/core';
import {RackService} from '../../service/rack.service';
import { Observable } from 'rxjs';
import {Rack} from '../../../../shared/model/rack/rack';

@Component({
  selector: 'app-rack-add',
  templateUrl: './rack-add.component.html',
  styleUrls: ['./rack-add.component.scss']
})
export class RackAddComponent implements OnInit {

  constructor(
    private rackService:RackService
  ) { 
    let racks$:Observable<Rack[]>=this.rackService.getRacks();
    racks$.subscribe(x=>{
      console.log('racks list >>');
      console.log(x);
    });
    console.log();
  }

  ngOnInit() {
  }

}
