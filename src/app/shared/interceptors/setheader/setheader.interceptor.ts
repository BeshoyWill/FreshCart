import { HttpInterceptorFn } from '@angular/common/http';

export const setheaderInterceptor: HttpInterceptorFn = (req, next) => {
  if (typeof localStorage !== 'undefined') {
    let userHeaderToken = {
      token: localStorage.getItem('userToken') || '',
    };

    if (
      req.url.includes('cart') ||
      req.url.includes('wishlist') ||
      req.url.includes('order')
    ) {
      req = req.clone({
        setHeaders: userHeaderToken,
      });
    }
  }

  return next(req);
};
