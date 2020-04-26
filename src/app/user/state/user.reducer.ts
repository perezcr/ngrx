import { User } from '../user';
import { createFeatureSelector, createSelector } from '@ngrx/store';

// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

// Selector functions
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser
);

export function reducer(state = initialState, action): UserState {
  switch (action.type) {
    case 'MASK_USER_NAME':
      return { ...state, maskUserName: action.payload };
    default:
      return state;
  }
}
