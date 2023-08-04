import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVehiculeComponent } from './details-vehicule.component';

describe('DetailsVehiculeComponent', () => {
  let component: DetailsVehiculeComponent;
  let fixture: ComponentFixture<DetailsVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
