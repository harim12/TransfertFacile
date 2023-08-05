import { Component } from '@angular/core';
import { SelectedOptionService } from '../../shared/services/selected-option.service';

@Component({
  selector: 'app-demenagement-form-second',
  templateUrl: './demenagement-form-second.component.html',
  styleUrls: ['./demenagement-form-second.component.scss']
})
export class DemenagementFormSecondComponent {
  constructor(public selectedOptionService:SelectedOptionService){}
  ngOnInit(){
    console.log("second form============>",this.selectedOptionService.selectedOption)
  }
}
