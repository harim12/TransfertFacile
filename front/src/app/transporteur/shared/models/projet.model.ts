import { DemandeDemenagement } from "./demande.model";
import { userDemanding } from "./userDemanding.model";

export class ProjetDemenagement{
    constructor(public demande:DemandeDemenagement,public userDemanding:userDemanding){}
}