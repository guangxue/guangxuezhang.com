import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import { providePrimeNG} from "primeng/config";
import { provideRouter } from '@angular/router';
import Aura from "@primeng/themes/aura";

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura}
    }),
    provideRouter(routes),
    provideClientHydration()
  ]
};
