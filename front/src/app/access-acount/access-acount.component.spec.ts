import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessAcountComponent } from './access-acount.component';

describe('AccessAcountComponent', () => {
  let component: AccessAcountComponent;
  let fixture: ComponentFixture<AccessAcountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessAcountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessAcountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
