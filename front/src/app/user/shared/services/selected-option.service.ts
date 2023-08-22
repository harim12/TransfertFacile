import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedOptionService {
  selectedOption: string = 'house'; // Par défaut, l'option est "home"
  constructor() { }
}
