import { createAction, props } from '@ngrx/store';
import { User } from '../user';

export const maskUserName = createAction(
  '[User] Mask User Name',
  props<{ maskUserName: boolean }>()
);

export const setCurrentUser = createAction(
  '[User] Set Current User',
  props<{ currentUser: User }>()
);
