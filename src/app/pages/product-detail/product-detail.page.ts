import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/pos.model';
import { ProductsService } from '../../services/products';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false
})
export class ProductDetailPage implements OnInit {
  product: Product | any = null;

  // Variabel untuk menampung inputan edit (Two-way data binding Week 03)
  editName: string = '';
  editStock: number = 0;

  // Tombol untuk pop-up konfirmasi hapus (Week 06 Slide 20)
  public alertButtons = [
    {
      text: 'Batal',
      role: 'cancel'
    },
    {
      text: 'Hapus',
      role: 'confirm',
      handler: () => {
        this.confirmDelete();
      }
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public prodService: ProductsService
  ) { }

  ngOnInit() {
    // Membaca ID dari URL parameter (Week 05 Slide 23-25)
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.product = this.prodService.getProductById(id);

      if (this.product) {
        this.editName = this.product.name;
        this.editStock = this.product.stock;
      }
    });
  }

  // Simpan perubahan Nama & Stok
  saveChanges() {
    if (this.editName.trim() === '') {
      alert('Nama produk tidak boleh kosong!');
      return;
    }

    if (this.editStock < 0) {
      alert('Stok tidak boleh kurang dari 0!');
      return;
    }

    this.prodService.updateProduct(this.product.id, this.editName, this.editStock);
    alert('Data produk berhasil diperbarui!');
    this.router.navigate(['/tabs/products']);
  }

  // Hapus produk
  confirmDelete() {
    this.prodService.deleteProduct(this.product.id);
    alert('Produk berhasil dihapus!');
    this.router.navigate(['/tabs/products']);
  }
}