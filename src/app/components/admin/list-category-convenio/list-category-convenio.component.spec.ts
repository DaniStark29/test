import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCategoryConvenioComponent } from './list-category-convenio.component';

describe('ListCategoryConvenioComponent', () => {
  let component: ListCategoryConvenioComponent;
  let fixture: ComponentFixture<ListCategoryConvenioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategoryConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoryConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
