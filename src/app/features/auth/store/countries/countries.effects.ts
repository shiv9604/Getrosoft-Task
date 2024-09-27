import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/shared/services/user/user.service';
import {
  getCountries,
  getCountriesOnError,
  getCountriesOnSuccess,
} from './countries.actions';
import { catchError, concatMap, map, of } from 'rxjs';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesEffects {
  constructor(private actions$: Actions, private userService: UserService, private toastserService:ToasterService) {}

  getCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCountries),
      concatMap(() =>
        this.userService.getCountries().pipe(
          map((data) => getCountriesOnSuccess({ data })),
          catchError((error) => {
            this.toastserService.showError(error?.error || 'An error occured while getting countries')
            return of(getCountriesOnError({ error }))
           }
          ))
      )
    )
  );
}
