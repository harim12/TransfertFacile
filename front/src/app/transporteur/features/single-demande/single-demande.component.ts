import { Component } from '@angular/core';

@Component({
  selector: 'app-single-demande',
  templateUrl: './single-demande.component.html',
  styleUrls: ['./single-demande.component.scss']
})
export class SingleDemandeComponent {
  carouselItems = [
    { icon: 'fa-solid fa-couch', title: 'Fautffffeuil' },
  
    { icon: 'fa-solid fa-bed', title: 'lit place' },
    { icon: 'fa-solid fa-bed', title: 'lit place' },
    { icon: 'fa-solid fa-bed', title: 'lit place' },
    { icon: 'fa-solid fa-bed', title: 'lit pdfslace' },
    
  ];
}
