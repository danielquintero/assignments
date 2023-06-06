import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MustNotMatch,
  ValidatePasswordStrength,
  email,
} from '@challenges/shared/util-forms';
import { Store } from '@ngrx/store';
import {
  selectIamLoaded,
  initSignUp,
  selectEntity,
  selectIamProcessing,
} from '@challenges/fedex-iam-data-access';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'fedex-iam-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `<div class="fedex-iam-signup">
      <ng-container *ngIf="(isProcessing$ | async) !== true; else elseTemplate">
        <h2 class="fedex-iam-signup-create-account">Create a new account</h2>
        <p class="fedex-iam-signup-signin">
          Or
          <a routerLink="/iam/sign-in">
            sign in if you already have an account.
          </a>
        </p>

        <div class="fedex-iam-signup-content">
          <div class="fedex-iam-signup-card">
            <form
              [formGroup]="signupForm"
              (submit)="onSubmit()"
              class="space-y-6"
            >
              <div>
                <label for="firstName" class="text-input-label">
                  First name
                </label>
                <div class="mt-1">
                  <input
                    id="firstName"
                    formControlName="firstName"
                    name="firstName"
                    type="text"
                    autocomplete="none"
                    required
                    class="text-input"
                  />
                </div>
                <div
                  class="input-errors"
                  data-test-id="first-name-errors"
                  *ngIf="firstName.invalid && firstName.touched"
                >
                  <span *ngIf="firstName.getError('required')"
                    >first name is required</span
                  >
                </div>
              </div>

              <div>
                <label for="lastName" class="text-input-label">
                  Last name
                </label>
                <div class="mt-1">
                  <input
                    id="lastName"
                    class="text-input"
                    formControlName="lastName"
                    name="lastName"
                    type="text"
                    autocomplete="none"
                    required
                  />
                </div>
                <div
                  class="input-errors"
                  data-test-id="last-name-errors"
                  *ngIf="lastName.invalid && lastName.touched"
                >
                  <span *ngIf="lastName.getError('required')"
                    >last name is required</span
                  >
                </div>
              </div>

              <div>
                <label for="email" class="text-input-label">
                  Email address
                </label>
                <div class="mt-1">
                  <input
                    id="email"
                    class="text-input"
                    formControlName="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                  />
                </div>
                <div
                  class="input-errors"
                  data-test-id="email-errors"
                  *ngIf="email.invalid && email.touched"
                >
                  <span *ngIf="email.getError('required')"
                    >email is required</span
                  >
                  <span *ngIf="email.getError('pattern')"
                    >email must follow jhon.doe@example.com pattern</span
                  >
                </div>
              </div>

              <div>
                <label for="password" class="text-input-label">
                  Password
                </label>
                <div class="mt-1">
                  <input
                    id="password"
                    formControlName="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="text-input"
                  />
                </div>
                <div
                  class="input-errors"
                  data-test-id="password-errors"
                  *ngIf="
                    (password.invalid || signupForm.errors?.['mustNotMatch']) &&
                    password.touched
                  "
                >
                  <span *ngIf="password.getError('required')"
                    >password is required</span
                  >
                  <span *ngIf="password.getError('minlength')"
                    >password should be minimum 8 characters long</span
                  >
                  <span *ngIf="password.getError('weakPassword')"
                    >password should contain at least one lower, upper, digit
                    and symbol character</span
                  >
                  <span *ngIf="signupForm.getError('mustNotMatch')"
                    >password should not contain first or last name</span
                  >
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="rememberMe"
                    class="checkbox-input"
                    formControlName="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                  />
                  <label
                    for="rememberMe"
                    class="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <a href="#" class="fedex-iam-signup-existing-account">
                    Have an account?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  data-cy="submit"
                  [disabled]="signupForm.invalid"
                  [ngClass]="{
                    'disabled:opacity-50 cursor-not-allowed': signupForm.invalid
                  }"
                  class="submit-btn"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </ng-container>
    </div>

    <ng-template #elseTemplate>
      <div id="loadingTpl" class="flex justify-center mt-6">Loading...</div>
    </ng-template> `,
  styles: [
    `
      .fedex-iam-signup {
        @apply bg-gray-50;
        @apply flex;
        @apply flex-col;
        @apply justify-center;
        @apply py-6;
        @apply sm:px-6;
        @apply lg:px-8;
      }

      .fedex-iam-signup-create-account {
        @apply mt-6;
        @apply text-center;
        @apply text-3xl;
        @apply font-extrabold;
        @apply text-gray-900;
      }

      .fedex-iam-signup-signin {
        @apply mt-2;
        @apply text-center;
        @apply text-sm;
        @apply text-gray-600;
        @apply max-w-full;
      }

      .fedex-iam-signup-signin a {
        @apply font-medium;
        @apply text-indigo-600;
        @apply hover:text-indigo-500;
      }

      .fedex-iam-signup-content {
        @apply mt-8;
        @apply sm:mx-auto;
        @apply sm:w-full;
        @apply sm:max-w-md;
      }

      .fedex-iam-signup-card {
        @apply bg-white;
        @apply py-8;
        @apply px-4;
        @apply shadow;
        @apply sm:rounded-lg;
        @apply sm:px-10;
      }

      .fedex-iam-signup-existing-account {
        @apply font-medium;
        @apply text-indigo-600;
        @apply hover:text-indigo-500;
      }

      .text-input {
        @apply appearance-none;
        @apply block;
        @apply w-full;
        @apply px-3;
        @apply py-2;
        @apply border;
        @apply border-gray-300;
        @apply rounded-md;
        @apply shadow-sm;
        @apply placeholder-gray-400;
        @apply focus:outline-none;
        @apply focus:ring-indigo-500;
        @apply focus:border-indigo-500;
        @apply sm:text-sm;
      }

      .text-input-label {
        @apply block;
        @apply text-sm;
        @apply font-medium;
        @apply text-gray-700;
      }

      .checkbox-input {
        @apply h-4;
        @apply w-4;
        @apply text-indigo-600;
        @apply focus:ring-indigo-500;
        @apply border-gray-300;
        @apply rounded;
      }

      .input-errors span {
        @apply block;
        @apply text-xs;
        @apply text-red-400;
      }

      button.submit-btn {
        @apply w-full;
        @apply flex;
        @apply justify-center;
        @apply py-2;
        @apply px-4;
        @apply border;
        @apply border-transparent;
        @apply rounded-md;
        @apply shadow-sm;
        @apply text-sm;
        @apply font-medium;
        @apply text-white;
        @apply bg-indigo-600;
        @apply hover:bg-indigo-700;
        @apply focus:outline-none;
        @apply focus:ring-2;
        @apply focus:ring-offset-2;
        @apply focus:ring-indigo-500;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FedexIamFeatureSignUpComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);
  readonly isProcessing$ = this.store.select(selectIamProcessing);

  readonly firstName = new FormControl('', [Validators.required]);
  readonly lastName = new FormControl('', [Validators.required]);
  readonly email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(email),
  ]);
  readonly password = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    ValidatePasswordStrength,
  ]);
  readonly rememberMe = new FormControl<boolean>(false);
  readonly signupForm: FormGroup = this.formBuilder.group(
    {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    },
    {
      validators: MustNotMatch('password', ['firstName', 'lastName']),
    }
  );

  onSubmit() {
    this.store.dispatch(initSignUp(this.signupForm.value));
  }
}
