import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/shared/services/user/user.service';
import { catchError, concatMap, map, of } from 'rxjs';
import {
  registerUser,
  registerUserOnError,
  registerUserOnSuccess,
} from './users.actions';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { RegisterUserResp } from 'src/app/shared/models/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private toastserService: ToasterService
  ) {}

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      concatMap(({ user }) =>
        this.userService.registerUser(user).pipe(
          map((res: RegisterUserResp) => {
            this.toastserService.showSuccess(
              res.message || 'User created successfully!'
            );
            return registerUserOnSuccess({ user });
          }),
          catchError((error) => {
            this.toastserService.showError(
              error?.error || 'An error occured while registering user'
            );
            return of(registerUserOnError({ error, user }));
          })
        )
      )
    )
  );
}
