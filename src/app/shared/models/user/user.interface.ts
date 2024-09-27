export interface User {
  countryCode: string;
  userName: string;
}

export interface UserNameAvailabilityResp {
  available: boolean;
  message: string;
}

export interface RegisterUserResp {
  message: string;
  errors: boolean;
}
