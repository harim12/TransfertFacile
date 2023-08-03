import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DemandeDemenagement } from '../../shared/models/demande.model';

@Component({
  selector: 'app-single-demande',
  templateUrl: './single-demande.component.html',
  styleUrls: ['./single-demande.component.scss']
})
export class SingleDemandeComponent {
  @Input() demande: DemandeDemenagement | undefined;
  @ViewChild('singleElement') singleElement: ElementRef | undefined;
  carouselItems = [
    { icon: 'fa-solid fa-couch', title: 'Fautffffeuil' },
  
    { icon: 'fa-solid fa-bed', title: 'lit place' },
    { icon: 'fa-solid fa-bed', title: 'lit place' },
    { icon: 'fa-solid fa-bed', title: 'lit place' },
    { icon: 'fa-solid fa-bed', title: 'lit pdfslace' },
    
  ];
  scrollIntoView() {
    this.singleElement?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  ngAfterViewInit() {
    // Scroll to the singleContainer element
    this.singleElement?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
