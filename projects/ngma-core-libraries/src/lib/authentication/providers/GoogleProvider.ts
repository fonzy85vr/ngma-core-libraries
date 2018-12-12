import { LoginProvider } from '../LoginProvider';

declare let gapi: any;

export class GoogleProvider extends LoginProvider {

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

    Login() {
    }

    Logout() {
    }

    OfflineLogin() {
        return new Promise((resolve, reject) => {
            this.onReady().then(() => {
                this.auth2.grantOfflineAccess({
                    scope: 'profile email'
                }).then((res) => {
                    resolve(res.code);
                }, (closed: any) => {
                    reject('User cancelled login or did not fully authorize.');
                }).catch((err: any) => {
                    reject(err);
                });
            });
        });
    }
}
