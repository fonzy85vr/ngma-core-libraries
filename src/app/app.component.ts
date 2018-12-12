import { AuthorizationService } from './../../projects/ngma-core-libraries/src/lib/authentication/Authorization.service';
import { Component } from '@angular/core';
import { GoogleProvider } from 'projects/ngma-core-libraries/src/lib/authentication/providers/GoogleProvider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ngma-core-libraries';

  constructor(private _service: AuthorizationService) {}

  login() {
    this._service.OfflineLogin(GoogleProvider.PROVIDER_ID);
  }
}
