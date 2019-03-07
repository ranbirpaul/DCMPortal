import { RoleTenant } from './RoleTenant';
import { DataCenterLocation } from '../location/datacenter-location.model';

export interface Role {
  roleId: string,
  name: string,
  description: string,
  roleCategory: string,
  //datacenters:DataCenterLocation[],
  tenants: RoleTenant[]

}
