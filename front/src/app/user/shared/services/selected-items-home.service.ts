import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectedItemsHomeService {

  selectedItems: any[] = [];

  addItem(item: any) {
    this.selectedItems.push(item);
  }

  removeItem(itemName: string) {
    const index = this.selectedItems.findIndex(item => item.itemName === itemName);
    if (index !== -1) {
      this.selectedItems.splice(index, 1);
    }
  }

  getSelectedItems() {
    return this.selectedItems;
  }
}
