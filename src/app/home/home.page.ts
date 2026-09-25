import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  jumlahProduk: number = 0;
  totalTransaksiHariIni: number = 0;
  produkTerlaris: string = "-";

  constructor() {}
}
