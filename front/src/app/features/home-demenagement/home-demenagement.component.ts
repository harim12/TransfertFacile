import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home-demenagement',
  templateUrl: './home-demenagement.component.html',
  styleUrls: ['./home-demenagement.component.scss']
})
export class HomeDemenagementComponent {
  activeTab: number = 0;

  openTab(index: number) {
    this.activeTab = index;
  }


}
