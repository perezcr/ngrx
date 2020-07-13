/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { UserPageActions } from './actions';
import { UserState, initialState } from './user.state';

export const userReducer = createReducer<UserState>(
  initialState,
  on(
    UserPageActions.maskUserName,
    (state): UserState => {
      return {
        ...state,
        maskUserName: !state.maskUserName,
      };
    }
  ),
  on(
    UserPageActions.setCurrentUser,
    (state): UserState => ({
      ...state,
      currentUser: state.currentUser,
    })
  )
);
