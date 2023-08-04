import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPaimentComponent } from './details-paiment.component';

describe('DetailsPaimentComponent', () => {
  let component: DetailsPaimentComponent;
  let fixture: ComponentFixture<DetailsPaimentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPaimentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsPaimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
