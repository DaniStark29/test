import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalCategoryConvenioComponent } from './modal-category-convenio.component';

describe('ModalCategoryConvenioComponent', () => {
  let component: ModalCategoryConvenioComponent;
  let fixture: ComponentFixture<ModalCategoryConvenioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCategoryConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCategoryConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
