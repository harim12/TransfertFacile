import { Component, Input } from '@angular/core';
import { ProjetDemenagement } from '../../shared/models/projet.model';

@Component({
  selector: 'app-single-projet',
  templateUrl: './single-projet.component.html',
  styleUrls: ['./single-projet.component.scss']
})
export class SingleProjetComponent {
  @Input() projet: ProjetDemenagement | undefined;
  carouselItems = [
   { icon: 'fa-solid fa-couch', title: 'Fautffffeuil' },
 
   { icon: 'fa-solid fa-bed', title: 'lit place' },
   { icon: 'fa-solid fa-bed', title: 'lit place' },
   { icon: 'fa-solid fa-bed', title: 'lit place' },
   { icon: 'fa-solid fa-bed', title: 'lit pdfslace' },
   
 ];

}
