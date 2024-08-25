import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Product } from '../../../shared/interfaces/product';
import { response } from 'express';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;

  constructor(
    private _ProductsService: ProductsService,
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getProductById();
  }

  getProductById() {
    let id!: string;

    this._ActivatedRoute.params.subscribe({
      next: (res) => {
        id = res['id'];
        console.log(res['id']);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this._ProductsService.getProductById(id).subscribe({
      next: (res) => {
        this.product = res.data;
        console.log(this.product);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
