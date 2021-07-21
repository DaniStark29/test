import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalTransporteComponent } from './modal-transporte.component';

describe('ModalTransporteComponent', () => {
  let component: ModalTransporteComponent;
  let fixture: ComponentFixture<ModalTransporteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTransporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
