import { createFeatureSelector, createSelector } from '@ngrx/store';
import { COUNTRIES_STATE_KEY, CountriesState } from './countries.state';

export const countriesState =
  createFeatureSelector<CountriesState>(COUNTRIES_STATE_KEY);
export const selectCountries = createSelector(
  countriesState,
  (state) => state.fetchedCountries
);
