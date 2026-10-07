import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false
})

// Harus digunakan supaya bisa dipanggil di html 
export class CartPage {
  // cek apakah sudah submid belum
  isTrxSuccess = false;
  checkoutMsg = '';

  // untuk akses service
  constructor(
    public cartService: CartService,
    private trxService: TransactionService,
    private router: Router
  ) { }

  // untuk mengirim data ke service 
  confirmCheckout() {
    const items = this.cartService.getCart();
    // cek apakah ada data di list 
    if (items.length > 0) {
      const trx = this.trxService.checkout(items);
      this.checkoutMsg = `No. Nota: ${trx.id}\nTotal: Rp ${trx.totalAmount.toLocaleString('id-ID')}\nStok barang telah otomatis terpotong.`;
      this.isTrxSuccess = true;
    }
  }

  
  // untuk pinda form 
  finishCheckout() {
    this.isTrxSuccess = false;
    this.cartService.clearCart();
    this.router.navigate(['/transactions']);
  }
}
