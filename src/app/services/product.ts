import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  listOfProduct:any[] = [];

  addProduct(
    p_name: string,
    p_category: string,
    p_buyPrice: number,
    p_sellPrice: number,
    p_stock: number,
    p_image: string
  ) {

    this.listOfProduct.push({
      name: p_name,
      category: p_category,
      buyPrice: p_buyPrice,
      sellPrice: p_sellPrice,
      stock: p_stock,
      image: p_image
    });

  }

}