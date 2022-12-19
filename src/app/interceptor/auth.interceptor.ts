import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
 
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { AppUtility } from './apputitlity';
 

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private apiService: ApiService , private router : Router , private _utility : AppUtility) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add auth header with jwt if account is logged in and request is to the api url
    let url = environment.api_baseUrl;
    if ((request.url === url + 'User/login' && request.method === 'POST') || (request.url === url + 'User/OTP' && request.method === 'PUT')) {
      return next.handle(request);
    }

    else {
      var token: any = JSON.parse(localStorage.getItem('UserObject'));
      const isLoggedIn = (token) ? true : false;
      const isApiUrl = request.url.startsWith(environment.api_baseUrl);
      if (isLoggedIn && isApiUrl) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${token.token}` }
        });
      }
      return next.handle(request)
      .pipe(catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.router.navigate(['/auth/login']);
          }
          if (err.status === 400) {
            if (Object.values(err.error)[0][0]) {
              this.apiService.showMessage(err.error.message || err.statusText , 'error');
              this._utility.loader(false);
            }
            else if(err.error) {
              this.apiService.showMessage(err.error.message || err.statusText , 'error');
              this._utility.loader(false);
            }
          }
          if (err.status === 500) {
            if (err.error) {
              this.apiService.showMessage(err.error.message || err.statusText , 'error');
              this._utility.loader(false);
            }
          }
    
          if(err.status === 415){
            if (err.error) {
              this.apiService.showMessage(err.error.message || err.statusText , 'error');
              this._utility.loader(false);
              console.log(err.error);
            }
          }
      return throwError(err);
    }));
    }
  }
}
