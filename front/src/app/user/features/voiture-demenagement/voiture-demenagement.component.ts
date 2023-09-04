import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  eventEmit1=false;
  eventEmit2 = false;
  
  voitureTypeForm!:FormGroup;
  
  @Output() selectedOptionsEvent = new EventEmitter<any>();
  
  constructor(private formBuilder:FormBuilder){}
  
  ngOnInit(){
    this.voitureTypeForm =  this.formBuilder.group({
      voitureType: [' ', Validators.required],
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
      this.isOpenSelect1 = true
      this.closeDropdown('select1');
      this.eventEmit1 = true
    }
    else{
      this.selectedOption2 = option;
      this.isOpenSelect2 = true
      this.closeDropdown('select2');
      this.eventEmit2 = true
      console.log(this.selectedOption2)
     
    }
    
    if(this.eventEmit1 && this.eventEmit2){
      const selectedOptionsObject = {
        voitureType:this.voitureTypeForm.value.voitureType,
        voiturePrice: this.selectedOption1.label,
        voitureEtat: this.selectedOption2.label
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
    console.log("event is happening now")
    this.selectedOptionsEvent.emit(selectedOptions);
  }
}
