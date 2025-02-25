import { HttpClient } from '@angular/common/http';
import {
  Inject,
  Injectable,
  InjectionToken,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Auth } from '../../../shared/interface/auth';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BaseURL } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: WritableSignal<any> = signal(null);

  constructor(
    private _http: HttpClient,
    @Inject(PLATFORM_ID) Id: object,
    private router: Router
  ) {
    if (isPlatformBrowser(Id)) {
      if (localStorage.getItem('userToken') !== null) {
        this.decodeUserData();
      }
    }
  }

  register(formData: Auth): Observable<any> {
    return this._http.post(`${BaseURL.baseURL}/auth/signup`, formData);
  }

  login(formData: Auth) {
    return this._http.post(`${BaseURL.baseURL}/auth/signin`, formData);
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.set(null);
    this.router.navigate(['/login']);
  }

  decodeUserData() {
    const token = localStorage.getItem('userToken') || '';
    const decoded = jwtDecode(token);
    this.userData.set(decoded);
  }
}
function inject(
  PLATFORM_ID: InjectionToken<Object>
): (
  target: typeof AuthService,
  propertyKey: undefined,
  parameterIndex: 1
) => void {
  throw new Error('Function not implemented.');
}
