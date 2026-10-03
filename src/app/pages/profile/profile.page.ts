import { Component } from '@angular/core';
import { ViewDidEnter, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements ViewDidEnter {
  constructor(private animationCtrl: AnimationController) { }

  ionViewDidEnter() {
    const card = document.querySelector('#profile-card') as HTMLElement;
    if (card) {
      this.animationCtrl.create()
        .addElement(card)
        .duration(600)
        .fromTo('transform', 'scale(0.8)', 'scale(1)')
        .fromTo('opacity', '0', '1')
        .play();
    }
  }
}