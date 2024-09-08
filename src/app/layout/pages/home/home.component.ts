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
import { debounceTime, Subject } from 'rxjs';

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
  private searchSubject = new Subject<string>();

  productList!: Product[];
  isLoading: boolean = false;
  date: Date = new Date();
  userWord: string = '';
  cartNumber!: number;

  constructor(
    private _ProductsService: ProductsService,
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) {
    // Subscribe to the searchSubject with a debounce time of 1 second
    this.searchSubject.pipe(debounceTime(2000)).subscribe((searchTerm) => {
      this.performSearch(searchTerm);
    });
  }

  ngOnInit(): void {
    if (typeof localStorage != 'undefined')
      localStorage.setItem('currentPage', '/home');
    this.getAllProducts();
  }

  onInput() {
    this.searchSubject.next(this.userWord);
  }

  clearInput() {
    this.userWord = '';
    this.performSearch(''); // Optionally perform a search with empty input
  }

  performSearch(searchTerm: string) {
    // Handle the search logic here
    console.log('Searching for:', searchTerm);
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
        this.cartNumber = res.numOfCartItems;
        this._CartService.updateCartNumber(this.cartNumber);
        console.log(this.cartNumber);
        // this._CartService.getCartNumber(res.numOfCartItems);
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
