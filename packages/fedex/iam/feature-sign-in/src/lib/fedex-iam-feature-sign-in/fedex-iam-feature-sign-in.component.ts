import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { email } from '@challenges/shared/util-forms';
import {
  initSignIn,
  selectIamError,
  selectIamProcessing,
} from '@challenges/fedex-iam-data-access';

@Component({
  selector: 'fedex-iam-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  template: `
    <div class="fedex-iam-signin">
      <h2>Sign in to your account</h2>
      <p>
        Or
        <a routerLink="/iam/sign-up" class="fedex-iam-signin-start-trial">
          create a new account
        </a>
      </p>

      <ng-container *ngIf="signInError$ | async as error">
        <div data-testid="signin-errors" class="fedex-iam-signin-errors">
          {{ error }}
        </div>
      </ng-container>

      <ng-container
        *ngIf="(isProcessing$ | async) !== true; else loadingTemplate"
      >
        <div class="fedex-iam-signin-content">
          <div class="fedex-iam-signin-card">
            <form
              class="space-y-6"
              [formGroup]="signInForm"
              (submit)="onSubmit()"
            >
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
                  data-testid="email-errors"
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
                    class="text-input"
                    formControlName="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                  />
                </div>
                <div
                  class="input-errors"
                  data-testid="password-errors"
                  *ngIf="password.invalid && password.touched"
                >
                  <span *ngIf="password.getError('required')"
                    >password is required</span
                  >
                </div>
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember_me"
                    class="checkbox-input"
                    name="remember_me"
                    type="checkbox"
                  />
                  <label
                    for="remember_me"
                    class="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div class="text-sm">
                  <a href="#" class="fedex-iam-signin-forgot-password">
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  data-testid="submit"
                  [disabled]="signInForm.invalid"
                  [ngClass]="{
                    'disabled:opacity-50 cursor-not-allowed': signInForm.invalid
                  }"
                  class="submit-btn"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div class="mt-6">
              <div class="relative">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-gray-300"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div class="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a href="#" class="fedex-iam-signin-federated">
                    <span class="sr-only">Sign in with Facebook</span>
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>

                <div>
                  <span href="#" class="fedex-iam-signin-federated">
                    <span class="sr-only">Sign in with Twitter</span>
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                      />
                    </svg>
                  </span>
                </div>

                <div>
                  <a href="#" class="fedex-iam-signin-federated">
                    <span class="sr-only">Sign in with GitHub</span>
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ng-container>
    </div>

    <ng-template #loadingTemplate>
      <div id="loadingTpl" class="flex justify-center mt-6">Loading...</div>
    </ng-template>
  `,
  styles: [
    `
      .fedex-iam-signin {
        @apply bg-gray-50;
        @apply flex;
        @apply flex-col;
        @apply justify-center;
        @apply py-6;
        @apply sm:px-6;
        @apply lg:px-8;
      }

      .fedex-iam-signin-start-trial {
        @apply font-medium;
        @apply text-indigo-600;
        @apply hover:text-indigo-500;
      }

      .fedex-iam-signin-errors {
        @apply block;
        @apply text-xs;
        @apply text-center;
        @apply text-red-400;
        @apply my-2;
      }

      .fedex-iam-signin-content {
        @apply mt-2;
        @apply sm:mx-auto;
        @apply sm:w-full;
        @apply sm:max-w-md;
      }

      .fedex-iam-signin-card {
        @apply bg-white;
        @apply py-8;
        @apply px-4;
        @apply shadow;
        @apply sm:rounded-lg;
        @apply sm:px-10;
      }

      .fedex-iam-signin-forgot-password {
        @apply font-medium;
        @apply text-indigo-600;
        @apply hover:text-indigo-500;
      }

      .fedex-iam-signin-federated {
        @apply w-full;
        @apply inline-flex;
        @apply justify-center;
        @apply py-2;
        @apply px-4;
        @apply border;
        @apply border-gray-300;
        @apply rounded-md;
        @apply shadow-sm;
        @apply bg-white;
        @apply text-sm;
        @apply font-medium;
        @apply text-gray-500;
        @apply hover:bg-gray-50;
      }

      h2 {
        @apply mt-6;
        @apply text-center;
        @apply text-3xl;
        @apply font-extrabold;
        @apply text-gray-900;
      }

      p {
        @apply mt-2;
        @apply text-center;
        @apply text-sm;
        @apply text-gray-600;
        @apply max-w-full;
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
export class FedexIamFeatureSignInComponent {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(FormBuilder);

  public readonly isProcessing$ = this.store.select(selectIamProcessing);
  public readonly signInError$ = this.store.select(selectIamError);
  public readonly email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern(email),
  ]);
  public readonly password = new FormControl('', [Validators.required]);
  public readonly signInForm: FormGroup = this.formBuilder.group({
    email: this.email,
    password: this.password,
  });

  public onSubmit() {
    this.store.dispatch(initSignIn(this.signInForm.value));
  }
}
