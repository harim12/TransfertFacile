import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedOptionService {
  selectedOption: string = 'meubles_et_electromenagers'; // Par défaut, l'option est "home"
  constructor() { }
}
