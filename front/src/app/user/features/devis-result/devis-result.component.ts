import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DemandeService} from 'src/app/services/demande.service';
import {DemandesService} from '../../shared/services/demandes.service';
import {WebsocketService} from 'src/app/services/websocket.service';

@Component({selector: 'app-devis-result', templateUrl: './devis-result.component.html', styleUrls: ['./devis-result.component.scss']})
export class DevisResultComponent {
    demandeId !: number;
    priceSuggestions : any[] = [];
    
    @ViewChild('paymentRef',{static:true}) paymentRef!:ElementRef;

    constructor(
                private route : ActivatedRoute,
                private http : HttpClient,  
                private demandeService : DemandesService, 
                private webSocketService : WebsocketService) {}

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.demandeId = params['demandeId'];
            console.log(this.demandeId);

            this.fetchPriceSuggestions(this.demandeId);
        });

        const demandeSubscription = this.webSocketService.subscribe('/topic/add-price-suggestion', () => {
            console.log("subscribing")
            console.log("this is from subscirption:===>",this.fetchPriceSuggestions(this.demandeId))
            
        });
        window.addEventListener('load', () => {
          this.initializePayPal();
          window.paypal.Buttons().render(this.paymentRef.nativeElement)
        });
    }

    fetchPriceSuggestions(demandeId : number) {
        this.demandeService.getPriceSuggestionsByDemandeId(demandeId).subscribe(priceSuggestions => {
            this.priceSuggestions = priceSuggestions;
            console.log("this is the price suggestion", priceSuggestions);
        });
    }

    initializePayPal(): void {
      if (typeof paypal !== 'undefined') {
        // You can now use the PayPal object
        console.log(paypal);
      }
    }

}
