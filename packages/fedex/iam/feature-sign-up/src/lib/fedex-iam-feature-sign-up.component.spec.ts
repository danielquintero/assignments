import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FedexIamFeatureSignUpComponent } from './fedex-iam-feature-sign-up.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { email } from '@challenges/shared/util-forms';

describe('FedexIamFeatureSignUpComponent', () => {
  let component: FedexIamFeatureSignUpComponent;
  let fixture: ComponentFixture<FedexIamFeatureSignUpComponent>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: MockStore;

  const initialState = {};

  function fillOutForm(overrides = {}) {
    const defaultData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      password: 'P@ssword123',
    };

    const formData = { ...defaultData, ...overrides };

    component.signUpForm.controls['firstName'].setValue(formData.firstName);
    component.signUpForm.controls['lastName'].setValue(formData.lastName);
    component.signUpForm.controls['email'].setValue(formData.email);
    component.signUpForm.controls['password'].setValue(formData.password);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FedexIamFeatureSignUpComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: { data: of({ value: 'sign-up' }) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FedexIamFeatureSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    store = TestBed.inject(MockStore);
  });

  it('should be valid when all fields are filled out correctly', () => {
    // Act
    fillOutForm();

    // Assert
    expect(component.signUpForm.valid).toBeTruthy();
  });

  it(`should be invalid when the field password contains user's first or last name`, () => {
    // Act
    fillOutForm({ password: 'John12345g$!' });

    // Assert
    expect(component.signUpForm.valid).toBeFalsy();
    expect(component.signUpForm.errors).toEqual({ mustNotMatch: true });
  });

  it('should be invalid when password is less than 8 characters', () => {
    // Act
    fillOutForm({ password: 'h$G.sa1' });

    // Assert
    expect(component.signUpForm.valid).toBeFalsy();
    expect(component.signUpForm.controls['password'].errors).toEqual({
      minlength: { requiredLength: 8, actualLength: 7 },
    });
  });

  it('should be invalid when password does not contain lower and uppercase letters', () => {
    // Act
    fillOutForm({ password: 'abcdefghijk' });

    // Assert
    expect(component.signUpForm.valid).toBeFalsy();
    expect(component.signUpForm.controls['password'].errors).toEqual({
      weakPassword: true,
    });
  });

  it('should be invalid when email is not a valid email address', () => {
    // Act
    fillOutForm({ email: 'john.doe' });

    // Assert
    expect(component.signUpForm.valid).toBeFalsy();
    expect(component.signUpForm.controls['email'].errors).toEqual({
      email: true,
      pattern: {
        actualValue: 'john.doe',
        requiredPattern: email,
      },
    });
  });

  it('should be invalid when email is empty', () => {
    // Act
    fillOutForm({ email: '' });

    // Assert
    expect(component.signUpForm.valid).toBeFalsy();
    expect(component.signUpForm.controls['email'].errors).toEqual({
      required: true,
    });
  });

  it('should have a disabled submit button when form is invalid', () => {
    // Act
    fillOutForm({ email: '' });

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const submitEl = fixture.debugElement;

      // Assert
      expect(
        submitEl.nativeElement.querySelector('button').disabled
      ).toBeTruthy();
    });
  });

  it('should have an enabled submit button when form is valid', () => {
    // Act
    fillOutForm();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const submitEl = fixture.debugElement;

      // Assert
      expect(
        submitEl.nativeElement.querySelector('button').disabled
      ).toBeFalsy();
    });
  });
});
