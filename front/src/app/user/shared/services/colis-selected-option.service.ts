import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColisSelectedOptionService {

  colisList:any[] = [];

  addColis(colis:any){

     this.colisList.push(colis);
    console.log("colis list in service",this.colisList);

    
    return this.colisList;
  }

  getColisList(){
    let colisListObject = {
      colisType: "",
      colisLargeur: "",
      colisProfondeur: "",
      colisHauteur: "",
      colisUnite: "",
      colisPoids: ""

      
    }
    for (let [key, value] of Object.entries(this.colisList)) {
      console.log(value);
      colisListObject.colisType +=" "+value.options.colisType;
      colisListObject.colisLargeur +=" " +value.form.colisLargeur;
      colisListObject.colisProfondeur +=" " +value.form.colisProfondeur;
      colisListObject.colisHauteur +=" " +value.form.colisHauteur;
      colisListObject.colisPoids +=" " +value.form.colisPoids;
      colisListObject.colisUnite +=" " +value.options.colisUnite;
      
      
    }
   return colisListObject;
  }

  deleteColisList(){
    this.colisList = []
  }
}
