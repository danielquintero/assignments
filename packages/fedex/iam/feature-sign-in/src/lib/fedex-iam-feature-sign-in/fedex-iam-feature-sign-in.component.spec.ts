import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FedexIamFeatureSignInComponent } from './fedex-iam-feature-sign-in.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FedexIamFeatureSignInComponent', () => {
  let component: FedexIamFeatureSignInComponent;
  let fixture: ComponentFixture<FedexIamFeatureSignInComponent>;
  let store: MockStore;
  const initialState = {};

  function fillOutForm(overrides = {}) {
    const defaultData = {
      email: 'john.doe@email.com',
      password: 'P@ssword123',
    };

    const formData = { ...defaultData, ...overrides };

    component.signInForm.controls['email'].setValue(formData.email);
    component.signInForm.controls['password'].setValue(formData.password);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FedexIamFeatureSignInComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: { data: of({ value: 'sign-in' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FedexIamFeatureSignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be valid when all fields are filled out correctly', () => {
    // Act
    fillOutForm();

    // Assert
    expect(component.signInForm.valid).toBeTruthy();
  });

  it(`should be invalid when email and/or password are empty`, () => {
    // Act
    fillOutForm({ email: '', password: '' });

    // Assert
    expect(component.signInForm.valid).toBeFalsy();
  });
});
