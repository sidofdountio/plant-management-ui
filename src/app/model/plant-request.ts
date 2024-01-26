import { Species } from "./species";

export interface PlantRequest {
    name:string | undefined;
    buyAt:string | Date;
    imageUrl:string;
    specie:Species;
}
