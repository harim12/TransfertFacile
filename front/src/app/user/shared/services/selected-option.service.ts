import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedOptionService {
  selectedOption: string = 'voitures_et_autres_vehicules'; // Par défaut, l'option est "home"
  constructor() { }
}
