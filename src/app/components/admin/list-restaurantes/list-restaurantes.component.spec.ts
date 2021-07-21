import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListRestaurantesComponent } from './list-restaurantes.component';

describe('ListRestaurantesComponent', () => {
  let component: ListRestaurantesComponent;
  let fixture: ComponentFixture<ListRestaurantesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRestaurantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
