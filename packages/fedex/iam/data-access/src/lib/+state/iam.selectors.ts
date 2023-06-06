import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAM_FEATURE_KEY, IAMState, IAMAdapter } from './iam.reducer';

// Lookup the 'Iam' feature state managed by NgRx
export const selectIamState = createFeatureSelector<IAMState>(IAM_FEATURE_KEY);

const { selectAll, selectEntities } = IAMAdapter.getSelectors();

export const selectIamLoaded = createSelector(
  selectIamState,
  (state: IAMState) => state.loaded
);

export const selectIamProcessing = createSelector(
  selectIamState,
  (state: IAMState) => state.isProcessing
);

export const selectIamError = createSelector(
  selectIamState,
  (state: IAMState) => state.error
);

export const selectAllIam = createSelector(selectIamState, (state: IAMState) =>
  selectAll(state)
);

export const selectIamEntities = createSelector(
  selectIamState,
  (state: IAMState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectIamState,
  (state: IAMState) => state.selectedId
);

export const selectEntity = createSelector(
  selectIamEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
