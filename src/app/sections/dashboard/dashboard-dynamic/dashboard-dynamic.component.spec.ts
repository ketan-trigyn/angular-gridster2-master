import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDynamicComponent } from './dashboard-dynamic.component';

describe('DashboardDynamicComponent', () => {
  let component: DashboardDynamicComponent;
  let fixture: ComponentFixture<DashboardDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDynamicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
