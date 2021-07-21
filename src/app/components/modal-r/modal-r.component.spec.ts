import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalRComponent } from './modal-r.component';

describe('ModalRComponent', () => {
  let component: ModalRComponent;
  let fixture: ComponentFixture<ModalRComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
