import {Effect, Actions,ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {Observable, observable,of} from "rxjs";
import {  catchError, map,concatMapTo, mergeMap, switchMap, toArray } from 'rxjs/operators';
import { Action, Store } from "@ngrx/store";
import * as RoomActions from '../action/location.room.actions';
import { ApiService } from '../../../shared/dataservice/api.service';
import {Room} from '../../../shared/model/location/room';

@Injectable()
export class RoomEffects {
    constructor(private action$: Actions, private apiServices: ApiService) { }
    
    /* BuildingRoom/GetAllBuildingRooms
    @Effect()
    fetchRooms$ = this.action$.pipe(
        ofType(RoomActions.FETCH_ROOM_LOCATION),
        map((action: RoomActions.FetchRoom) => action.type),
        switchMap(() => 
        this.apiServices.getData('BuildingRoom/GetAllBuildingRooms').pipe(
                map((floors: any) => new RoomActions.LoadRoom(floors))
            ))
    ); */ 
    @Effect()
    public fetchListOfRooms$: Observable<Action> = this.action$.pipe(
      ofType(RoomActions.FETCH_ROOM_LOCATION),
      switchMap(() => this.apiServices.getData('BuildingRoom/GetAllBuildingRooms')),
      map((floors: any) => {
        console.log('Rooms received....');
        return new RoomActions.LoadRoom(floors);
      })
    );
    
    
    
    
    
    @Effect()
    addDataCenterRoom$: Observable<Action> = this.action$
      .pipe(ofType<RoomActions.AddRoom>(RoomActions.ADD_ROOM_LOCATION))
      .pipe(
      switchMap(
        (action) => {
          var obj = {
            roomName: action.payload.roomName,
            zone: action.payload.zone,
            floorId: action.payload.floorId
          }
          console.log('before sending...');
          console.log(action.payload.floorId);
          return this.apiServices.postData('BuildingRoom/AddBuildingRoom', obj);
        }
      ),
      mergeMap((datacenterlocations: any) => {
        return [new RoomActions.FetchRoom(), new RoomActions.SuccessRoom('Room Submitted Succesfully')
        ];
      })
      )
  
      @Effect()
      removeRoom$: Observable<Action> = this.action$
        .pipe(ofType<RoomActions.DeleteRoom>(RoomActions.DELETE_ROOM_LOCATION))
        .pipe(
        switchMap(
          (action) => {
    
            return this.apiServices.deleteData('/BuildingRoom/DeleteBuildingRoomById', '?id=' + action.payload)
          }
        ),
        mergeMap((datacenterlocations: any) => {
          return [new RoomActions.FetchRoom(), new RoomActions.SuccessRoom('Room Deleted Successfully')
          ];
        })
        )
        @Effect()
        updateRoom$: Observable<Action> =
          this.action$
            .pipe(ofType<RoomActions.UpdateRoom>(RoomActions.UPDATE_ROOM_LOCATION))
            .pipe(
            switchMap(
              (action) => {
                return this.apiServices.putData('BuildingRoom/UpdateBuildingRoom', action.payload)
              }
            ),
            mergeMap((floor: any) => {
              return [new RoomActions.FetchRoom(), new RoomActions.SuccessRoom('Floor Updated Successfully')
              ];
            })
            )
      
      
              
     
}