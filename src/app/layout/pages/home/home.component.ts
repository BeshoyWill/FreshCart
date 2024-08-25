import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { Product } from '../../../shared/interfaces/product';
import { CategorysliderComponent } from '../../additions/categoryslider/categoryslider.component';
import { HomesliderComponent } from '../../additions/homeslider/homeslider.component';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { OnsalePipe } from '../../../shared/pipes/onsale.pipe';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CategorysliderComponent,
    HomesliderComponent,
    RouterLink,
    UpperCasePipe,
    CurrencyPipe,
    DatePipe,
    OnsalePipe,
    SearchPipe,
    FormsModule,
    ToastrModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  productList!: Product[];
  isLoading: boolean = false;
  date: Date = new Date();
  userWord: string = '';

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (typeof localStorage != 'undefined')
      localStorage.setItem('currentPage', '/home');
    this.getAllProducts();
  }

  getAllProducts() {
    this.isLoading = true;

    this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        console.log(this.productList);
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  addProductToCart(productId: string) {
    this._CartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.message, '', {
          timeOut: 3000,
          closeButton: true,
          progressBar: true,
          positionClass: 'toast-top-right',
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
