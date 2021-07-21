import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalRepartidorComponent } from './modal-repartidor.component';

describe('ModalRepartidorComponent', () => {
  let component: ModalRepartidorComponent;
  let fixture: ComponentFixture<ModalRepartidorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRepartidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
