import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CortesConvenioComponent } from './cortes-convenio.component';

describe('CortesConvenioComponent', () => {
  let component: CortesConvenioComponent;
  let fixture: ComponentFixture<CortesConvenioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CortesConvenioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CortesConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
