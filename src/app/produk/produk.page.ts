import { Component } from '@angular/core';
import { ProductService } from '../services/product';
// untuk pop up //
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false
})
export class ProdukPage {

  new_name = "";
  new_category = "";
  new_buyPrice = 0;
  new_sellPrice = 0;
  new_stock = 0;

  keyword = "";

  constructor(public productService: ProductService, private alertController: AlertController) { }

  addProduct() {

    this.productService.addProduct(
      this.new_name,
      this.new_category,
      this.new_buyPrice,
      this.new_sellPrice,
      this.new_stock,
      ""
    );
  }

  get filteredProducts() {
    return this.productService.listOfProduct.filter((p) =>
      p.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
      p.category.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }

  async hapusProduct(index: number){
    const alert = await this.alertController.create({
      header: 'Hapus Produk',
      message: 'Yakin ingin menghapus produk ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: () => {
            this.productService.listOfProduct.splice(index, 1);
          }
        }
      ]
    });
    await alert.present();
  }

  async editProduct(index: number) {
    let p = this.productService.listOfProduct[index];
    const alert = await this.alertController.create({
      header: 'Edit Produk',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: p.name,
          placeholder: 'Nama Produk'
        },
        {
          name: 'category',
          type: 'text',
          value: p.category,
          placeholder: 'Kategori'
        },
        {
          name: 'sellPrice',
          type: 'number',
          value: p.sellPrice
        },
        {
          name: 'stock',
          type: 'number',
          value: p.stock
        }
      ],

      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Simpan',
          handler: (data) => {
            p.name = data.name;
            p.category = data.category;
            p.sellPrice = Number(data.sellPrice);
            p.stock = Number(data.stock);
          }
        }
      ]
    });

    await alert.present();
  }


}