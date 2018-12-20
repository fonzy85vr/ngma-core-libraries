import { HttpClient } from '@angular/common/http';
import { LoginOptions } from './LoginOptions';
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

  Login(providerId: string, loginOpt: LoginOptions, http?: HttpClient) {
    return new Promise((resolve, reject) => {
      const providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.Login(loginOpt, http).then((authCode: string) => {
          resolve(authCode);
        }).catch((err: any) => {
          reject(err);
        });
      }
    });
  }

  AuthorizeToken (providerId: string, token: string, http: HttpClient) {
    return new Promise((resolve, reject) => {
      const providerObject = this.providers.get(providerId);
      if (providerObject) {
        providerObject.AuthorizeToken(token, http).then((tokens: any) => {
          resolve(tokens);
        }).catch((err: any) => {
          reject(err);
        });
      }
    });
}
}
