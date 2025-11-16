import { HttpContextToken } from "@angular/common/http";

export const IS_USER_ACTION = new HttpContextToken(() => false);


export const APP_CONSTANTS = {
  CURRENT_YEAR: new Date().getFullYear(),
  ROLES: {
    DIRECTOR_ROLE: 9,
    DISTRICT_ROLE: 37,
    DEPARTMENT_ROLE: 38,
    ADMIN_ROLE: 4000
  }
}