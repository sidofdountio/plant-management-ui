import { Species } from "./species";

export interface Plant {
    id?:number | any;
    name:string;
    buyAt:string | Date;
    imageUrl:string;
    wateringDate?:string | Date;
    wateringFrequency?:number|any;
    waterQuantity?:number|any;
    specie:Species;
}
