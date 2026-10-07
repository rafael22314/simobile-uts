import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.page.html',
  styleUrls: ['./product-form.page.scss'],
  standalone: false,
})
export class ProductFormPage implements OnInit {
  // Form tambah produk
  productForm: FormGroup;

  // Kontrol popup sukses
  isSuccessAlertOpen: boolean = false;

  // Daftar kategori produk
  categories: string[] = [
    'Sembako',
    'Makanan',
    'Minuman',
    'Bumbu',
    'Kebersihan',
  ];

  constructor(
    private fb: FormBuilder,
    private prodService: ProductsService,
    private router: Router,
  ) {
    // Membuat form dan validasi input
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['Sembako', Validators.required],
      buyPrice: [0, [Validators.required, Validators.min(100)]],
      sellPrice: [0, [Validators.required, Validators.min(100)]],
      stock: [1, [Validators.required, Validators.min(0)]],
      imageUrl: [''],
    });
  }

  ngOnInit() {}

  // Menyimpan produk baru
  saveProduct() {
    if (this.productForm.valid) {
      this.prodService.addProduct(this.productForm.value);

      // Tampilkan popup sukses
      this.isSuccessAlertOpen = true;
    } else {
      alert('Mohon isi semua data dengan benar!');
    }
  }

  // Kembali ke halaman produk setelah popup ditutup
  handleAlertDismiss() {
    this.isSuccessAlertOpen = false;
    this.router.navigate(['/tabs/products']);
  }
}
