import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FedexIamFeatureShellComponent } from './fedex-iam-feature-shell.component';

describe('FedexIamFeatureShellComponent', () => {
  let component: FedexIamFeatureShellComponent;
  let fixture: ComponentFixture<FedexIamFeatureShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FedexIamFeatureShellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FedexIamFeatureShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
