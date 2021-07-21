import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCorteConvenioComponent } from './modal-corte-convenio.component';

describe('ModalCorteConvenioComponent', () => {
  let component: ModalCorteConvenioComponent;
  let fixture: ComponentFixture<ModalCorteConvenioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCorteConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCorteConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
