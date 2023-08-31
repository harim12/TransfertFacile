import { Component, Input } from '@angular/core';

interface colisListObject {
  colisType: "",
  colisLargeur: "",
  colisProfondeur: "",
  colisHauteur: "",
  colisUnite: "",
  colisPoids: ""
}


@Component({
  selector: 'app-colis-details',
  templateUrl: './colis-details.component.html',
  styleUrls: ['./colis-details.component.scss']
})
 

export class ColisDetailsComponent {
  @Input() colisDemande!: any ;
  demandeSpecific !:any
  colisList:colisListObject[] = [];
  colisHauteur :any=[];
  ngOnInit(){

    this.demandeSpecific = this.colisDemande.demandeSpecific;
    for (let [key, value] of Object.entries(this.colisDemande.specificDemande)) {
      if (typeof value === 'string') {
        this.colisHauteur = (value as string).split(',');
      }
    }


    const colisTypeArray = this.colisDemande.specificDemande.colisType.split(',')
    const colisHauteur = this.colisDemande.specificDemande.colisHauteur.split(',')
    const colisLargeur = this.colisDemande.specificDemande.colisLargeur.split(',')
    const colisProfondeur = this.colisDemande.specificDemande.colisProfondeur.split(',')
    const colisUnite = this.colisDemande.specificDemande.colisUnite.split(',')
    const colisPoids = this.colisDemande.specificDemande.colisPoids.split(',')

    for (let i = 0; i < colisTypeArray.length-1; i++) {
      const newObj = {
        colisType: colisTypeArray[i],
        colisHauteur: colisHauteur[i],
        colisLargeur: colisLargeur[i],
        colisProfondeur: colisProfondeur[i],
        colisUnite: colisUnite[i],
        colisPoids: colisPoids[i],

      };
      this.colisList.push(newObj);
    } 


    }

  }
 


