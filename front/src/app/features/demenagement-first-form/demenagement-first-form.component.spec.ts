import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemenagementFirstFormComponent } from './demenagement-first-form.component';

describe('DemenagementFirstFormComponent', () => {
  let component: DemenagementFirstFormComponent;
  let fixture: ComponentFixture<DemenagementFirstFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemenagementFirstFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemenagementFirstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
