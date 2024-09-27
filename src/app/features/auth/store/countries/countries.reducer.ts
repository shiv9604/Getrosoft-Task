import { createReducer, on } from '@ngrx/store';
import { countriesState } from './countries.state';
import {
  getCountries,
  getCountriesOnError,
  getCountriesOnSuccess,
} from './countries.actions';

export const countriesReducer = createReducer(
  countriesState,
  on(getCountries, (state) => ({
    ...state,
  })),
  on(getCountriesOnSuccess, (state, { data }: any) => ({
    ...state,
    fetchedCountries: data,
  })),
  on(getCountriesOnError, (state, { error }) => ({
    ...state,
    lastError: error,
  }))
);
