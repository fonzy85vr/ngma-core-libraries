import { ILoginProvider } from './ILoginProvider';
import { Injectable } from '@angular/core';

export interface AuthServiceConfigItem {
  id: string;
  provider: ILoginProvider;
}

export class AuthServiceConfig {
  providers: Map<string, ILoginProvider> = new Map<string, ILoginProvider>();

  constructor(providers: AuthServiceConfigItem[]) {
    providers.forEach(element => {
      this.providers.set(element.id, element.provider);
    });
  }
}

@Injectable()
export class AuthorizationService {

  private providers: Map<string, ILoginProvider>;

  constructor(config: AuthServiceConfig) {
    this.providers = config.providers;

    this.providers.forEach((provider: ILoginProvider) => {
      provider.Init();
    });
  }

  OfflineLogin(providerId: string) {
    return new Promise((resolve, reject) => {
      const providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.OfflineLogin().then((authCode) => {
          resolve(authCode);
        }).catch(err => {
          reject(err);
        });
      }
    });
  }
}
