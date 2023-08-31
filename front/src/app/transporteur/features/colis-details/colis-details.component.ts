import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-colis-details',
  templateUrl: './colis-details.component.html',
  styleUrls: ['./colis-details.component.scss']
})
export class ColisDetailsComponent {
  @Input() colisDemande: any | undefined;

  ngOnInit(){
    console.log("this is in moto demande",this.colisDemande);
  }
}
