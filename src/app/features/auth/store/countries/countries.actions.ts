import { createAction, props } from '@ngrx/store';
import { Country } from 'src/app/shared/models/countries/country.interface';

export enum CountriesActions {
  GET_COUNTRIES = '[Countries] Get Countries',
  GET_COUNTRIES_ON_SUCCESS = '[Countries] Get Countries OnSucess',
  GET_COUNTRIES_ON_ERROR = '[Countries] Get Countries OnError',
}

export const getCountries = createAction(CountriesActions.GET_COUNTRIES);
export const getCountriesOnSuccess = createAction(
  CountriesActions.GET_COUNTRIES_ON_SUCCESS,
  props<{ data: Country[] | never }>()
);
export const getCountriesOnError = createAction(
  CountriesActions.GET_COUNTRIES_ON_ERROR,
  props<{ error: any }>()
);
