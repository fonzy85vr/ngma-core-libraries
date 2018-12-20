import { LoginOptions } from './LoginOptions';
import { BehaviorSubject } from 'rxjs';
import { ILoginProvider } from './ILoginProvider';
import { HttpClient } from '@angular/common/http';

export abstract class LoginProvider implements ILoginProvider {
    constructor() {}

    protected _readyState: BehaviorSubject<boolean> = new BehaviorSubject(false);

    abstract Init();
    abstract Logout();
    abstract Login(loginOpt: LoginOptions, http?: HttpClient);
    abstract AuthorizeToken(token: string, http?: HttpClient);

    protected onReady(): Promise<void> {
        return new Promise((resolve, reject) => {
            this._readyState.subscribe((isReady) => {
                if (isReady) {
                    resolve();
                }
            });
        });
    }

    loadScript(id: string, src: string, onload: any, async = true): void {
        if (document.getElementById(id)) { return; }

        const signInJS = document.createElement('script');
        signInJS.async = async;
        signInJS.src = src;
        signInJS.onload = onload;
        document.head.appendChild(signInJS);
    }
}
