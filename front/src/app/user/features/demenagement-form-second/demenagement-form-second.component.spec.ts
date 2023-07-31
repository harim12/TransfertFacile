import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemenagementFormSecondComponent } from './demenagement-form-second.component';

describe('DemenagementFormSecondComponent', () => {
  let component: DemenagementFormSecondComponent;
  let fixture: ComponentFixture<DemenagementFormSecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemenagementFormSecondComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemenagementFormSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
