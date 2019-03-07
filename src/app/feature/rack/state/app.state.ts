import {Rack} from '../../../shared/model/rack/rack';
import {BaseState} from './base.state';
export interface AppState extends BaseState{
    rackList:Rack[],
    editRackId:string
}