import { Injectable } from '@angular/core';
import { Transaction, CartItem } from '../models/pos.model';
import { ProductsService } from './products';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  // Menyimpan data transaksi
  private static transactions: Transaction[] = [
    {
      id: 'TRX-1001',
      date: new Date(),
      items: [
        {
          product: {
            id: 6,
            name: 'Indomie Goreng',
            category: 'Makanan',
            buyPrice: 2800,
            sellPrice: 3500,
            stock: 95,
            soldCount: 85,
          },
          qty: 5,
          subtotal: 17500,
        },
      ],
      totalAmount: 17500,
      totalProfit: 3500,
    },
  ];

  constructor(private prodService: ProductsService) {}

  // Mengambil semua transaksi
  getTransactions(): Transaction[] {
    return TransactionService.transactions;
  }

  // Melakukan proses checkout
  checkout(items: CartItem[]): Transaction {
    let totalAmount = 0;
    let totalProfit = 0;

    for (let i = 0; i < items.length; i++) {
      totalAmount += items[i].subtotal;

      let profitPerItem =
        items[i].product.sellPrice - items[i].product.buyPrice;
      totalProfit += profitPerItem * items[i].qty;

      // Mengurangi stok produk yang dibeli
      this.prodService.reduceStock(items[i].product.id, items[i].qty);
    }

    // Membuat transaksi baru
    const newTrx: Transaction = {
      id: 'TRX-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date(),
      items: items,
      totalAmount: totalAmount,
      totalProfit: totalProfit,
    };

    // Menyimpan transaksi
    TransactionService.transactions.push(newTrx);
    return newTrx;
  }

  // Menghitung jumlah transaksi hari ini
  getTodayTransactionsCount(): number {
    const today = new Date().toDateString();
    let count = 0;

    for (let i = 0; i < TransactionService.transactions.length; i++) {
      const t = TransactionService.transactions[i];

      if (new Date(t.date).toDateString() === today) {
        count++;
      }
    }

    return count;
  }

  // Menghitung total penjualan hari ini
  getTodayTotalSales(): number {
    const today = new Date().toDateString();
    let total = 0;

    for (let i = 0; i < TransactionService.transactions.length; i++) {
      const t = TransactionService.transactions[i];

      if (new Date(t.date).toDateString() === today) {
        total += t.totalAmount;
      }
    }

    return total;
  }

  // Mencari produk yang paling banyak terjual
  getTopSellingProduct(): string {
    const products = this.prodService.getProducts();

    if (products.length === 0) {
      return '-';
    }

    let top = products[0];

    for (let i = 1; i < products.length; i++) {
      if (products[i].soldCount > top.soldCount) {
        top = products[i];
      }
    }

    return top.name + ' (' + top.soldCount + ' terjual)';
  }
}
