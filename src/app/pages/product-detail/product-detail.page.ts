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

// implements OnInit supaya bisa menggunakan ngOnInit
export class ProductDetailPage implements OnInit {
  // Tipe data bisa product atau tipe data lain
  product: Product | any = null;
  
  // Variabel untuk menampung inputan edit Two-way data binding
  // nilai awal untuk inputan selanjutnya
  editName: string = '';
  editStock: number = 0;

    // Tombol yang ditampilkan pada pop-up konfirmasi hapus
  public alertButtons = [
    {
      // Menutup pop-up tanpa menghapus data
      text: 'Batal',
      role: 'cancel'
    },
    {
      // Menghapus data yang dipilih
      text: 'Hapus',
      role: 'confirm',
      handler: () => {

        // Menjalankan fungsi hapus
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
    // Ambil ID produk dari URL
    this.route.params.subscribe(params => {

      const id = Number(params['id']);
      // Cari produk berdasarkan ID
      this.product = this.prodService.getProductById(id);

      // Isi form edit dengan data produk
      if (this.product) {
        this.editName = this.product.name;
        this.editStock = this.product.stock;
      }
    });
  }

  // Simpan perubahan Nama & Stok
  // trim : hapus spasi
  saveChanges() {

    // cek apakah data yang diinputkan valid
    if (this.editName.trim() === '') {
      alert('Nama produk tidak boleh kosong!');
      return;
    }
    if (this.editStock < 0) {
      alert('Stok tidak boleh kurang dari 0!');
      return;
    }

    // update produk
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