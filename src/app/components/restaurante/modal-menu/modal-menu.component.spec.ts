import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalMenuComponent } from './modal-menu.component';

describe('ModalMenuComponent', () => {
  let component: ModalMenuComponent;
  let fixture: ComponentFixture<ModalMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
