import {Component, Input} from '@angular/core';

@Component({selector: 'app-meuble-details', templateUrl: './meuble-details.component.html', styleUrls: ['./meuble-details.component.scss']})
export class MeubleDetailsComponent {
    @Input()meubleDemande : any | undefined;
    meubleItems !: Record<string, string[]>

    ngOnInit() {
        console.log("this is in meuble demande", this.meubleDemande.specificDemande.items);
    
        const pattern = /([^:]+):\{([^}]*)\}/g;
    
        const categorizedItems: Record<string, string[]> = {};
    
        // Use the regular expression to match and extract category and items
        let match;
        while ((match = pattern.exec(this.meubleDemande.specificDemande.items)) !== null) {
            const category = match[1].trim(); // Trim the category name
            const itemsString = match[2];
    
            // Split the itemsString into individual items and trim them
            const itemsArray = itemsString.split(',').map(item => item.trim());
    
            // Store the items in the categorizedItems object with the original category name
            categorizedItems[category] = itemsArray;
        }
        this.meubleItems = categorizedItems
    }
    
    


}
