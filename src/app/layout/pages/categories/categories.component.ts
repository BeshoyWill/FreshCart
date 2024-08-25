import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  constructor(@Inject(PLATFORM_ID) private id: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.id)) {
      localStorage.setItem('currentPage', '/categories');
    }
  }
}
