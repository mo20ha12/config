import { Pipe, PipeTransform } from '@angular/core';
import { product } from './interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList:product[],term:string): product[] {
    return productList.filter(p =>p.title.toLowerCase().includes(term.toLowerCase()));
  }

}
