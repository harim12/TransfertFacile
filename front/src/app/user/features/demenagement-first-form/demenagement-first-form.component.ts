import { Component, HostListener } from '@angular/core';
import { SelectedOptionService } from '../../shared/services/selected-option.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-demenagement-first-form',
  templateUrl: './demenagement-first-form.component.html',
  styleUrls: ['./demenagement-first-form.component.scss']
})
export class DemenagementFirstFormComponent {
  dropdownOptions = [
    { label: 'Meubles et Électroménagers', value: 'meubles_et_electromenagers', iconClass: 'fas fa-couch' },
    { label: 'Voitures et autres véhicules', value: 'voitures_et_autres_vehicules', iconClass: 'fas fa-car' },
    { label: 'Motos', value: 'motos', iconClass: 'fas fa-motorcycle' },
    { label: 'Colis et objets emballés', value: 'colis_et_objets_emballes', iconClass: 'fas fa-gift' }
  ];

  initialForm!: FormGroup;
  
  constructor(
              public selectedOptionService: SelectedOptionService,
              private formBuilder: FormBuilder,
              private router :Router){}

  selectedOption: any;
  isOpen = false;

  ngOnInit(){
    this.initialForm = this.formBuilder.group({
      type: ['meubles_et_electromenagers', Validators.required],
      villeDepart: ['', Validators.required],
      villeArrivee: ['', Validators.required],
      adresseDepart: ['', Validators.required],
      adresseArrivee: ['', Validators.required]
    });
    console.log("inside onInit")
    const storedFormData = localStorage.getItem('formData');
   
    }

  get type() { return this.initialForm.get('type'); }
  get villeDepart() { return this.initialForm.get('villeDepart'); }
  get villeArrivee() { return this.initialForm.get('villeArrivee'); }
  get adresseDepart() { return this.initialForm.get('adresseDepart'); }
  get adresseArrivee() { return this.initialForm.get('adresseArrivee'); }

  onSubmit() {
    if (this.initialForm.valid) {
      console.log(this.initialForm.value);
      // Redirect to the next page using Angular Router
      // this.router.navigate(['/demeFormSecond']);
    }
  }
  

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  onOptionSelected(option: any): void {
    this.selectedOption = option;
    this.selectedOptionService.selectedOption = option.value;
    if (this.initialForm) {
      const mappedValue = this.mapDropdownValue(option.value);
      this.initialForm.get('type')?.setValue(mappedValue);
    }
    console.log(this.initialForm.value.type)
    this.closeDropdown();
    localStorage.setItem('selectedOption', option.value);
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  navigateToNextComponent() {
    if (this.initialForm.valid) {
      const formData = this.initialForm.value;
    
      this.router.navigate(['/demeFormSecond'], { state: { formData } });
    }
  }
  

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const customSelectElement = document.querySelector('.custom-select') as HTMLElement;

    if (!customSelectElement.contains(targetElement)) {
      this.isOpen = false; // Close the dropdown if clicked outside
    }
  }

  private mapDropdownValue(value: string): string {
    switch (value) {
      case 'meubles_et_electromenagers':
        return 'house';
      case 'voitures_et_autres_vehicules':
        return 'car';
      case 'motos':
        return 'moto';
      case 'colis_et_objets_emballes':
        return 'colis';
      default:
        return '';
    }
  }
}
