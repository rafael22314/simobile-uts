import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { Product } from '../../models/pos.model';
import { ProductsService } from '../../services/products';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: false
})
export class ProductsPage implements OnInit {
  searchKeyword: string = '';
  filteredProducts: Product[] = [];

  constructor(
    public prodService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  ionViewDidEnter() {
    this.loadProducts();
  }

  loadProducts() {
    this.filteredProducts = [...this.prodService.getProducts()];
  }

  onSearch() {
    const val = (this.searchKeyword || '').toLowerCase().trim();
    this.filteredProducts = this.prodService.getProducts().filter(p =>
      p.name.toLowerCase().includes(val) ||
      p.category.toLowerCase().includes(val)
    );
  }

  goToDetail(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }

  addToCart(product: Product) {
    const added = this.cartService.addToCart(product);
    if (added) {
      const btn = document.querySelector(`#btn-add-${product.id}`) as HTMLElement;
      if (btn) {
        this.animationCtrl.create()
          .addElement(btn)
          .duration(300)
          .keyframes([
            { offset: 0, transform: 'scale(1)' },
            { offset: 0.5, transform: 'scale(1.3)' },
            { offset: 1, transform: 'scale(1)' }
          ])
          .play();
      }
    }
  }
}