import { createReducer, on, Action } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserState } from '.';

export const userFeatureKey = 'user';

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

const userReducer = createReducer(
  initialState,
  on(UserActions.maskUserName, (state, { maskUserName }) => ({
    ...state,
    maskUserName: maskUserName,
  })),
  on(UserActions.setCurrentUser, (state) => ({
    ...state,
    currentUser: state.currentUser,
  }))
);

export function reducer(state: UserState, action: Action) {
  return userReducer(state, action);
}
