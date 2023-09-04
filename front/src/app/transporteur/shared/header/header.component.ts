import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { last } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  transporteurInfo!:any;
  email!:string;
  isNotification:boolean = false;
  notification!:string;
  constructor(
    private transporteurService: ProfileService,
    private webSocketService: WebsocketService,
    private router: Router
  ) {}

  ngOnInit(){
    this.email = localStorage.getItem("emailTransporteur") || '';
    this.fetchAndPatchTransporteurData(this.email);

 
    this.webSocketService.subscribe('/topic/change', (message:any) => {
      this.notification = "demande"

      let words = message.body.split(' ')    
      let lastWord = words[words.length - 1]
      console.log(lastWord)
      if(lastWord=="transporteur"){
        this.notification = "transporteur"
        this.fetchAndPatchTransporteurData(this.email);
     
      }else if(lastWord =="demande"){
        console.log("it's demande")
        this.isNotification = true;
        
      }else if(lastWord=="project"){
        this.notification = "project"
        this.isNotification = true;
        console.log("yess project=======================================================")

      }
    
      console.log("adding demande");
    });
    
  
  }
  
  fetchAndPatchTransporteurData(email: string): void {
    this.transporteurService.getTransporteurPersonalInfo(email).subscribe((data) => {
      this.transporteurInfo = data;
      console.log(this.transporteurInfo);
    });
  }
  getFileNameFromPath(absolutePath: string): string {
    const parts = absolutePath.split("\\");
    return parts[parts.length - 1];
  }
  redirectToNotification() {
    switch (this.notification) {
      case 'demande':
        // Redirect to the "demande" component when a "demande" notification is clicked
        this.router.navigate(['/dashbord/demandes']); // Replace '/demande' with the actual route path to your "demande" component
        break;
      case 'transporteur':
        // this.router.navigate(['/dashbord/demandes']); // Replace '/demande' with the actual route path to your "demande" component

        break;
      case 'project':
        this.router.navigate(['/dashbord/projet']); // Replace '/demande' with the actual route path to your "demande" component
        break;
      default:
        // Handle other notification types or provide a default action
        break;
    }
    this.isNotification = false;
  }
}
