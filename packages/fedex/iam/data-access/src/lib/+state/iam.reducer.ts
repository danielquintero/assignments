import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as IAMActions from './iam.actions';
import { UserEntity } from './iam.models';

export const IAM_FEATURE_KEY = 'iam';

export interface IAMState extends EntityState<UserEntity> {
  selectedId?: string | number; // which Iam record has been selected
  isProcessing: boolean;
  loaded: boolean; // has the Iam list been loaded
  error?: string | null; // last known error (if any)
}

export interface IAMSignUpPartialState {
  readonly [IAM_FEATURE_KEY]: IAMState;
}

export const IAMAdapter: EntityAdapter<UserEntity> =
  createEntityAdapter<UserEntity>();

export const initialIAMState: IAMState = IAMAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  isProcessing: false,
});

const reducer = createReducer(
  initialIAMState,
  on(IAMActions.initSignUp, (state) => ({
    ...state,
    loaded: false,
    isProcessing: true,
    error: null,
  })),
  on(IAMActions.signUpSuccess, (state, { user }) =>
    IAMAdapter.setOne(user, {
      ...state,
      loaded: true,
      isProcessing: false,
      selectedId: user.id,
    })
  ),
  on(IAMActions.signUpFailure, (state, { error: { message } }) => ({
    ...state,
    error: message,
    isProcessing: false,
  })),
  on(IAMActions.initSignIn, (state) => ({
    ...state,
    loaded: false,
    error: null,
    isProcessing: true,
  })),
  on(IAMActions.signInSuccess, (state, { user }) =>
    IAMAdapter.setOne(user, {
      ...state,
      loaded: true,
      isProcessing: false,
      selectedId: user.id,
    })
  ),
  on(IAMActions.signInFailure, (state, { error: { message } }) => ({
    ...state,
    error: message,
    isProcessing: false,
  }))
);

export function iamReducer(state: IAMState | undefined, action: Action) {
  return reducer(state, action);
}
