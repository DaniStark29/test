import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCorteComponent } from './list-corte.component';

describe('ListCorteComponent', () => {
  let component: ListCorteComponent;
  let fixture: ComponentFixture<ListCorteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCorteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCorteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
