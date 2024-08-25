import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../base/Environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { CartRes } from '../../interfaces/cart';
import { LoggedCartRes } from '../../interfaces/loggedcart';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  userTokenHeader = {
    token: localStorage.getItem('userToken') || '', // ========> || '' this is mean that he will see the first true value and take it and of course this solve the problem if localStorage is empty which means null so it will be '' which mean true and this will be the first true value and that's how we passed this error
  };

  constructor(private _HttpClient: HttpClient) {}

  ngOnInit(): void {}

  addProductToCart(productId: string): Observable<CartRes> {
    return this._HttpClient.post<CartRes>(
      `${Environment.baseUrl}/api/v1/cart`,
      { productId: productId },
      {
        headers: this.userTokenHeader,
      }
    );
  }

  getLoggedCart(): Observable<LoggedCartRes> {
    return this._HttpClient.get<LoggedCartRes>(
      `${Environment.baseUrl}/api/v1/cart`,
      {
        headers: this.userTokenHeader,
      }
    );
  }

  updateProductCartQuantity(
    productId: string,
    count: string
  ): Observable<LoggedCartRes> {
    return this._HttpClient.put<LoggedCartRes>(
      `${Environment.baseUrl}/api/v1/cart/${productId}`,
      { count: count },
      {
        headers: this.userTokenHeader,
      }
    );
  }

  removeProductFromCart(productId: string): Observable<LoggedCartRes> {
    return this._HttpClient.delete<LoggedCartRes>(
      `${Environment.baseUrl}/api/v1/cart/${productId}`,
      {
        headers: this.userTokenHeader,
      }
    );
  }

  clearCart(): Observable<LoggedCartRes> {
    return this._HttpClient.delete<LoggedCartRes>(
      `${Environment.baseUrl}/api/v1/cart`,
      {
        headers: this.userTokenHeader,
      }
    );
  }
}
