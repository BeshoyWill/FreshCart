import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../../../base/Environment';
import { Observable } from 'rxjs';
import { CategroyRes } from '../../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _HttpClient: HttpClient) {}

  getAllCategories(): Observable<CategroyRes> {
    return this._HttpClient.get<CategroyRes>(
      `${Environment.baseUrl}/api/v1/categories`
    );
  }
}
