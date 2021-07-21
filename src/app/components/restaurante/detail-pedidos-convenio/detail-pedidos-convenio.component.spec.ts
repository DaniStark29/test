import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DetailPedidosConvenioComponent } from './detail-pedidos-convenio.component';

describe('DetailPedidosConvenioComponent', () => {
  let component: DetailPedidosConvenioComponent;
  let fixture: ComponentFixture<DetailPedidosConvenioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailPedidosConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPedidosConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
