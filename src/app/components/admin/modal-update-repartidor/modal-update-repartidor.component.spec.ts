import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalUpdateRepartidorComponent } from './modal-update-repartidor.component';

describe('ModalUpdateRepartidorComponent', () => {
  let component: ModalUpdateRepartidorComponent;
  let fixture: ComponentFixture<ModalUpdateRepartidorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUpdateRepartidorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateRepartidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
