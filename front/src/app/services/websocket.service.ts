import { Injectable } from '@angular/core';
import * as SockJS from "sockjs-client";
import * as   Stomp  from "stompjs";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket = new SockJS('http://localhost:8081/sba-websocket');
  stompClient = Stomp.over(this.socket);
  
  subscribe(topic:string,callback:any):void{
      const connected:boolean = this.stompClient.connected;
      if(connected){
          this.subscribeToTopic(topic,callback);
          return;
      }

      //IF STOMP CLIENT IS NOT CONNECTED CONNECT AND SUBSCRIVE TO TOPIC
      this.stompClient.connect({},():any=>{
          console.log("trying to connect")
          this.subscribeToTopic(topic,callback);
      })


  }

  private subscribeToTopic(topic: string, callback: any): void {
    this.stompClient.subscribe(topic, (message:any) => {
      // const messageContent = JSON.parse(message.body); // Assuming the message content is in JSON format
      callback(message);
    });
  }
}
