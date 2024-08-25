import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../../shared/services/cart/cart.service';
import { Data, Product } from '../../../shared/interfaces/loggedcart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  data!: Data;

  constructor(
    @Inject(PLATFORM_ID) private id: object,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      localStorage.setItem('currentPage', '/cart');
    }
    this.getLoggedUserCart();
  }

  getLoggedUserCart() {
    this._CartService.getLoggedCart().subscribe({
      next: (res) => {
        this.data = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProductCartCount(productId: string, count: number) {
    if (count <= 0) {
      // ^===========> call method remove product from cart
      this.deleteProductFromCart(productId);
    } else {
      this._CartService
        .updateProductCartQuantity(productId, count.toString())
        .subscribe({
          next: (res) => {
            this.data = res.data;
            console.log(res.data);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  deleteProductFromCart(productId: string) {
    this._CartService.removeProductFromCart(productId).subscribe({
      next: (res) => {
        this.data = res.data;
        console.log(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  clearCart() {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        this.data = res.data;
        console.log(this.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
