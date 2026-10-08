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
  standalone: false,
})
export class ProductsPage implements OnInit {
  // Kata kunci pencarian
  searchKeyword: string = '';

  // Daftar produk yang ditampilkan
  filteredProducts: Product[] = [];

  constructor(
    public prodService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private animationCtrl: AnimationController,
  ) {}

  // Dijalankan saat halaman dibuka pertama kali
  ngOnInit() {
    this.loadProducts();
  }

  // Refresh data saat kembali ke halaman mengupdate data paling baru
  ionViewDidEnter() {
    this.loadProducts();
  }

  // Mengambil semua data produk
  loadProducts() {
    this.filteredProducts = [...this.prodService.getProducts()];
  }

  // Mencari produk berdasarkan nama atau kategori
  onSearch() {
    const val = (this.searchKeyword || '').toLowerCase().trim();

    this.filteredProducts = this.prodService
      .getProducts()
      .filter(
        (p) =>
          p.name.toLowerCase().includes(val) ||
          p.category.toLowerCase().includes(val),
      );
  }

  // Pindah ke halaman detail produk
  goToDetail(productId: number) {
    this.router.navigate(['/product-detail', productId]);
  }

  // Menambahkan produk ke keranjang
  addToCart(product: Product) {
    const added = this.cartService.addToCart(product);
    if (added) {
      // Menjalankan animasi tombol saat produk berhasil ditambahkan
      const btn = document.querySelector(
        `#btn-add-${product.id}`,
      ) as HTMLElement; //HTMLElement agar animasi dapat jalan di page html
      if (btn) { //jika button di klik maka animasi akan dijalankan
        this.animationCtrl
          .create()
          .addElement(btn)
          .duration(300)
          .keyframes([
            { offset: 0, transform: 'scale(1)' },
            { offset: 0.5, transform: 'scale(1.3)' },
            { offset: 1, transform: 'scale(1)' },
          ])
          .play();
      }
    }
  }
}
