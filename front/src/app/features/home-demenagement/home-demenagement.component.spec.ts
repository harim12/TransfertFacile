import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDemenagementComponent } from './home-demenagement.component';

describe('HomeDemenagementComponent', () => {
  let component: HomeDemenagementComponent;
  let fixture: ComponentFixture<HomeDemenagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDemenagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDemenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
