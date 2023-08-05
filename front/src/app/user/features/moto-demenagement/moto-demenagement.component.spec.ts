import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoDemenagementComponent } from './moto-demenagement.component';

describe('MotoDemenagementComponent', () => {
  let component: MotoDemenagementComponent;
  let fixture: ComponentFixture<MotoDemenagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotoDemenagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotoDemenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
