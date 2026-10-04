import { Injectable } from '@angular/core';
import { CartItem, Product } from '../models/pos.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cart: CartItem[] = [];

    getCart(): CartItem[] {
        return this.cart;
    }

    addToCart(product: Product): boolean {
        if (product.stock <= 0) {
            return false;
        }
        let found = false;
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].product.id === product.id) {
                found = true;
                if (this.cart[i].qty < product.stock) {
                    this.cart[i].qty++;
                    this.cart[i].subtotal = this.cart[i].qty * this.cart[i].product.sellPrice;
                    return true;
                }
                return false; // Stok tidak mencukupi
            }
        }
        // Jika belum ada di keranjang, masukkan barang baru
        if (!found) {
            this.cart.push({
                product: product,
                qty: 1,
                subtotal: product.sellPrice
            });
            return true;
        }
        return false;
    }

    decreaseQty(productId: number) {
        let tempCart: CartItem[] = [];
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].product.id === productId) {
                if (this.cart[i].qty > 1) {
                    this.cart[i].qty--;
                    this.cart[i].subtotal = this.cart[i].qty * this.cart[i].product.sellPrice;
                    tempCart.push(this.cart[i]);
                }
                // Kalau qty tinggal 1, tidak di-push (otomatis terhapus)
            } else {
                tempCart.push(this.cart[i]);
            }
        }
        this.cart = tempCart;
    }

    removeFromCart(productId: number) {
        let tempCart: CartItem[] = [];
        for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].product.id !== productId) {
                tempCart.push(this.cart[i]);
            }
        }
        this.cart = tempCart;
    }

    getTotalPrice(): number {
        let total = 0;
        for (let i = 0; i < this.cart.length; i++) {
            total += this.cart[i].subtotal;
        }
        return total;
    }

    getTotalItemsCount(): number {
        let total = 0;
        for (let i = 0; i < this.cart.length; i++) {
            total += this.cart[i].qty;
        }
        return total;
    }

    clearCart() {
        this.cart = [];
    }
}