import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalAdministradorComponent } from './modal-administrador.component';

describe('ModalAdministradorComponent', () => {
  let component: ModalAdministradorComponent;
  let fixture: ComponentFixture<ModalAdministradorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAdministradorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
