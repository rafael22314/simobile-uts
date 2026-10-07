import { Injectable } from '@angular/core';
import { CartItem, Product } from '../models/pos.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Menyimpan daftar barang dalam keranjang
  private cart: CartItem[] = [];

  // Mengambil isi keranjang
  getCart(): CartItem[] {
    return this.cart;
  }

  // Menambahkan barang ke keranjang
  addToCart(product: Product): boolean {
    // Cek stok barang
    if (product.stock <= 0) {
      return false;
    }

    let found = false;

    // Cek apakah barang sudah ada di keranjang
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].product.id === product.id) {
        found = true;

        // Tambah jumlah barang jika stok masih tersedia
        if (this.cart[i].qty < product.stock) {
          this.cart[i].qty++;
          this.cart[i].subtotal =
            this.cart[i].qty * this.cart[i].product.sellPrice;

          return true;
        }

        return false;
      }
    }

    // Tambah barang baru ke keranjang
    if (!found) {
      this.cart.push({
        product: product,
        qty: 1,
        subtotal: product.sellPrice,
      });

      return true;
    }

    return false;
  }

  // Mengurangi jumlah barang di keranjang
  decreaseQty(productId: number) {
    let tempCart: CartItem[] = [];

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].product.id === productId) {
        if (this.cart[i].qty > 1) {
          this.cart[i].qty--;
          this.cart[i].subtotal =
            this.cart[i].qty * this.cart[i].product.sellPrice;

          tempCart.push(this.cart[i]);
        }
      } else {
        tempCart.push(this.cart[i]);
      }
    }

    this.cart = tempCart;
  }

  // Menghapus barang dari keranjang
  removeFromCart(productId: number) {
    let tempCart: CartItem[] = [];

    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].product.id !== productId) {
        tempCart.push(this.cart[i]);
      }
    }

    this.cart = tempCart;
  }

  // Menghitung total harga belanja
  getTotalPrice(): number {
    let total = 0;

    for (let i = 0; i < this.cart.length; i++) {
      total += this.cart[i].subtotal;
    }

    return total;
  }

  // Menghitung total jumlah barang
  getTotalItemsCount(): number {
    let total = 0;

    for (let i = 0; i < this.cart.length; i++) {
      total += this.cart[i].qty;
    }

    return total;
  }

  // Mengosongkan keranjang
  clearCart() {
    this.cart = [];
  }
}
