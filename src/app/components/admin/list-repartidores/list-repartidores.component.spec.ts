import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListRepartidoresComponent } from './list-repartidores.component';

describe('ListRepartidoresComponent', () => {
  let component: ListRepartidoresComponent;
  let fixture: ComponentFixture<ListRepartidoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRepartidoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRepartidoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
