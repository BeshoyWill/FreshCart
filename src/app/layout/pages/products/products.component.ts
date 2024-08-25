import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private id: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      localStorage.setItem('currentPage', '/products');
    }
  }
}
