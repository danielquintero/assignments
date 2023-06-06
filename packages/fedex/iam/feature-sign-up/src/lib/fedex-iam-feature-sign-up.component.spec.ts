import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FedexIamFeatureSignUpComponent } from './fedex-iam-feature-sign-up.component';

describe('FedexIamFeatureSignUpComponent', () => {
  let component: FedexIamFeatureSignUpComponent;
  let fixture: ComponentFixture<FedexIamFeatureSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FedexIamFeatureSignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FedexIamFeatureSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
