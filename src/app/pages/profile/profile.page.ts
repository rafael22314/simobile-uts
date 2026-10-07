import { Component } from '@angular/core';
import { ViewDidEnter, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements ViewDidEnter {

  // Controller untuk membuat animasi
  constructor(private animationCtrl: AnimationController) { }

  // Dijalankan saat halaman profile selesai ditampilkan
  ionViewDidEnter() {

    // Mengambil card profile dari HTML
    const card = document.querySelector('#profile-card') as HTMLElement;

    if (card) {

      // Menjalankan animasi muncul pada card
      this.animationCtrl.create()
        .addElement(card)
        .duration(600)
        .fromTo('transform', 'scale(0.8)', 'scale(1)')
        .fromTo('opacity', '0', '1')
        .play();
    }
  }
}