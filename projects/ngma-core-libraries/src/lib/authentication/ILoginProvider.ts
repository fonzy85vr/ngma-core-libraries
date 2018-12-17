import { HttpClient } from '@angular/common/http';
import { LoginOptions } from './LoginOptions';

export interface ILoginProvider {
    Init();
    Logout();
    Login(loginOpt: LoginOptions, http?: HttpClient);
}
