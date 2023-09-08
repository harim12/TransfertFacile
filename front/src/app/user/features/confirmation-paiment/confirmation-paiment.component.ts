import { Component } from '@angular/core';
import { PriceSuggestionServiceService } from '../../shared/services/price-suggestion-service.service';
import { UserService } from '../../shared/services/user.service';
import { ProjectService } from '../../shared/services/project.service';

@Component({
  selector: 'app-confirmation-paiment',
  templateUrl: './confirmation-paiment.component.html',
  styleUrls: ['./confirmation-paiment.component.scss']
})
export class ConfirmationPaimentComponent {
  priceSuggestedAndPaymentConfirmationId: any;
  userInfo!:any;

  constructor(private suggestionService: PriceSuggestionServiceService,
              private userInfoService: UserService,
              private projectService: ProjectService) {}

  ngOnInit() {
    this.priceSuggestedAndPaymentConfirmationId = this.suggestionService.getPriceSuggestedAndPaymentConfirmationId();
    console.log("this is the confirmation page ",this.priceSuggestedAndPaymentConfirmationId)
   this.getUserInfo();

  }

  getUserInfo(): void {
    const email = localStorage.getItem("emailTransporteur")||""; // Replace with the email you want to retrieve info for

    this.userInfoService.getUserInfoByEmail(email).subscribe(
      (response: any) => {
        this.userInfo = response;
        const project ={
          // priceAndId: this.priceSuggestedAndPaymentConfirmationId,
          userFirstName:this.userInfo.firstName,
          userLastName:this.userInfo.lastName,
          userPhoneNumber:this.userInfo.phoneNumber,
          price:this.priceSuggestedAndPaymentConfirmationId.priceSuggested.priceSuggestion,
          transporteurEmail:this.priceSuggestedAndPaymentConfirmationId.priceSuggested.email,
          demandeId:this.priceSuggestedAndPaymentConfirmationId.priceSuggested.demandeID
        }
        this.addProject(project);
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error here
      }
    );
  }

  
  addProject(project: any): void {
    this.projectService.addProject(project).subscribe(
      (response: any) => {
        console.log('Project added successfully:', response);
        // Handle the response after adding the project
      },
      (error) => {
        console.error('Error adding project:', error);
        // Handle the error when adding the project
      }
    );
  }
}
