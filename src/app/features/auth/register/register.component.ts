import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Country } from 'src/app/shared/models/countries/country.interface';
import { RegisterUserResp, User } from 'src/app/shared/models/user/user.interface';
import { ToasterService } from 'src/app/shared/services/toaster/toaster.service';
import { UserService } from 'src/app/shared/services/user/user.service';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports : [CommonModule,FormsModule, ReactiveFormsModule],
templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup = new FormGroup({
    userName: new FormControl('',[Validators.required, Validators.maxLength(20), Validators.pattern('^[a-z0-9]+$')],[this.customValidators.checkUserNameAvailability()]),
    country : new FormControl('',[Validators.required])
  })

  countries: Country[] = [];

  constructor(private toasterService: ToasterService, private userService:UserService, private customValidators:CustomValidators) {}

  ngOnInit(): void {
    this.getCountries();
  }

  public onSubmit(): void {
    if (!this.userForm.valid) return;
    const { country, userName } = this.userForm.value;
    const user:User = {countryCode : country,userName}
    this.userService.registerUser(user).subscribe((res:RegisterUserResp) => {
      if (!res) return;
      this.toasterService.showSuccess(res?.message || 'User created successfully!')
    }, (err) => {
      this.toasterService.showError(err?.message || 'An error occured while registering user');
    })
  }

  public getCountries() : void {
    this.userService.getCountries().subscribe((countries:Country[]) => {
      this.countries = countries;
    })
  }

  public onCancel(): void {
    this.userForm.reset();
    this.getControl('country')?.patchValue('');
    this.userForm.updateValueAndValidity();
  }
  
  public getControl(name: string): AbstractControl | null{
    return this.userForm.get(name) ?? null;
  }
}
