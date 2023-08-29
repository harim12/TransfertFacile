import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ColisSelectedOptionService } from '../../shared/services/colis-selected-option.service';

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
  colisForm!:FormGroup;
  @ViewChild('customSelect1') customSelect1!: ElementRef;
  @ViewChild('customSelect2') customSelect2!: ElementRef;
  @Output() formDataEmitter = new EventEmitter<any>();
  selectedOptionsColis!:any;
             
  selectedOption1: any;
  selectedOption2:any;
  isOpenSelect1 = false;
  isOpenSelect2 = false;

  eventEmit1 = false;
  eventEmit2 = false;
  sendDataAgainFromChild!: boolean;
  constructor(private formBuilder:FormBuilder,
              private colisService:ColisSelectedOptionService){}

  ngOnInit(){
    this.colisForm = this.formBuilder.group({
      'colisLargeur':['',Validators.required],
      'colisHauteur':['',Validators.required],
      'colisProfondeur':['',Validators.required],
      'colisPoids':['',Validators.required],
      
    })
    this.sendDataAgainFromChild = true;
  }
  ngDoCheck() {
     
    if (this.colisForm?.valid && this.eventEmit1  && this.eventEmit2 && this.sendDataAgainFromChild) {
      this.sendDataToParent();
      console.log("sending data from the place I want")
      this.sendDataAgainFromChild = false
    }
  }

  sendDataToParent() {
    // this.formDataEmitter.emit( {form:this.colisForm.value,options:this.selectedOptionsColis});
    // console.log( {form:this.colisForm.value,options:this.selectedOptionsColis})

    this.colisService.addColis({form:this.colisForm.value,options:this.selectedOptionsColis})
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
      this.eventEmit1 = true
    }
    else{
      console.log("he selected this option cm mm",option)
      this.selectedOption2 = option;
      this.closeDropdown('select2');
      this.eventEmit2 = true
    }
    
    if(this.eventEmit1 && this.eventEmit2){
      this.selectedOptionsColis={
        colisType: this.selectedOption1.label,
        colisUnite:this.selectedOption2.label
      }
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

    if (!this.customSelect1.nativeElement.contains(targetElement)) {
      this.isOpenSelect1 = false;
    }

    if (!this.customSelect2.nativeElement.contains(targetElement)) {
      this.isOpenSelect2 = false;
    }
  }


}
