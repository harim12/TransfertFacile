import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-honda-detail',
  templateUrl: './honda-detail.component.html',
  styleUrls: ['./honda-detail.component.scss']
})
export class HondaDetailComponent {
  priceSuggestionId!: string;
  amount:any;
  
  @ViewChild('paymentRef',{static:true}) paymentRef!:ElementRef;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.amount = 340
    this.route.paramMap.subscribe(params => {
      this.priceSuggestionId = params.get('priceSuggestionId') ?? '';
    });
    window.paypal.Buttons({
      style:{
        layout:'horizontal',
        color:'blue',
        shape:'rect',
        label:'paypal'
      },
      createOrder:(data:any,actions:any)=>{
         return actions.order.create({
            purchase_units:[
               {
                amount:{
                  value:this.amount.toString(),
                  currency_code:'USD'
                }
               }
            ]
        })
      },
      onApprove:(data:any,actions:any)=>{
        return actions.order.capture().then((details:any)=>{
          console.log(details)
        })
      },
      onError:(error:any)=>{
        console.log("transaction declined")
      }
       
    }).render(this.paymentRef.nativeElement)

  }
  
}
