import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartRes } from '../../interfaces/cart';
import { LoggedCartRes } from '../../interfaces/loggedcart';
import { isPlatformBrowser } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  userTokenHeader: any; // ========> || '' this is mean that he will see the first true value and take it and of course this solve the problem if localStorage is empty which means null so it will be '' which mean true and this will be the first true value and that's how we passed this error

  cartNumber: BehaviorSubject<number>;

  constructor(
    private _HttpClient: HttpClient,
    @Inject(ToastrService) private _ToastrService: ToastrService,
    @Inject(PLATFORM_ID) private _PLATFORM_ID: object
  ) {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.userTokenHeader = {
        token: localStorage.getItem('userToken') || '',
      };

      // Initialize the cart number from localStorage or default to 0
      const storedCartNumber = localStorage.getItem('cartNumber');
      this.cartNumber = new BehaviorSubject<number>(
        storedCartNumber ? +storedCartNumber : 0
      );
    } else {
      this.cartNumber = new BehaviorSubject<number>(0);
    }
  }

  // Get observable to cart number
  getCartNumber(): Observable<number> {
    return this.cartNumber.asObservable();
  }

  // Method to update cart number
  updateCartNumber(newNumber: number): void {
    this.cartNumber.next(newNumber);

    // Persist the cart number to localStorage
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('cartNumber', newNumber.toString());
    }
  }

  addProductToCart(productId: string): Observable<CartRes> {
    return this._HttpClient.post<CartRes>(
      `${Environment.baseUrl}/api/v1/cart`,
      { productId: productId }
    );
  }

  getLoggedCart(): Observable<LoggedCartRes> {
    return this._HttpClient.get<LoggedCartRes>(
      `${Environment.baseUrl}/api/v1/cart`
    );
  }

  updateProductCartQuantity(
    productId: string,
    count: string
  ): Observable<LoggedCartRes> {
    return this._HttpClient.put<LoggedCartRes>(
      `${Environment.baseUrl}/api/v1/cart/${productId}`,
      { count: count }
    );
  }

  removeProductFromCart(productId: string): Observable<LoggedCartRes> {
    return this._HttpClient.delete<LoggedCartRes>(
      `${Environment.baseUrl}/api/v1/cart/${productId}`
    );
  }

  clearCart(): Observable<LoggedCartRes> {
    return this._HttpClient.delete<LoggedCartRes>(
      `${Environment.baseUrl}/api/v1/cart`
    );
  }
}
