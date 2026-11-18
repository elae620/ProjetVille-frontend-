import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth';

// URL pour lesquelles on n'ajoute PAS le token
const exclude_array: string[] = ['/login', '/register', '/verifyEmail'];

function toExclude(url: string): boolean {
  return exclude_array.some(path => url.includes(path));
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!toExclude(req.url)) {
    const jwt = authService.getToken();
    if (jwt) {
      const tokenHeader = jwt.startsWith('Bearer ') ? jwt : 'Bearer ' + jwt;
      const reqWithToken = req.clone({
        setHeaders: { Authorization: tokenHeader }
      });
      return next(reqWithToken);
    }
  }
  return next(req);
};