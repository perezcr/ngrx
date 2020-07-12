import { User } from '../user';

/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { UserPageActions } from './actions';

// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

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
