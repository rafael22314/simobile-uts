import { Component, OnInit } from '@angular/core';
import { ViewDidEnter, AnimationController } from '@ionic/angular';
import { ProductsService } from '../../services/products';
import { TransactionService } from '../../services/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false
})
export class DashboardPage implements OnInit, ViewDidEnter {

  constructor(
    public prodService: ProductsService,
    public trxService: TransactionService,
    private animationCtrl: AnimationController
  ) { }

  ngOnInit() {
    this.playBannerAnimation();
  }

  ionViewDidEnter() {
    this.playBannerAnimation();
  }

  // ambil total produk
  getTotalProducts(): number {
    return this.prodService.getProducts().length;
  }

  // ambil total transaksi hari ini
  getTodayTrxCount(): number {
    return this.trxService.getTodayTransactionsCount();
  }

  // ambil total omset hari ini
  getTodaySales(): number {
    return this.trxService.getTodayTotalSales();
  }

  // gambil produk paling laris
  getBestSeller(): string {
    return this.trxService.getTopSellingProduct();
  }

  // Animasi
  playBannerAnimation() {
    const banner = document.querySelector('#welcome-banner') as HTMLElement;
    if (!banner) return;
    const anim = this.animationCtrl.create()
      .addElement(banner)
      .duration(700)
      .iterations(1)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(-20px)', 'translateY(0px)');
    anim.play();
  }
}