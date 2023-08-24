import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationPaimentComponent } from './confirmation-paiment.component';

describe('ConfirmationPaimentComponent', () => {
  let component: ConfirmationPaimentComponent;
  let fixture: ComponentFixture<ConfirmationPaimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmationPaimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationPaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
