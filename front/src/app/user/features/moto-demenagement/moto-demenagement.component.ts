import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  @Output() selectedOptionsEvent = new EventEmitter<any>();

  
             
  selectedOption1: any;
  selectedOption2:any;
  isOpenSelect1 = false;
  isOpenSelect2 = false;
  eventEmit1=false;
  eventEmit2 = false;
  motoTypeForm!:FormGroup;
  
  constructor(private formBuilder:FormBuilder){}

  ngOnInit(){
    this.motoTypeForm =  this.formBuilder.group({
      motoType: ['', Validators.required],
    });
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
      this.closeDropdown('select1');
      this.eventEmit1 = true;
    }
    else{
      this.selectedOption2 = option;
      this.closeDropdown('select2');
      this.eventEmit2 = true;
    }
    
    if(this.eventEmit1 && this.eventEmit2){
      const selectedOptionsObject = {
        motoType:this.motoTypeForm.value.voitureType,
        motoPrice: this.selectedOption1.label,
        motoEtat: this.selectedOption2.label
      };
      console.log("helloo from condition ")
      this.emitSelectedOptions(selectedOptionsObject)
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
  emitSelectedOptions(selectedOptions: any) {
    this.selectedOptionsEvent.emit(selectedOptions);
  }
}
