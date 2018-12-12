import { GoogleProvider } from './../../projects/ngma-core-libraries/src/lib/authentication/providers/GoogleProvider';
import { AuthServiceConfig } from './../../projects/ngma-core-libraries/src/lib/authentication/Authorization.service';
import { AuthModule } from './../../projects/ngma-core-libraries/src/lib/authentication/AuthModule';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([{
      id: GoogleProvider.PROVIDER_ID,
      provider: new GoogleProvider('306411211066-aft61tohv2uml1rirdmmutb7e2nhleq6.apps.googleusercontent.com')
  }]);

  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
