import { LoginOptions } from './../LoginOptions';
import { LoginProvider } from '../LoginProvider';
import { HttpClient } from '@angular/common/http';

declare let gapi: any;

export class GoogleProvider extends LoginProvider {
    AuthorizeToken(token: string, http?: import("@angular/common/http").HttpClient) {
        throw new Error("Method not implemented.");
    }

    public static readonly PROVIDER_ID: string = 'GOOGLE_PROVIDER';

    protected auth2: any;

    constructor(private clientId: string) {
        super();
    }

    Init() {
        return new Promise((resolve, reject) => {
            this.loadScript(GoogleProvider.PROVIDER_ID,
                'https://apis.google.com/js/platform.js',
                () => {
                    gapi.load('auth2', () => {
                        this.auth2 = gapi.auth2.init({
                            scope: 'profile email',
                            client_id: this.clientId
                        });

                        this.auth2.then(() => {
                            this._readyState.next(true);
                            resolve();
                        }).catch((err: any) => {
                            reject(err);
                        });
                    });
                });
        });
    }

    Logout() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                this.auth2.signOut().then(() => {
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            });
        });
    }

    Login(loginOpt: LoginOptions) {
        if (!loginOpt.offline) {
            return new Promise((resolve, reject) => {
                this.onReady().then(() => {
                    this.auth2.signIn({
                        scope: 'profile email'
                    }).then((res) => {
                        resolve(res.code);
                    }, (closed: any) => {
                    }).catch((err: any) => {
                        reject(err);
                    });
                });
            });
        } else {
            return new Promise((resolve, reject) => {
                this.onReady().then(() => {
                    this.auth2.grantOfflineAccess({
                        scope: 'profile email'
                    }).then((res) => {
                        resolve(res.code);
                    }, (closed: any) => {
                    }).catch((err: any) => {
                        reject(err);
                    });
                });
            });
        }
    }
}
