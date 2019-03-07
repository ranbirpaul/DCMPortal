import {UserAccess} from '../../../shared/model/user/user.access';
import {BaseState} from './base.state';
export interface UserAccessState extends BaseState{
    userAccessList:UserAccess[],
    editUserAccessId:string
}