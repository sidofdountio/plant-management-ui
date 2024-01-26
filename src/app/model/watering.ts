import { Plant } from "./plant";

export interface Watering {
    id:number | any;
    date:string | Date;
    plant:Plant;
}
