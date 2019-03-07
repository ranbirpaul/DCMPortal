import {UserAccessDatacenter} from '../../../shared/model/user/user.access.datacenter';
import {BaseState} from './base.state';
export interface UserDatacenterState extends BaseState{
    userAccessList:UserAccessDatacenter[],
    editUserDatacenterId:string
}