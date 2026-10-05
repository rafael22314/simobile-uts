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
export class CartPage {
  isTrxSuccess = false;
  checkoutMsg = '';

  constructor(
    public cartService: CartService,
    private trxService: TransactionService,
    private router: Router
  ) { }

  confirmCheckout() {
    const items = this.cartService.getCart();
    if (items.length > 0) {
      const trx = this.trxService.checkout(items);
      this.checkoutMsg = `No. Nota: ${trx.id}\nTotal: Rp ${trx.totalAmount.toLocaleString('id-ID')}\nStok barang telah otomatis terpotong.`;
      this.isTrxSuccess = true;
    }
  }

  finishCheckout() {
    this.isTrxSuccess = false;
    this.cartService.clearCart();
    this.router.navigate(['/transactions']);
  }
}
