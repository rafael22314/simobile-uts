import { Component } from '@angular/core';
import { ProductService } from '../services/product';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false
})
export class ProdukPage {

  new_name = "";
  new_category = "";
  new_buyPrice = 0;
  new_sellPrice = 0;
  new_stock = 0;

  keyword = "";

  constructor(public productService: ProductService) { }

  addProduct() {

    this.productService.addProduct(
      this.new_name,
      this.new_category,
      this.new_buyPrice,
      this.new_sellPrice,
      this.new_stock,
      ""
    );
  }

}