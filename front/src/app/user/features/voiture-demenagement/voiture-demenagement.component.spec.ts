import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoitureDemenagementComponent } from './voiture-demenagement.component';

describe('VoitureDemenagementComponent', () => {
  let component: VoitureDemenagementComponent;
  let fixture: ComponentFixture<VoitureDemenagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoitureDemenagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoitureDemenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
