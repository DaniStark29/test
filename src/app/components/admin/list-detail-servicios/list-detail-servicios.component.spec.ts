import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListDetailServiciosComponent } from './list-detail-servicios.component';

describe('ListDetailServiciosComponent', () => {
  let component: ListDetailServiciosComponent;
  let fixture: ComponentFixture<ListDetailServiciosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDetailServiciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
