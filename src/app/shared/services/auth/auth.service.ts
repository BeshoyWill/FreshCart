import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Environment } from '../../../base/Environment';
import {
  code,
  email,
  loginData,
  newPassword,
  registerData,
} from '../../interfaces/Data';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { decode } from 'punycode';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * behavior subject
   * sub
   * next(null)
   * getValue()
   */
  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    @Inject(PLATFORM_ID) private id: object
  ) {
    if (isPlatformBrowser(id)) {
      if (localStorage.getItem('userToken')) {
        this.decodeUserData();
        _Router.navigate([localStorage.getItem('currentPage')]);
      }
    }
  }

  signUp(data: registerData): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  signIn(data: loginData): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  decodeUserData() {
    // decode token
    // userData  = decode token
    const token = JSON.stringify(localStorage.getItem('userToken'));
    const decoded = jwtDecode(token);

    this.userData.next(decoded);

    console.log(this.userData.getValue());
  }

  logOut() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._Router.navigate(['/login']);
  }

  forgetPassword(data: email): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/v1/auth/forgotPasswords`,
      data
    );
  }

  verifyResetPassword(data: code): Observable<any> {
    return this._HttpClient.post(
      `${Environment.baseUrl}/api/v1/auth/verifyResetCode`,
      data
    );
  }

  resetNewPassword(data: newPassword): Observable<any> {
    return this._HttpClient.put(
      `${Environment.baseUrl}/api/v1/auth/resetPassword`,
      data
    );
  }
}
