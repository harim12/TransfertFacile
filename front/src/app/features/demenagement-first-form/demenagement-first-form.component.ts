import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-demenagement-first-form',
  templateUrl: './demenagement-first-form.component.html',
  styleUrls: ['./demenagement-first-form.component.scss']
})
export class DemenagementFirstFormComponent {
  dropdownOptions = [
    { label: 'Meubles et Électroménagers', value: 'meubles_et_electromenagers', iconClass: 'fas fa-couch' },
    { label: 'Déménagement', value: 'demenagement', iconClass: 'fas fa-box-open' },
    { label: 'Voitures et autres véhicules', value: 'voitures_et_autres_vehicules', iconClass: 'fas fa-car' },
    { label: 'Motos', value: 'motos', iconClass: 'fas fa-motorcycle' },
    { label: 'Colis et objets emballés', value: 'colis_et_objets_emballes', iconClass: 'fas fa-gift' }
  ];
  

  selectedOption: any;
  isOpen = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  onOptionSelected(option: any): void {
    this.selectedOption = option;
    this.closeDropdown();
  }

  closeDropdown(): void {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    const customSelectElement = document.querySelector('.custom-select') as HTMLElement;

    if (!customSelectElement.contains(targetElement)) {
      this.isOpen = false; // Close the dropdown if clicked outside
    }
  }
}
