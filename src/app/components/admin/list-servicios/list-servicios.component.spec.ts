import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListServiciosComponent } from './list-servicios.component';

describe('ListServiciosComponent', () => {
  let component: ListServiciosComponent;
  let fixture: ComponentFixture<ListServiciosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
