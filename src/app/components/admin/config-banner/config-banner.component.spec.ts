import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConfigBannerComponent } from './config-banner.component';

describe('ConfigBannerComponent', () => {
  let component: ConfigBannerComponent;
  let fixture: ComponentFixture<ConfigBannerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
