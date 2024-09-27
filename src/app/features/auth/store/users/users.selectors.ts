import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USERS_STATE_KEY, UserState } from './users.state';

const usersState = createFeatureSelector<UserState>(USERS_STATE_KEY);
export const selectRegisteredUsers = createSelector(
  usersState,
  (state) => state.registeredUsers
);
