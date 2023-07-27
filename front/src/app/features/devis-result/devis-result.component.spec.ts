import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisResultComponent } from './devis-result.component';

describe('DevisResultComponent', () => {
  let component: DevisResultComponent;
  let fixture: ComponentFixture<DevisResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
