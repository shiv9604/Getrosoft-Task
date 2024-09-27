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
import { Observable, takeWhile } from 'rxjs';
import { Country } from 'src/app/shared/models/countries/country.interface';
import {
  RegisterUserResp,
  User,
} from 'src/app/shared/models/user/user.interface';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

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
        Validators.pattern('^[a-z0-9]+$'),
      ],
      [this.customValidators.checkUserNameAvailability()]
    ),
    country: new FormControl('', [Validators.required]),
  });
  public countries$!: Observable<Country[]>;
  private isLive: boolean = true;

  constructor(
    private toasterService: ToasterService,
    private userService: UserService,
    private customValidators: CustomValidators,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.countries$ = this.getCountries();
  }

  public onSubmit(): void {
    if (!this.userForm.valid) return;
    const { country, userName } = this.userForm.value;
    const user: User = { countryCode: country, userName };
    this.userService
      .registerUser(user)
      .pipe(takeWhile(() => this.isLive))
      .subscribe({
        next: (res: RegisterUserResp) => {
          if (!res) return;
          this.toasterService.showSuccess(
            res?.message || 'User created successfully!'
          );
          this.onCancel();
        },
        error: (err) => {
          this.toasterService.showError(
            err?.message || 'An error occured while registering user'
          );
        },
      });
  }

  public getCountries(): Observable<Country[]> {
    return this.userService.getCountries().pipe(takeWhile(() => this.isLive));
  }

  public onCancel(): void {
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

  ngOnDestroy(): void {
    this.isLive = false;
  }
}
