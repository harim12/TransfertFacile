import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTransporteurComponent } from './login-transporteur.component';

describe('LoginTransporteurComponent', () => {
  let component: LoginTransporteurComponent;
  let fixture: ComponentFixture<LoginTransporteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginTransporteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginTransporteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
