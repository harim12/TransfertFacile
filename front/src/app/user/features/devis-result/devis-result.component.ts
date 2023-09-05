import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DemandeService} from 'src/app/services/demande.service';
import {DemandesService} from '../../shared/services/demandes.service';
import {WebsocketService} from 'src/app/services/websocket.service';
import { PriceSuggestionServiceService } from '../../shared/services/price-suggestion-service.service';

@Component({selector: 'app-devis-result', templateUrl: './devis-result.component.html', styleUrls: ['./devis-result.component.scss']})
export class DevisResultComponent {
    demandeId !: number;
    priceSuggestions : any[] = [];
    
    @ViewChild('paymentRef',{static:true}) paymentRef!:ElementRef;

    constructor(
                private route : ActivatedRoute,
                private http : HttpClient,  
                private demandeService : DemandesService, 
                private webSocketService : WebsocketService,
                private suggestionService: PriceSuggestionServiceService,
                private router:Router) {}

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
       
    }

    fetchPriceSuggestions(demandeId : number) {
        this.demandeService.getPriceSuggestionsByDemandeId(demandeId).subscribe(priceSuggestions => {
            this.priceSuggestions = priceSuggestions;
            console.log("this is the price suggestion", priceSuggestions);
        });
    }
    bookNow(suggestion: any) {
      this.suggestionService.setSelectedSuggestion(suggestion);
      this.router.navigate(['/hondaDetail'])
    }
    getFileNameFromPath(absolutePath: string): string {
        const parts = absolutePath.split("\\");
        return parts[parts.length - 1];
      }
      
}
