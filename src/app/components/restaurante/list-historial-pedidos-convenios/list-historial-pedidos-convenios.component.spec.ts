import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListHistorialPedidosConveniosComponent } from './list-historial-pedidos-convenios.component';

describe('ListHistorialPedidosConveniosComponent', () => {
  let component: ListHistorialPedidosConveniosComponent;
  let fixture: ComponentFixture<ListHistorialPedidosConveniosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHistorialPedidosConveniosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistorialPedidosConveniosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
