import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '../../../shared/interface/auth';
import { Observable } from 'rxjs';
import { BaseURL } from '../../constant/baseURL';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  constructor(private http: HttpClient) {}

  verifyEmail(payload: Auth): Observable<any> {
    return this.http.post(`${BaseURL.baseURL}/auth/forgotPasswords`, payload);
  }
  verifyCode(payload: Auth): Observable<any> {
    return this.http.post(`${BaseURL.baseURL}/auth/verifyResetCode`, payload);
  }
  resetPassword(payload: Auth): Observable<any> {
    return this.http.put(`${BaseURL.baseURL}/auth/resetPassword`, payload);
  }
}
