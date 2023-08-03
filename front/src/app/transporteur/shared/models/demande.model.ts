import { TypeLivraison } from "./typeLivraison.model";

export class DemandeDemenagement{
    constructor(public horaire:string,public depart:string,public arrivee:string,public typeLivraison:TypeLivraison){}
}