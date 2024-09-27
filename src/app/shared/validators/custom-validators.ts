import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { UserService } from '../services/user/user.service';
import {
  Observable,
  catchError,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  timer,
} from 'rxjs';
import { ToasterService } from '../services/toaster/toaster.service';
import { Injectable } from '@angular/core';
import { UserNameAvailabilityResp } from '../models/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CustomValidators {
  constructor(
    private userService: UserService,
    private toasterService: ToasterService
  ) {}

  public checkUserNameAvailability(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) return of(null);
      const debounceTimeInMs = 300;
      const ctrlValue = control.value;
      return timer(debounceTimeInMs).pipe(
        distinctUntilChanged(),
        switchMap(() => {
          return this.userService.checkUserName(ctrlValue).pipe(
            map((res: UserNameAvailabilityResp) => {
              if (!res.available) return { userNameTaken: true };
              return null;
            }),
            catchError((e) => {
              this.toasterService.showError(
                e?.error ||
                  'An error occurred while checking user name availability'
              );
              return of(null);
            })
          );
        })
      );
    };
  }
}
