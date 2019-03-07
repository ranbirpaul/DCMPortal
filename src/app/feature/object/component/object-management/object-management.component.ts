import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../authentication.service';


@Component({
  selector: 'app-object-management',
  templateUrl: './object-management.component.html',
  styleUrls: ['./object-management.component.scss']
})


export class ObjectManagementComponent implements OnInit {
  isAuthor:boolean=true;
   yourCompoundInputObject = {
    schema:   {
      "type": "object",
      "properties": {
        "serial_number": { "type": "string" },
        "Level1 - functions": {
          "type": "object",
          "properties": {
            "Level2 -   calculate_rack_power": {
               "type": "object",
               "properties":{
                 "function_type":{
                   "type":"string"
                 },
                 "Level2 -   calculate_rack_power":{
                   "type":"object",
                   "properties":{
                     "Level3 -      end_point":{
                       "type":"string"
                     }
                   }
                  }
               }
              },
              "Level2 -   triggers": {
                "type": "object",
                "properties":{
                  "Level3 variable_change":{
                    "type":"object",
                    "properties":{
                      "Level4 -      variable_value":{
                        "type":"object",
                        "properties":{
                          "Level5 ref":{
                          "type":"array",
                          "items":{
                            "type":"string"
                          }
                        }
                      }
                      }
                    }
                   }
                }
               }
          }
        }},
      "required": [ "serial_number" ]
    },  // REQUIRED
    
  framework:"material-design",
          loadExternalAssets:"true"
  }

  exampleJsonObject = {
    "type": "object",
    "properties": {
      "serial_number": { "type": "string" },
      "functions": {
        "type": "object",
        "CalculateRackPower": {
          "street_1": { "type": "string" },
          "street_2": { "type": "string" },
          "city": { "type": "string" },
          "state": {
            "type": "string",
            "enum": [ "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE",
                "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN", "IA",
                "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS",
                "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND",
                "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD",
                "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY" ]
          },
          "zip_code": { "type": "string" }
        }
      },
      "birthday": { "type": "string" },
      "notes": { "type": "string" },
      "phone_numbers": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "type": { "type": "string", "enum": [ "cell", "home", "work" ] },
            "number": { "type": "string" }
          },
          "required": [ "type", "number" ]
        }
      }
    },
    "required": [ "serial_number" ]
  }
  constructor(  private authService:AuthenticationService) {
    this.isAuthor=this.authService.isAuthor;
   }

  ngOnInit() {
  }

}
