import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListTransporteComponent } from './list-transporte.component';

describe('ListTransporteComponent', () => {
  let component: ListTransporteComponent;
  let fixture: ComponentFixture<ListTransporteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTransporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
