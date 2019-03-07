import {Tenant} from '../../../shared/model/tenant/tenant';
import {BaseState} from './base.state';
export interface AppState extends BaseState{
    tenantList:Tenant[],
    editTenantId
}