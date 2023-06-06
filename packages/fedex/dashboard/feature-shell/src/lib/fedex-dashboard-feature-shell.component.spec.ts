import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FedexDashboardFeatureShellComponent } from './fedex-dashboard-feature-shell.component';

describe('FedexDashboardFeatureShellComponent', () => {
  let component: FedexDashboardFeatureShellComponent;
  let fixture: ComponentFixture<FedexDashboardFeatureShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FedexDashboardFeatureShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FedexDashboardFeatureShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
