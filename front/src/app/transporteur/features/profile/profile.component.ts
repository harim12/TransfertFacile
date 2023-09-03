import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  activeTab: number = 2;
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
    if (window.innerWidth > 768) {
      this.isNonResponsive = true;
    } else {
      this.isNonResponsive = false;
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const previousTab = this.activeTab; // Remember the current activeTab
    this.checkScreenSize();
    
    if (this.isNonResponsive) {
      this.activeTab = previousTab
      console.log(this.activeTab)
    } else {
      this.activeTab = previousTab; // Restore the previous activeTab if switching to non-responsive

      console.log(this.activeTab)
      // Reset to first tab when switching to responsive
    }
  }
}
