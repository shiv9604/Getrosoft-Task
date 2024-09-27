import { ActionReducerMap } from '@ngrx/store';
import { countriesReducer } from '../features/auth/store/countries/countries.reducer';
import { COUNTRIES_STATE_KEY } from '../features/auth/store/countries/countries.state';

import { USERS_STATE_KEY } from '../features/auth/store/users/users.state';
import { AppState } from './app.store';
import { userReducer } from '../features/auth/store/users/users.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  [COUNTRIES_STATE_KEY]: countriesReducer,
  [USERS_STATE_KEY]: userReducer,
};
