import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpTransporteurComponent } from './sign-up-transporteur.component';

describe('SignUpTransporteurComponent', () => {
  let component: SignUpTransporteurComponent;
  let fixture: ComponentFixture<SignUpTransporteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpTransporteurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpTransporteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
