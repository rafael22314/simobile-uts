import { Injectable } from '@angular/core';
import { Product } from '../models/pos.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Gambar default jika produk tidak memiliki gambar
  public defaultImage =
    'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=400';

  // Data produk
  private static products: Product[] = [
    {
      id: 1,
      name: 'Beras Ramos 5kg',
      category: 'Sembako',
      buyPrice: 65000,
      sellPrice: 72000,
      stock: 15,
      imageUrl:
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300',
      soldCount: 12,
    },
    {
      id: 2,
      name: 'Minyak Goreng 2L',
      category: 'Sembako',
      buyPrice: 32000,
      sellPrice: 36000,
      stock: 20,
      imageUrl: '',
      soldCount: 25,
    },
    {
      id: 3,
      name: 'Gula Pasir 1kg',
      category: 'Sembako',
      buyPrice: 15000,
      sellPrice: 17500,
      stock: 0,
      imageUrl: '',
      soldCount: 30,
    }, // Stok 0 untuk uji coba tombol disabled
    {
      id: 4,
      name: 'Kopi Kapal Api 165g',
      category: 'Minuman',
      buyPrice: 12000,
      sellPrice: 14500,
      stock: 18,
      imageUrl: '',
      soldCount: 8,
    },
    {
      id: 5,
      name: 'Teh Celup Sariwangi',
      category: 'Minuman',
      buyPrice: 7000,
      sellPrice: 9000,
      stock: 4,
      imageUrl: '',
      soldCount: 14,
    },
    {
      id: 6,
      name: 'Indomie Goreng',
      category: 'Makanan',
      buyPrice: 2800,
      sellPrice: 3500,
      stock: 100,
      imageUrl: '',
      soldCount: 85,
    },
    {
      id: 7,
      name: 'Telur Ayam 1kg',
      category: 'Sembako',
      buyPrice: 26000,
      sellPrice: 29000,
      stock: 8,
      imageUrl: '',
      soldCount: 19,
    },
    {
      id: 8,
      name: 'Kecap Manis Bango 550ml',
      category: 'Bumbu',
      buyPrice: 21000,
      sellPrice: 24500,
      stock: 12,
      imageUrl: '',
      soldCount: 6,
    },
    {
      id: 9,
      name: 'Sabun Cuci Piring 750ml',
      category: 'Kebersihan',
      buyPrice: 13000,
      sellPrice: 15500,
      stock: 0,
      imageUrl: '',
      soldCount: 11,
    }, // Stok 0
    {
      id: 10,
      name: 'Susu Kental Manis Frisian Flag',
      category: 'Minuman',
      buyPrice: 11000,
      sellPrice: 13000,
      stock: 22,
      imageUrl: '',
      soldCount: 16,
    },
  ];

  // Mengambil semua data produk
  getProducts(): Product[] {
    return ProductsService.products;
  }

  // Mencari produk berdasarkan ID
  getProductById(id: number): any {
    for (let i = 0; i < ProductsService.products.length; i++) {
      if (ProductsService.products[i].id === id) {
        return ProductsService.products[i];
      }
    }
    return null; // Jika tidak ketemu, return null
  }

  // Menambahkan produk baru
  addProduct(newProduct: any) {
    const newId = ProductsService.products.length + 1;
    ProductsService.products.push({
      id: newId,
      name: newProduct.name,
      category: newProduct.category,
      buyPrice: newProduct.buyPrice,
      sellPrice: newProduct.sellPrice,
      stock: newProduct.stock,
      imageUrl: newProduct.imageUrl,
      soldCount: 0,
    });
  }

  // Mengurangi stok setelah transaksi
  reduceStock(productId: number, qty: number) {
    for (let i = 0; i < ProductsService.products.length; i++) {
      if (ProductsService.products[i].id === productId) {
        ProductsService.products[i].stock -= qty;
        ProductsService.products[i].soldCount += qty;
        break;
      }
    }
  }

  // Mengubah data produk
  updateProduct(id: number, newName: string, newStock: number) {
    for (let i = 0; i < ProductsService.products.length; i++) {
      if (ProductsService.products[i].id === id) {
        ProductsService.products[i].name = newName;
        ProductsService.products[i].stock = newStock;
        break;
      }
    }
  }

  // Menghapus produk
  deleteProduct(id: number) {
    let temp: Product[] = [];
    for (let i = 0; i < ProductsService.products.length; i++) {
      if (ProductsService.products[i].id !== id) {
        temp.push(ProductsService.products[i]);
      }
    }
    ProductsService.products = temp;
  }
}
