import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@services/token.service';

export const CHECK_TOKEN = new HttpContextToken(() => true);

export function withToken(include = true) {
  return new HttpContext().set(CHECK_TOKEN, include);
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(CHECK_TOKEN)) {
    const tokenService = inject(TokenService);
    const accessToken = tokenService.getToken();
    if (accessToken) {
      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });
      return next(authRequest);
    }
  }
  return next(req);
};
