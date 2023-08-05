import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-colis-objet-emballe-demenagement',
  templateUrl: './colis-objet-emballe-demenagement.component.html',
  styleUrls: ['./colis-objet-emballe-demenagement.component.scss']
})
export class ColisObjetEmballeDemenagementComponent {
  dropdownOptionsPrice = [
    { label: 'Colis', value: 'Colis' },
    { label: 'Boîte', value: 'Boîte'},
    { label: 'Appareil', value: 'Appareil' },
    { label: 'Objets emballé', value: 'Objets emballé' },
    { label: 'Autre', value: 'Autre' },

  ];
  dropdownOptionsEtat = [
    { label: 'cm', value: 'cm' },
    { label: 'm', value: 'm'},
  ];

             
  selectedOption1: any;
  selectedOption2:any;
  isOpenSelect1 = false;
  isOpenSelect2 = false;
  

  toggleDropdown(selectOption:string): void {
    if(selectOption=='select1'){
      this.isOpenSelect1 = !this.isOpenSelect1;
    }else{
      this.isOpenSelect2 = !this.isOpenSelect2
    }
  }

  onOptionSelected(option: any,selectOption:string): void {
    if(selectOption=='select1'){
      this.selectedOption1 = option;
      this.closeDropdown('select1');
    }
    else{
      this.selectedOption2 = option;
      this.closeDropdown('select2');
    }
    
  }

  closeDropdown(selectOption:string): void {
    if(selectOption=='select1'){
      this.isOpenSelect1 = !this.isOpenSelect1;
    }else{
      this.isOpenSelect2 = !this.isOpenSelect2
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const customSelectElement1 = document.querySelector('.custom-select1') as HTMLElement;
    const customSelectElement2 = document.querySelector('.custom-select2') as HTMLElement;

    if (!customSelectElement1.contains(targetElement)) {
      this.isOpenSelect1 = false; // Close the dropdown if clicked outside
    }
    if (!customSelectElement2.contains(targetElement)) {
      this.isOpenSelect2 = false; // Close the dropdown if clicked outside
    }
  }
}
