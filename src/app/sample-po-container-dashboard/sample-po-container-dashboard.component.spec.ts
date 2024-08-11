import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePoContainerDashboardComponent } from './sample-po-container-dashboard.component';

describe('SamplePoContainerDashboardComponent', () => {
  let component: SamplePoContainerDashboardComponent;
  let fixture: ComponentFixture<SamplePoContainerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SamplePoContainerDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SamplePoContainerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
