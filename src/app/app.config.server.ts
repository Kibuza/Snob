import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(), HttpClient, HttpClientModule
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
