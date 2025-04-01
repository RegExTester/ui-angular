import { enableProdMode } from '@angular/core';

import { AppRoutes } from './app/app.routing';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(AppRoutes, withPreloading(PreloadAllModules), withDebugTracing())
  ]
});
