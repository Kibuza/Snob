import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { firebaseProviders } from '../../firebase.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    //Este es el provider para los guards de las rutas
    provideAnimationsAsync(),
    firebaseProviders //Viene de firebase.config
  ],
};
