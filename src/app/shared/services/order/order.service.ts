import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { address } from './../../interfaces/Data';
import { Observable } from 'rxjs';
import { checkout } from '../../interfaces/checkout';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  // private readonly _HttpClient = inject(HttpClient);

  constructor(private _HttpClient: HttpClient) {}

  checkout(cartId: string, data: address): Observable<checkout> {
    return this._HttpClient.post<checkout>(
      `${Environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${Environment.baseUrlWebsite}`,
      {
        shippingAdress: data,
      }
    );
  }
}
