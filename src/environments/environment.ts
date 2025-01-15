import { Constants } from "../app/shared/utils/constants";

export const environment = {
    production: true,
    BASE_API: (window.location.protocol === 'http:'
        ? 'http://'
        : 'https://')
        + window.location.host + `/${Constants.application}/api`
};