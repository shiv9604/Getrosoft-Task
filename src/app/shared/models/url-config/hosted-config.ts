import { environment } from 'src/environments/enviornment';
import { GlobalUrlConfig } from './url-config.interface';

export const HostedUrlConfig: GlobalUrlConfig = Object.freeze({
  GET_COUNTRIES: `${environment.baseUrl}/countries`,
  REGISTER_USER: `${environment.baseUrl}/register`,
  CHECK_USERNAME: `${environment.baseUrl}/check-username`,
});
