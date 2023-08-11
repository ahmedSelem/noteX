import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { provideToastr } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideToastr(),
    importProvidersFrom(
      AppRoutingModule,
      HttpClientModule
    ),
  ],
});
