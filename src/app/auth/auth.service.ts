import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

import { User } from './user.model';
import { ToasterService } from '../shared/toaster.service';
import { ResponseInterface } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private mainUrl: string = 'https://movies-api.routemisr.com';
  currentUser = new BehaviorSubject<User | null>(null);
  setTimelogout: any;

  constructor(
    private _httpClient: HttpClient,
    private _toasterService: ToasterService,
    private _router: Router
  ) {}

  submitRegister(formData: any): Observable<any> {
    return this._httpClient.post(`${this.mainUrl}/signup`, formData);
  }

  submitLogin(formData: any): Observable<ResponseInterface> {
    return this._httpClient
      .post<ResponseInterface>(`${this.mainUrl}/signin`, formData)
      .pipe(
        tap((response) => {
          this._handelSaveUserData(response);
        })
      );
  }

  autoLogin() {
    const getUserDataFromStorage: any = localStorage.getItem('userData');
    const ConvertDataToObj: any = JSON.parse(getUserDataFromStorage);

    if (!ConvertDataToObj) {
      return;
    }
    const currentUser = new User(
      ConvertDataToObj.id,
      ConvertDataToObj.firstName,
      ConvertDataToObj.lastName,
      ConvertDataToObj.age,
      ConvertDataToObj.email,
      ConvertDataToObj._token,
      new Date(ConvertDataToObj._EXPDate)
    );
    if (currentUser.token) {
      this.currentUser.next(currentUser);

      const timeEXP: number =
        new Date(ConvertDataToObj._EXPDate).getTime() - new Date().getTime();
      this.autoLogout(timeEXP);
    }
  }

  autoLogout(timeEXP: number) {
    this.setTimelogout = setTimeout(() => {
      this.logOut();
    }, timeEXP);
  }

  logOut() {
    this.currentUser.next(null);
    this._router.navigate(['/authentication']);
    localStorage.removeItem('userData');

    if (this.setTimelogout) {
      clearTimeout(this.setTimelogout);
    }
    this.setTimelogout = null;
  }

  private _handelSaveUserData(response: ResponseInterface) {
    if (response.message === 'success') {
      this._toasterService.showToastSuccess('Login Success!');
      this._router.navigate(['/notes']);

      const timeEXP: number = 10800 * 1000;
      const expireDate: Date = new Date(new Date().getTime() + timeEXP);
      let user = new User(
        response.user._id,
        response.user.first_name,
        response.user.last_name,
        response.user.age,
        response.user.email,
        response.token,
        expireDate
      );
      this.currentUser.next(user);
      localStorage.setItem('userData', JSON.stringify(user));

      this.autoLogout(timeEXP);
    } else {
      this._toasterService.showToastError(response.message);
    }
  }
}
