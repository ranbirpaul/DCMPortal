import { Floor} from './Floor'

export interface Room {
    roomName:string;
    roomId:string;
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