import {Mapper} from '../../../shared/model/mapper/mapper';
import {BaseState} from './base.state';
export interface MapperState extends BaseState{
    mapperList:Mapper[],
    editMapperId,
    sourceTypeMasterId,
    destinationTypeMasterId
}