import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalUpdateRestaurantComponent } from './modal-update-restaurant.component';

describe('ModalUpdateRestaurantComponent', () => {
  let component: ModalUpdateRestaurantComponent;
  let fixture: ComponentFixture<ModalUpdateRestaurantComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalUpdateRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalUpdateRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
