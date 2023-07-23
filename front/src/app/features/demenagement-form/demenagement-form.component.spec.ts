import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemenagementFormComponent } from './demenagement-form.component';

describe('DemenagementFormComponent', () => {
  let component: DemenagementFormComponent;
  let fixture: ComponentFixture<DemenagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemenagementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemenagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
