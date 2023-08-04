import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsMotDePasseComponent } from './details-mot-de-passe.component';

describe('DetailsMotDePasseComponent', () => {
  let component: DetailsMotDePasseComponent;
  let fixture: ComponentFixture<DetailsMotDePasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsMotDePasseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsMotDePasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
