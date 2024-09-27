import { Country } from 'src/app/shared/models/countries/country.interface';

export const COUNTRIES_STATE_KEY = 'countries';

export interface CountriesState {
  fetchedCountries: Country[];
  lastError: any;
}

export const countriesState: CountriesState = {
  fetchedCountries: [],
  lastError: '',
};
