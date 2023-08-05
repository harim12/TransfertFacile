import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-moto-demenagement',
  templateUrl: './moto-demenagement.component.html',
  styleUrls: ['./moto-demenagement.component.scss']
})
export class MotoDemenagementComponent {
  dropdownOptionsPrice = [
    { label: '0-10000 DH', value: '0-10000 DH' },
    { label: '1 0000 DH - 5 000 DH', value: '1 0000 DH - 5 000 DH'},
    { label: '+5 000 DH', value: '+5 000 DH' },
  ];
  dropdownOptionsEtat = [
    { label: 'Moto neuve', value: 'Moto neuve' },
    { label: 'Moto seconde main', value: 'Moto seconde main'},
    { label: 'Moto seconde main mais hors état de marche', value: 'Moto seconde main mais hors état de marche' },
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
