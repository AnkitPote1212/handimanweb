import { City } from "./city";
import { ServiceEntity } from "./service-entity";

export class CityServiceDetails {
    constructor(
        public cityPincodeMap : Map<string,number[]>,
        public servicelist : ServiceEntity[]
    ){}
}
