import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { Auth } from "../../utils/interfaces/auth.interface";
import { Constants } from "../../utils/constants";

const storageKey = `auth_${Constants.application}`;

const handleAuthError = (err: HttpErrorResponse, router: Router): Observable<any> => {
  if (err.status === 403 || err.status === 0) {
    localStorage.removeItem(storageKey);
    router.navigate(["/login"]);
    return of(err.message);
  }
  throw err;
};

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);
  const auth: Auth | null = JSON.parse(localStorage.getItem(storageKey)!);

  if (auth && auth.token) {
    request = request.clone({
      setHeaders: {
        Authorization: "Bearer " + auth.token,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  } else {
    request = request.clone();
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => handleAuthError(error, router))
  );
};