import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceSuggestionServiceService } from '../shared/services/price-suggestion-service.service';

@Component({
  selector: 'app-honda-detail',
  templateUrl: './honda-detail.component.html',
  styleUrls: ['./honda-detail.component.scss']
})
export class HondaDetailComponent {
  amount: any;
  selectedSuggestion: any;

  @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private suggestionService: PriceSuggestionServiceService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.selectedSuggestion = this.suggestionService.getSelectedSuggestion();
    console.log('Selected Suggestion:', this.selectedSuggestion);
    this.amount = this.selectedSuggestion.priceSuggestion;
    console.log(this.amount);

    window.paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: this.amount.toString(),
                currency_code: 'USD'
              }
            }
          ]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          const priceSuggestedAndPaimentConfirmationId = {
            priceSuggested: this.selectedSuggestion,
            id: details.id
          };

          // Update the suggestion service to store the object
          this.suggestionService.setPriceSuggestedAndPaymentConfirmationId(priceSuggestedAndPaimentConfirmationId);
          
          // You might want to navigate to the confirmation page here
          // For example:
          this.router.navigate(['/confirmation']);
        });
      },
      onError: (error: any) => {
        alert("transaction declined")
      }
    }).render(this.paymentRef.nativeElement);
  }
  
}
