import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListAdministradoresComponent } from './list-administradores.component';

describe('ListAdministradoresComponent', () => {
  let component: ListAdministradoresComponent;
  let fixture: ComponentFixture<ListAdministradoresComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAdministradoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
