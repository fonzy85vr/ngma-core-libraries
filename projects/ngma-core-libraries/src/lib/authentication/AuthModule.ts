import { AuthorizationService, AuthServiceConfig } from './Authorization.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
      CommonModule
    ],
    exports: [],
    declarations: [],
    providers: [
      AuthorizationService
    ],
  })
export class AuthModule {
    Init(config: AuthServiceConfig) {
        return {
            ngModule: AuthModule,
            providers: [
              AuthorizationService,
              {
                provide: AuthServiceConfig,
                useValue: config
              }
            ]
          };
    }
}
