import { Injectable } from '@angular/core';
import { Region } from '../model/common/region';
import { Country } from '../model/common/country';
import { State } from '../model/common/state';
import { City } from '../model/common/city';
import { Observable, of } from 'rxjs';
import { ApiService } from '../dataservice/api.service';
import {RoleCategory} from '../model/role/RoleCategory';
import {MapperCategory} from '../model/common/mapper.category';
import {BCM} from '../model/bcm/bcm';
import {Sensor} from '../model/sensor/sensor';
import { Http } from '@angular/http';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  sensorList$:Observable<Sensor[]>;
  sensorList:Sensor[];
  bcmList$:Observable<BCM[]>;
  mapperCategoryList$:Observable<MapperCategory[]>;
  regionList$: Observable<Region[]>;
  countryList$: Observable<Country[]>;
  stateList$: Observable<State[]>;
  cityList$: Observable<City[]>;
  regionList:Region[];
  countryList:Country[];
  stateList:State[];
  cityList:City[];
  error : Observable<any>;
  bcmList:BCM[];
  private config: any;
  constructor(
    private apiService: ApiService,
    private location: Location, 
    private http: Http
  ) {
   

    let region1: Region = { regionId: '1', regionName: 'Asia Pacific' }
    let region2: Region = { regionId: '2', regionName: 'Europe' }
    let regionList: Region[] = [region1, region2];
    //this.observableRegionList=of(regionList);

    let country1: Country = { countryId: '1', regionId: '1', countryName: 'India' }
    let country2: Country = { countryId: '2', regionId: '1', countryName: 'China' }
    let country3: Country = { countryId: '3', regionId: '1', countryName: 'Singapore' }
    let country4: Country = { countryId: '4', regionId: '2', countryName: 'England' }
    let countryList = [country1, country2, country3, country4];
    //this.observableCountryList=of(countryList);

    let state1: State = { countryId: '1', stateId: '1', stateName: 'Karnataka' }
    let state2: State = { countryId: '1', stateId: '2', stateName: 'Delhi' }
    let state3: State = { countryId: '1', stateId: '3', stateName: 'Uttar Pradesh' }
    let state4: State = { countryId: '1', stateId: '4', stateName: 'Rajasthan' }
    let state5: State = { countryId: '2', stateId: '5', stateName: 'Anhui Province' }
    let state6: State = { countryId: '2', stateId: '6', stateName: 'Beijing Municipality' }
    let state7: State = { countryId: '2', stateId: '7', stateName: 'Chongqing Municipality' }
    let state8: State = { countryId: '3', stateId: '8', stateName: 'Singapore' }
    let stateList = [state1, state2, state3, state4, state5, state6, state7, state8];
    //this.observableStateList=of(stateList);

    let city1: City = { stateId: '1', cityId: '1', cityName: 'Bengaluru' }
    let city2: City = { stateId: '2', cityId: '2', cityName: 'Delhi' }
    let city3: City = { stateId: '6', cityId: '3', cityName: 'Beijing' }
    let city4: City = { stateId: '7', cityId: '4', cityName: 'Chongqing' }
    let city5: City = { cityId: '5', cityName: 'Singapore', stateId: '8' }
    let cityList = [city1, city2, city3, city4, city5];
    //this.observableCityList=of(cityList);
    /*
    this.regionList$ = this.apiService.getData("Region/GetAllRegions");
    this.countryList$ = this.apiService.getData("Country/GetAllCountries");
    this.stateList$ = this.apiService.getData("State/GetAllStates");
    this.cityList$ = this.apiService.getData("City/GetAllCities");
    this.bcmList$ = this.apiService.getData("SyncFrom800xA/ImportAllBCMs");
    this.sensorList$=this.apiService.getData("SyncFrom800xA/ImportAllSensors");
    
    this.sensorList$.subscribe(x=>this.sensorList=x);
    this.regionList$.subscribe(x=>this.regionList=x);
    this.countryList$.subscribe(x=>this.countryList=x);
    this.stateList$.subscribe(x=>this.stateList=x);
    this.cityList$.subscribe(x=>this.cityList=x);
    */

  }
  getBcmList():Observable<BCM[]>{
    this.bcmList$.subscribe(x=>this.bcmList=x);
    return this.bcmList$;
  }

  getSensorList():Observable<Sensor[]>{
    return this.sensorList$;
  }
  getSensorNameById(id:string):string{
    return this.sensorList.find(x=>x.sensorId==id).sensorName;
  }
  getBcmNameById(id:string):string{
    return this.bcmList.find(x=>x.bcmId==id).bcmName;
  }
  getRegionById(id:string):string{
    return this.regionList.find(x=>x.regionId==id).regionName;
  }

  getCountryById(id:string):string{
    return this.countryList.find(x=>x.countryId==id).countryName;
  }
  getStateById(id:string):string{
    return this.stateList.find(x=>x.stateId==id).stateName;
  }

  getCityById(id:string):string{
    return this.cityList.find(x=>x.cityId==id).cityName;
  }   
  getCity(): Observable<City[]> {
    return this.cityList$;
  }
  getRegion(): Observable<Region[]> {
    return this.regionList$;
  }  
  getCountry(): Observable<Country[]> {
    return this.countryList$;
  }
  getState(): Observable<State[]> {
    return this.stateList$;
  }
  getRoleCategories():Observable<RoleCategory[]>{
    return this.apiService.getData("RoleCategory/GetAllRoleCategorys");
  }
  getError():Observable<any>{
    return this.error;
  }
  getMapperCategory():Observable<MapperCategory[]>{
    return this.mapperCategoryList$= this.apiService.getData("BCM/GetAllMasterTypes")
  }

  async apiUrl(): Promise<string> {
    let conf = await this.getConfig();
    return Promise.resolve(conf.apiUrl);
}

 async getConfig(): Promise<any> {
   // if (!this.config) {
        this.config = (await this.http.get(this.location.prepareExternalUrl('/assets/config.json')).toPromise()).json();
    //}
    return Promise.resolve(this.config);
}

async getEdgeConfig(): Promise<any> {
  // if (!this.config) {
       this.config = (await this.http.get(this.location.prepareExternalUrl('/assets/edge.json')).toPromise()).json();
   //}
   return Promise.resolve(this.config);
}

async getStructures(): Promise<any> {
  if (!this.config) {
      this.config = (await this.http.get(this.location.prepareExternalUrl('/assets/structure.json')).toPromise()).json();
  }
  return Promise.resolve(this.config);
}

}
