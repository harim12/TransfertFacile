import { Component } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Alertism } from 'alertism';

@Component({
  selector: 'app-details-paiment',
  templateUrl: './details-paiment.component.html',
  styleUrls: ['./details-paiment.component.scss']
})
export class DetailsPaimentComponent {

  paimentInfoForm!: FormGroup;

  constructor(
    private transporteurService: ProfileService,
    private fb: FormBuilder,
    private webSocketService: WebsocketService

  ) {}

  ngOnInit(): void {
    this.paimentInfoForm = this.fb.group({
      cardExpiry: ['', Validators.required],
      ccvCard: ['', Validators.required],
      paymentCardNum: ['', Validators.required],
      nameOnCard: ['', Validators.required],
      streetAddress: [''],
      email:[localStorage.getItem("emailTransporteur")] ,
      city: ['']
    });

    // this.webSocketService.subscribe('/topic/update-paiment-info', () => {
    //   console.log("subscription'''''''''''''''''''''''''''''''''")
    //   this.fetchingTransporteurPaimentData();
    // });
    this.fetchingTransporteurPaimentData();
  }

  fetchingTransporteurPaimentData() {
    const email = localStorage.getItem("emailTransporteur") || '';

    this.transporteurService.getTransporteurPaimentInfo(email).subscribe(
      (data) => {
        // Handle the data received from the API

        // Use patchValue to initialize the form with the fetched data
        this.paimentInfoForm.patchValue({
          cardExpiry: data.cardExpiry,
          ccvCard: data.ccvCard,
          paymentCardNum: data.paymentCardNum,
          nameOnCard: data.nameOnCard,
          streetAddress: data.streetAddress,
          city: data.city
        });
      },
      (error) => {
        // Handle errors if any
        console.error('Error fetching payment info:', error);
      }
    );
  }

  updateTransporteurForm(data: any): void {
    this.paimentInfoForm.patchValue({
      cardExpiry: data.cardExpiry,
      ccvCard: data.ccvCard,
      paymentCardNum: data.paymentCardNum,
      nameOnCard: data.nameOnCard,
      streetAddress: data.streetAddress,
      email: data.email,
      city: data.city,
    });
  }
  updateTransporteur() {
    if (this.paimentInfoForm.valid ) {
      const updatedData = this.paimentInfoForm.value;
      this.transporteurService
        .updateTransporteurPaimentInfo(updatedData)
        .subscribe(
          (response) => {
            // Handle the successful update, if needed
            Alertism({
              alertHeading: "Success",
              alertText: "Paiment data updated successful",
            });
          },
          (error) => {
            // Handle any errors that may occur during the update
            Alertism({
              alertHeading: "Error",
              alertText: "Error updating paiment data",
            });
          }
        );
    }
  }
}
