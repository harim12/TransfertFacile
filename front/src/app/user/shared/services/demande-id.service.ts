import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemandeIDService {

  private demandeId!: any;

  setDemandeId(demandeId: any): void {
    console.log(demandeId)
    this.demandeId = demandeId;
  }

  getDemandeId(): any {
    return this.demandeId;
  }

}
