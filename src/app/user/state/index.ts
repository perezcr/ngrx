import { createSelector } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { User } from '../user';

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

// Selector functions
const selectUser = (state: State): UserState => state.user;

export const selectMaskUserName = createSelector(
  selectUser,
  (state: UserState) => state.maskUserName
);

export const selectCurrentUser = createSelector(
  selectUser,
  (state: UserState) => state.currentUser
);
