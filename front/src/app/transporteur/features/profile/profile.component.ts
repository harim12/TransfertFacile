import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  activeTab: number = 0;
  isNonResponsive: boolean = true;

  ngOnInit() {
    this.checkScreenSize();
  }

  openTab(index: number) {
    this.activeTab = index;
  }

  selectTabResponsive(event: any) {
    this.activeTab = parseInt(event.target.value, 10);
  }

  private checkScreenSize() {
    this.isNonResponsive = window.innerWidth > 768; // Set your desired breakpoint
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }
}
