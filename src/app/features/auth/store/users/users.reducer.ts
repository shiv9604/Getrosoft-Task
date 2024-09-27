import { createReducer, on } from '@ngrx/store';
import { usersState } from './users.state';
import {
  registerUser,
  registerUserOnError,
  registerUserOnSuccess,
} from './users.actions';

export const userReducer = createReducer(
  usersState,
  on(registerUser, (state) => ({
    ...state,
  })),
  on(registerUserOnSuccess, (state, { user }) => ({
    ...state,
    registeredUsers: [...state.registeredUsers, user],
  })),
  on(registerUserOnError, (state, { error, user }) => ({
    ...state,
    errors: [...state.errors, { user, error }],
  }))
);
