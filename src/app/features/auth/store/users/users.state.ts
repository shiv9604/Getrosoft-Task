import { Country } from 'src/app/shared/models/countries/country.interface';
import { User } from 'src/app/shared/models/user/user.interface';

export const USERS_STATE_KEY = 'users';

export interface UserState {
  registeredUsers: User[];
  errors: {
    error: any;
    user: User;
  }[];
}

export const usersState: UserState = {
  registeredUsers: [],
  errors: [],
};
