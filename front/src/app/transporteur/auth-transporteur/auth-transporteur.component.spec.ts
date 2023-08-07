import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTransporteurComponent } from './auth-transporteur.component';

describe('AuthTransporteurComponent', () => {
  let component: AuthTransporteurComponent;
  let fixture: ComponentFixture<AuthTransporteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthTransporteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTransporteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
