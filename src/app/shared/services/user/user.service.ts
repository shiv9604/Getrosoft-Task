import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  RegisterUserResp,
  User,
  UserNameAvailabilityResp,
} from '../../models/user/user.interface';
import { Country } from '../../models/countries/country.interface';
import { HostedUrlConfig } from '../../models/url-config/hosted-config';
import { environment } from 'src/environments/enviornment.dev';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public checkUserName(userName: string): Observable<UserNameAvailabilityResp> {
    const urlWithParams = `${HostedUrlConfig.CHECK_USERNAME}/${userName}`;
    return this.http
      .get(urlWithParams)
      .pipe(map((response) => response as UserNameAvailabilityResp));
  }

  public registerUser(user: User): Observable<RegisterUserResp> {
    return this.http
      .post(HostedUrlConfig.REGISTER_USER, user)
      .pipe(map((response) => response as RegisterUserResp));
  }

  public getCountries(): Observable<Country[]> {
    let url:string | null = `${environment.baseUrl}/countries.json`;
    // Toggle url to null for checking server side countried rendeing.
    url = null;
    return this.http
      .get(url || HostedUrlConfig.GET_COUNTRIES)
      .pipe(map((res) => res as Country[]));
  }
}
