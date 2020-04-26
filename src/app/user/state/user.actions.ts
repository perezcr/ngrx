import { Action } from '@ngrx/store';
import { User } from '../user';

export enum UserActionTypes {
  MaskUserName = '[User] Mask User Name',
  SetCurrentUser = '[User] Set Current User',
}

export class MaskUserName implements Action {
  readonly type = UserActionTypes.MaskUserName;

  constructor(public payload: boolean) {}
}

export class SetCurrentUser implements Action {
  readonly type = UserActionTypes.SetCurrentUser;

  constructor(public payload: User) {}
}

export type UserActions = MaskUserName | SetCurrentUser;
