export interface DemenagementRequestVoiture {
    villeDepart: string;
    villeArrivee: string;
    adresseDepart: string;
    adresseArrivee: string;
    horaire: string;
    specificDemande: {
      type: string;
      voitureType: string;
      voitureEtat: string;
      voiturePrice: string;
    };
  }