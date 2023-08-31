import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-moto-details',
  templateUrl: './moto-details.component.html',
  styleUrls: ['./moto-details.component.scss']
})
export class MotoDetailsComponent {
  @Input() motoDemande: any | undefined;

  ngOnInit(){
    console.log("this is in moto demande",this.motoDemande);
  }
}
