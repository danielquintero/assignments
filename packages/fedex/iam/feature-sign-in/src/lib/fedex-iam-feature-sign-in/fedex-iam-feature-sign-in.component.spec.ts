import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FedexIamFeatureSignInComponent } from './fedex-iam-feature-sign-in.component';

describe('FedexIamFeatureSignInComponent', () => {
  let component: FedexIamFeatureSignInComponent;
  let fixture: ComponentFixture<FedexIamFeatureSignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FedexIamFeatureSignInComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FedexIamFeatureSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
