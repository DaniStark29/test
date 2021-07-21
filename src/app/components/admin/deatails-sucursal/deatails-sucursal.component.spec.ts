import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeatailsSucursalComponent } from './deatails-sucursal.component';

describe('DeatailsSucursalComponent', () => {
  let component: DeatailsSucursalComponent;
  let fixture: ComponentFixture<DeatailsSucursalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeatailsSucursalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeatailsSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
