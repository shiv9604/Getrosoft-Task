import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user/user.interface';

export enum UserActions {
  REGISTER_USER = '[User] Register User',
  REGISTER_USER_ON_SUCCESS = '[User] Register User OnSucess',
  REGISTER_USER_ON_ERROR = '[User] Register User OnError',
}

export const registerUser = createAction(
  UserActions.REGISTER_USER,
  props<{ user: User }>()
);

export const registerUserOnSuccess = createAction(
  UserActions.REGISTER_USER_ON_SUCCESS,
  props<{ user: User }>()
);
export const registerUserOnError = createAction(
  UserActions.REGISTER_USER_ON_ERROR,
  props<{ error: any; user: User }>()
);
