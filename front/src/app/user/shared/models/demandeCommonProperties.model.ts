export class DemandeCommonProperties {
    constructor(
      public villeDepart: string,
      public villeArrivee: string,
      public adresseDepart: string,
      public adresseArrivee: string,
      public horaire: string,
      public trajet:string,
      public informationSpecial:string
      // public firstImageUrl:string,
      // public secondImageUrl:string,
      // public thirdImageUrl:string,
    ) {}
  }