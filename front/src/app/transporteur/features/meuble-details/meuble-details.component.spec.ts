import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeubleDetailsComponent } from './meuble-details.component';

describe('MeubleDetailsComponent', () => {
  let component: MeubleDetailsComponent;
  let fixture: ComponentFixture<MeubleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeubleDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeubleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
