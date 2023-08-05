import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedOptionService {
  selectedOption: string = 'colis_et_objets_emballes'; // Par défaut, l'option est "home"
  constructor() { }
}
