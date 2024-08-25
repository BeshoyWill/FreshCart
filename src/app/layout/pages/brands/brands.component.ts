import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  constructor(@Inject(PLATFORM_ID) private id: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      localStorage.setItem('currentPage', '/brands');
    }
  }
}
