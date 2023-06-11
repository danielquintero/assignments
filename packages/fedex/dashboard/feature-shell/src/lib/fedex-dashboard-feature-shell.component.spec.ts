import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FedexDashboardFeatureShellComponent } from './fedex-dashboard-feature-shell.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('FedexDashboardFeatureShellComponent', () => {
  let component: FedexDashboardFeatureShellComponent;
  let fixture: ComponentFixture<FedexDashboardFeatureShellComponent>;

  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FedexDashboardFeatureShellComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(FedexDashboardFeatureShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
