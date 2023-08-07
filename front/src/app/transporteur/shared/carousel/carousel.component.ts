import { Component, Input , ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
 
  @Input() items: any[] =[];
  @ViewChild('slidesWrapper') slidesWrapper!: ElementRef;

  slideWidth = 0;
  currentPosition = 0;

  ngAfterViewInit(): void {
    this.slideWidth = this.getSlideWidth();
  }

  getSlideWidth(): number {
    const slideElements = this.slidesWrapper.nativeElement.children;
    if (slideElements.length > 0) {
      const slideWidth = slideElements[0].getBoundingClientRect().width;
      return slideWidth;
    }
    return 0;
  }

  prevSlide() {
    this.currentPosition += this.slideWidth;
    this.updateSlidePosition();
  }

  nextSlide() {
    this.currentPosition -= this.slideWidth;
    this.updateSlidePosition();
    console.log("next")
  }

  updateSlidePosition() {
    const carousel = this.slidesWrapper.nativeElement;
    const minPosition = -this.slideWidth * (this.items.length - 1);
    const maxPosition = 0;

    if (this.currentPosition > maxPosition) {
      this.currentPosition = minPosition;
    } else if (this.currentPosition < minPosition) {
      this.currentPosition = maxPosition;
    }

    carousel.style.transform = `translateX(${this.currentPosition}px)`;
  }
}
