import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { mainRoutes } from './app.routes';
import { en_US, es_ES, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiBaseInterceptor } from './interceptors/api-base.interceptor';
import es from '@angular/common/locales/es';

registerLocaleData(es);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(mainRoutes),
    provideNzI18n(es_ES),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([apiBaseInterceptor]))
  ]
};
