import {DataCenterLocation} from './datacenter-location.model'

export interface Floor {
    floorName:string;
    floorId:string;
    zone:string;
    regionId: string;
	countryId: string;
	stateId: string;
	cityId: string;
	siteName: string;
	buildingName: string;
	buildingId:string;
}