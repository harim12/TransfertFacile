import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColisObjetEmballeDemenagementComponent } from './colis-objet-emballe-demenagement.component';

describe('ColisObjetEmballeDemenagementComponent', () => {
  let component: ColisObjetEmballeDemenagementComponent;
  let fixture: ComponentFixture<ColisObjetEmballeDemenagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColisObjetEmballeDemenagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColisObjetEmballeDemenagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
