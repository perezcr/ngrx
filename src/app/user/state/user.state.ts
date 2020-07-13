import * as AppState from '../../state/app.state';
import { User } from '../user';

// State for this feature (User)
export interface State extends AppState.State {
  users: UserState;
}

// State for this feature (User)
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

export const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};
