import {Room} from '../../../shared/model/location/room';
import {BaseState} from '../state/base.state';
export interface RoomState extends BaseState{
    roomList:Room[],
    editRoomId
}