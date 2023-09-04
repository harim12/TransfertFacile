import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  transporteurInfo!:any;
  email!:string;
  constructor(
    private transporteurService: ProfileService,
    private webSocketService: WebsocketService
  ) {}

  ngOnInit(){
    this.email = localStorage.getItem("emailTransporteur") || '';
    this.fetchAndPatchTransporteurData(this.email);

    this.webSocketService.subscribe('/topic/update-personal-info', () => {
      console.log("inside the subscription88888888888888888888")
      this.fetchAndPatchTransporteurData(this.email);
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
}
