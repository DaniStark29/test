import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListMenusComponent } from './list-menus.component';

describe('ListMenusComponent', () => {
  let component: ListMenusComponent;
  let fixture: ComponentFixture<ListMenusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
