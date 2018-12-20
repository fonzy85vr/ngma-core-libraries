# NgmaCoreLibraries

## Description
This package containt all the base functionalities of an Angular Application.
- Authentication (by google, local server, ...)

## Usage

### Authentication Module

for usage this module, in your module file set this code:
```javascript
const _url = `${environment.urlAPIs}`;

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([{
      id: GoogleProvider.PROVIDER_ID,
      provider: new GoogleProvider('306411211066-aft61tohv2uml1rirdmmutb7e2nhleq6.apps.googleusercontent.com')
  }, {
    id: LocalProvider.PROVIDER_ID,
    provider: new LocalProvider(`${_url}/auth/login`)
}]);

  return config;
}

@NgModule({
  imports: [
    HttpClientModule,
    AuthModule.Init(getAuthServiceConfigs())
  ],
  exports: [],
  declarations: [],
  providers: [],
})
export class SharedModule { }
```

In your Service

```javascript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorizationService, GoogleProvider, LocalProvider } from 'ngma-core-libraries';

@Injectable()
export class AuthService {

    constructor(private _authService: AuthorizationService, private _http: HttpClient) {}

    googleLogin() {
        return this._authService.Login(GoogleProvider.PROVIDER_ID, { offline: true }).then(
            (userData) => {
               console.log(userData); // userData contains or GoogleAuthToken or Google User informations
            }
        );
    }

    login(username, password) {
        return this._authService.Login(LocalProvider.PROVIDER_ID, { username, password }, this._http).then(
            (userData) => {
               return userData; // userData contains your api result
            }
        );
    }
}

```