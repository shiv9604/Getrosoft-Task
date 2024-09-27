import { environment } from "src/environments/enviornment.dev";
import { GlobalUrlConfig } from "./url-config.interface";

export const DevUrlConfig:Partial<GlobalUrlConfig> = Object.freeze({
        GET_COUNTRIES: `${environment.baseUrl}/countries.json`,
})