import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListHostorialServiciosComponent } from './list-hostorial-servicios.component';

describe('ListHostorialServiciosComponent', () => {
  let component: ListHostorialServiciosComponent;
  let fixture: ComponentFixture<ListHostorialServiciosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHostorialServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHostorialServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
