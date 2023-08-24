import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceSuggestionServiceService {

  private selectedSuggestion: any = null;
  private priceSuggestedAndPaymentConfirmationId: any = null;

  setSelectedSuggestion(suggestion: any) {
    this.selectedSuggestion = suggestion;
  }

  getSelectedSuggestion() {
    return this.selectedSuggestion;
  }
  

  setPriceSuggestedAndPaymentConfirmationId(data: any) {
    this.priceSuggestedAndPaymentConfirmationId = data;
  }

  getPriceSuggestedAndPaymentConfirmationId() {
    return this.priceSuggestedAndPaymentConfirmationId;
  }
}
