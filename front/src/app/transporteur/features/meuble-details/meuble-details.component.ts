import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-meuble-details',
  templateUrl: './meuble-details.component.html',
  styleUrls: ['./meuble-details.component.scss']
})
export class MeubleDetailsComponent {
  @Input() meubleDemande: any | undefined;

  ngOnInit(){
    console.log("this is in meuble demande",this.meubleDemande);
  }
}
