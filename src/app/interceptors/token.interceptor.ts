import { HttpContext, HttpContextToken, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '@services/token.service';
import { catchError, throwError } from 'rxjs';

export const CHECK_TOKEN = new HttpContextToken(() => true);
export const REFRESH_TOKEN = new HttpContextToken(() => false);

export function withToken(include = true) {
  return new HttpContext().set(CHECK_TOKEN, include);
}

export function withRefreshToken(include = true) {
  return new HttpContext().set(REFRESH_TOKEN, include);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (req.context.get(REFRESH_TOKEN)) {
    const refreshToken = tokenService.getRefreshToken();
    if (refreshToken && tokenService.isValidRefreshToken()) {
      const refreshRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${refreshToken}`)
      });
      return next(refreshRequest);
    } else {
      // If refresh token is invalid, redirect to login
      console.log('Invalid refresh token, redirecting to login');
      tokenService.removeToken();
      tokenService.removeRefreshToken();
      router.navigate(['/login']);
      return next(req);
    }
  }

  if (req.context.get(CHECK_TOKEN)) {
    const accessToken = tokenService.getToken();

    if (accessToken && tokenService.isValidToken()) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          // Handle 401 Unauthorized or 400 Bad Request with specific error messages
          if ((error.status === 401 || error.status === 400) &&
              (error.error?.name === 'EntityNotFoundError' ||
              error.error?.message?.includes('token'))) {
            console.log('Invalid token or user not found, redirecting to login');
            tokenService.removeToken();
            router.navigate(['/login']);
          }
          return throwError(() => error);
        })
      );
    }
  }
  return next(req);
};
