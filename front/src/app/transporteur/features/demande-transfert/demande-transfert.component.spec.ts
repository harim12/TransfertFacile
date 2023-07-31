import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeTransfertComponent } from './demande-transfert.component';

describe('DemandeTransfertComponent', () => {
  let component: DemandeTransfertComponent;
  let fixture: ComponentFixture<DemandeTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeTransfertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
