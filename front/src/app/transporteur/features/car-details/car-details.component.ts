import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent {
  @Input() carDemande: any | undefined;

  ngOnInit(){
    console.log("this is in car demande",this.carDemande);
  }
}
