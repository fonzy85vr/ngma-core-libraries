import { GoogleProvider } from './../../projects/ngma-core-libraries/src/lib/authentication/providers/GoogleProvider';
import { AuthServiceConfig } from './../../projects/ngma-core-libraries/src/lib/authentication/Authorization.service';
import { AuthModule } from './../../projects/ngma-core-libraries/src/lib/authentication/AuthModule';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LocalProvider } from 'projects/ngma-core-libraries/src/lib/authentication/providers/LocalProvider';
import { HttpClientModule } from '@angular/common/http';

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([{
      id: GoogleProvider.PROVIDER_ID,
      provider: new GoogleProvider('306411211066-aft61tohv2uml1rirdmmutb7e2nhleq6.apps.googleusercontent.com')
  }, {
    id: LocalProvider.PROVIDER_ID,
    provider: new LocalProvider('http://localhost')
}]);

  return config;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AuthModule.Init(getAuthServiceConfigs())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
