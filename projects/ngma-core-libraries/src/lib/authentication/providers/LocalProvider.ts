import { LoginOptions } from './../LoginOptions';
import { LoginProvider } from '../LoginProvider';
import { HttpClient } from '@angular/common/http';

export class LocalProvider extends LoginProvider {
    public static readonly PROVIDER_ID: string = 'LOCAL_PROVIDER';

    constructor(private url: string) {
        super();
    }

    Init() { }

    Logout() {
    }

    Login(loginOpt: LoginOptions, http: HttpClient) {
        return new Promise((resolve, reject) => {
            const {username, password} = loginOpt;
            http.post<any>(`${this.url}`, { username, password })
                .toPromise()
                .then(res => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
}
