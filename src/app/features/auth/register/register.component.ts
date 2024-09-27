import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, takeWhile } from 'rxjs';
import { Country } from 'src/app/shared/models/countries/country.interface';
import {
  User,
} from 'src/app/shared/models/user/user.interface';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { getCountries } from '../store/countries/countries.actions';
import { selectCountries } from '../store/countries/countries.selectors';
import { selectRegisteredUsers } from '../store/users/users.selectors';
import { registerUser } from '../store/users/users.actions';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit, OnDestroy {
  public userForm: FormGroup = new FormGroup({
    userName: new FormControl(
      '',
      [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern('^[a-z0-9]+$')
      ],
      // Interacting with server without ngRx flow due to its isolated nature & cannot cache it due to its dynamic nature required.
      [this.customValidators.checkUserNameAvailability()]
    ),
    country: new FormControl('', [Validators.required]),
  });
  public countries$!: Observable<Country[]>;
  private isLive: boolean = true;
  private registeredUsers!: User[];

  constructor(
    private customValidators: CustomValidators,
    private cdRef: ChangeDetectorRef,
    private store: Store,
    private toasterService:ToasterService
  ) {}

  ngOnInit(): void {
    this.getCountries();
    this.getAlreadyRegisteredUsers();
  }

  public onSubmit(): void {
    if (!this.userForm.valid) return;
    const { country, userName } = this.userForm.value;
    const user: User = { countryCode: country, userName };
    const alreadyExists = this.registeredUsers?.find(existingUser => existingUser.userName == user.userName);
    if (alreadyExists) {
      this.toasterService.showWarning('User Already Exists!');
      return;
    }
    this.store.dispatch(registerUser({ user }));
  }

  // Loading countries through hosted api initially, hosted api limits may exceed.
  // Toggle the commented url = null assignment in UserService > getCountries() for fetching clientside countries not to runout hosted api limit.
  public getCountries(): void {
    this.store.dispatch(getCountries());
    this.countries$ = this.store.select(selectCountries);
  }

  public onReset(): void {
    this.userForm.reset();
    this.getControl('country')?.patchValue('');
    this.userForm.updateValueAndValidity();
    this.cdRef.markForCheck();
  }

  public getControl(name: string): AbstractControl | null {
    return this.userForm.get(name) ?? null;
  }

  public trackByCountryCode(index: number, country: Country): string {
    return country.code;
  }

  // Function detects user registration and resets form.
  public getAlreadyRegisteredUsers(): void {
    this.store.select(selectRegisteredUsers).pipe(takeWhile(()=>this.isLive)).subscribe((users: User[]) => {
      this.registeredUsers = users;
      if (users?.length > this.registeredUsers?.length) {
        this.onReset();
      }
    });
  }

  ngOnDestroy(): void {
    this.isLive = false;
  }
}
