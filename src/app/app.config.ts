import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withFetch,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthGuard } from './auth.guard';
// import { TokenInterceptorService } from './services/auth/token-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withFetch()),
    //Este es el provider para los guards de las rutas
    AuthGuard,
    //Este el provider que hace que funcione el interceptor de tokens
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: TokenInterceptorService,
    //   multi: true,
    // },
  ],
};
