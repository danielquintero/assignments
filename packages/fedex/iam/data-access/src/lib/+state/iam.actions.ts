import { createAction, props } from '@ngrx/store';
import { UserEntity, UserSignIn, UserSignUp } from './iam.models';
import { HttpErrorResponse } from '@angular/common/http';

export const initSignUp = createAction('[IAM Page] Init', props<UserSignUp>());

export const signUpSuccess = createAction(
  '[IAM/API] Sign Up Success',
  props<{ user: UserEntity }>()
);

export const signUpFailure = createAction(
  '[IAM/API] Sign Up Failure',
  props<{ error: HttpErrorResponse }>()
);

export const initSignIn = createAction(
  '[Iam] Sign In User',
  props<UserSignIn>()
);
export const signInSuccess = createAction(
  '[Iam] Sign In User Success',
  props<{ user: UserEntity }>()
);
export const signInFailure = createAction(
  '[Iam] Sign In User Failure',
  props<{ error: HttpErrorResponse }>()
);
