import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTransComponent } from './auth-trans.component';

describe('AuthTransComponent', () => {
  let component: AuthTransComponent;
  let fixture: ComponentFixture<AuthTransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthTransComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthTransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
