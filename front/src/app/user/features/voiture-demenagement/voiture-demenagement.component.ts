import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-voiture-demenagement',
  templateUrl: './voiture-demenagement.component.html',
  styleUrls: ['./voiture-demenagement.component.scss']
})
export class VoitureDemenagementComponent {
  dropdownOptionsPrice = [
    { label: '0-50000 DH', value: '0-50000 DH' },
    { label: '5 0000 DH - 10 000 DH', value: '5 0000 DH - 10 000 DH'},
    { label: '10 000 DH - 15 000 DH', value: '10 000 DH - 15 000 DH' },
    { label: '15 000 DH - 20 000 DH', value: '15 000 DH - 20 000 DH' }
  ];
  dropdownOptionsEtat = [
    { label: 'Voiture neuve', value: 'Voiture neuve' },
    { label: 'Voiture seconde main', value: 'Voiture seconde main'},
    { label: 'oiture seconde main mais hors état de marche', value: 'oiture seconde main mais hors état de marche' },
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
