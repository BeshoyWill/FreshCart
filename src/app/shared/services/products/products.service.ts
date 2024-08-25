import { HttpClient } from '@angular/common/http';
import { Environment } from '../../../base/Environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductRes } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._HttpClient.get(`${Environment.baseUrl}/api/v1/products`);
  }

  getProductById(prooductId: string): Observable<{ data: Product }> {
    return this._HttpClient.get<{ data: Product }>(
      `${Environment.baseUrl}/api/v1/products/${prooductId}`
    );
  }
}
