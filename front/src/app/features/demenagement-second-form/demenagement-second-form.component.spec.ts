import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemenagementSecondFormComponent } from './demenagement-second-form.component';

describe('DemenagementSecondFormComponent', () => {
  let component: DemenagementSecondFormComponent;
  let fixture: ComponentFixture<DemenagementSecondFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemenagementSecondFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemenagementSecondFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
