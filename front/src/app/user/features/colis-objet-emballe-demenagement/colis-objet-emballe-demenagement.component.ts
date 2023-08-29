import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

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
  @Input() id: string = "colis-1";
  @ViewChild('customSelect1') customSelect1!: ElementRef;
  @ViewChild('customSelect2') customSelect2!: ElementRef;
             
  selectedOption1: any;
  selectedOption2:any;
  isOpenSelect1 = false;
  isOpenSelect2 = false;

  ngOnInit(){
  }
  

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
      console.log("he selected this option",option)
      this.closeDropdown('select1');
    }
    else{
      console.log("he selected this option cm mm",option)
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

  // @HostListener('document:click', ['$event'])
  // onDocumentClick(event: MouseEvent): void {
  //   console.log("this is the id in the child again====>",this.id)
  //   const targetElement = event.target as HTMLElement;
  //   const customSelectElement1 = document.querySelector('.custom-select1') as HTMLElement;
  //   console.log("customSelectElement1",customSelectElement1)
  //   const customSelectElement2 = document.querySelector('.custom-select2') as HTMLElement;

  //   if (!customSelectElement1.contains(targetElement)) {
  //     this.isOpenSelect1 = false; // Close the dropdown if clicked outside
  //   }
  //   if (!customSelectElement2.contains(targetElement)) {
  //     this.isOpenSelect2 = false; // Close the dropdown if clicked outside
  //   }
  // }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    if (!this.customSelect1.nativeElement.contains(targetElement)) {
      this.isOpenSelect1 = false;
    }

    if (!this.customSelect2.nativeElement.contains(targetElement)) {
      this.isOpenSelect2 = false;
    }
  }


}
