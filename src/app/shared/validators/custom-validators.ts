import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { UserService } from '../services/user/user.service';
import {
  Observable,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
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
      return of(control.value).pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          return this.userService.checkUserName(value).pipe(
            map((res: UserNameAvailabilityResp) => {
              if (!res.available) return { userNameTaken: true };
              return null;
            }),
            catchError((e) => {
              this.toasterService.showError(
                e?.message ||
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
