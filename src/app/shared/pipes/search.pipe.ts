import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(productList: Product[], userWord: string): Product[] {
    return productList.filter((product) =>
      product.title.toLowerCase().includes(userWord.toLowerCase())
    );
    // ===========>   this is equal to === filter((product) => {return product.title.includes(userWord);
  }
}
