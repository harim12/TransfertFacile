import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetTransfertComponent } from './projet-transfert.component';

describe('ProjetTransfertComponent', () => {
  let component: ProjetTransfertComponent;
  let fixture: ComponentFixture<ProjetTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjetTransfertComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
