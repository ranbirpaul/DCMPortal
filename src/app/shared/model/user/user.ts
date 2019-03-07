import {UserAccess} from './user.access';
import {UserAccessDatacenter} from './user.access.datacenter';

export interface User{
    userAccess:UserAccess;
    userAccessdatacenters:UserAccessDatacenter[];
}