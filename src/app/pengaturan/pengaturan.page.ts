import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pengaturan',
  templateUrl: './pengaturan.page.html',
  styleUrls: ['./pengaturan.page.scss'],
  standalone: false,
})
export class PengaturanPage implements OnInit {

  darkMode: boolean = false;

  constructor() {}

  ngOnInit() {
    this.darkMode = localStorage.getItem('darkMode') === 'true';

    if (this.darkMode) {
      document.body.classList.add('dark');
    }
  }

  toggleDarkMode(event: any) {
    this.darkMode = event.detail.checked;

    if (this.darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }

}