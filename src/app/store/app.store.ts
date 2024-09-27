import {
  COUNTRIES_STATE_KEY,
  CountriesState,
  countriesState,
} from '../features/auth/store/countries/countries.state';
import {
  USERS_STATE_KEY,
  UserState,
  usersState,
} from '../features/auth/store/users/users.state';

export interface AppState {
  [COUNTRIES_STATE_KEY]: CountriesState;
  [USERS_STATE_KEY]: UserState;
}
export const appState: AppState = {
  [COUNTRIES_STATE_KEY]: countriesState,
  [USERS_STATE_KEY]: usersState,
};
