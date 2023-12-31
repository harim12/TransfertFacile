import { Component, Input } from '@angular/core';
import { SelectedItemsHomeService } from '../../shared/services/selected-items-home.service';

@Component({
  selector: 'app-item-row',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.scss']
})
export class ItemRowComponent {
  @Input() itemName: string = '';
  @Input() typeFourniture:string = '';
  isChecked: boolean = false;
  quantity: number = 1;
  constructor(private selectedItemsSerivce:SelectedItemsHomeService){}

  ngOnInit(){
  }

  toggleQuantityControls(typeFourniture:string) {
    if (!this.isChecked) {
      this.quantity = 0;
    }
  
    // Find the item in the array
    const selectedItemIndex = this.selectedItemsSerivce.getSelectedItems()
      .findIndex(item => item.itemName === this.itemName);
  
    if (this.isChecked && selectedItemIndex === -1) {
      // If the item is checked and not in the array, add it
      this.selectedItemsSerivce.addItem({
        itemName: this.itemName,
        isChecked: this.isChecked,
        quantity: this.quantity,
        typeFourniture:typeFourniture
      });
          console.log(this.selectedItemsSerivce.getSelectedItems()    )

    } else if (!this.isChecked && selectedItemIndex !== -1) {
      // If the item is unchecked and in the array, remove it
      this.selectedItemsSerivce.removeItem(this.itemName);
    } else if (selectedItemIndex !== -1) {
      // If the item is in the array, update its quantity
      this.selectedItemsSerivce.getSelectedItems()[selectedItemIndex].quantity = this.quantity;
    }
  }
  
  increaseQuantity() {
    this.quantity++;
    const selectedItemIndex = this.selectedItemsSerivce.getSelectedItems()
      .findIndex(item => item.itemName === this.itemName);
    if (selectedItemIndex !== -1) {
      this.selectedItemsSerivce.getSelectedItems()[selectedItemIndex].quantity = this.quantity;
    }
    console.log(this.selectedItemsSerivce.getSelectedItems()    )
  }
  
  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
      const selectedItemIndex = this.selectedItemsSerivce.getSelectedItems()
        .findIndex(item => item.itemName === this.itemName);
      if (selectedItemIndex !== -1) {
        this.selectedItemsSerivce.getSelectedItems()[selectedItemIndex].quantity = this.quantity;
      }
    }
    if(this.quantity==0){
      this.isChecked = false
    }
    console.log(this.selectedItemsSerivce.getSelectedItems())
  }
  
}
