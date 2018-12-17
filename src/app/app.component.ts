import { AuthorizationService } from './../../projects/ngma-core-libraries/src/lib/authentication/Authorization.service';
import { Component } from '@angular/core';
import { GoogleProvider } from 'projects/ngma-core-libraries/src/lib/authentication/providers/GoogleProvider';
import { LocalProvider } from 'projects/ngma-core-libraries/src/lib/authentication/providers/LocalProvider';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngma-core-libraries';

  constructor(private _service: AuthorizationService, private _http: HttpClient) {}

  googleLogin() {
    this._service.Login(GoogleProvider.PROVIDER_ID, {offline: true}).then((res) => {
      console.log(res);
    });
  }

  login() {
    this._service.Login(LocalProvider.PROVIDER_ID, {username: 'username', password: 'password'}, this._http).then((res) => {
      console.log(res);
    });
  }
}
