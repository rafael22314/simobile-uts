import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage implements OnInit {
  // Menyimpan status dark mode
  isDarkMode = false;

  ngOnInit() {
    // Cek apakah dark mode sedang aktif
    this.isDarkMode = document.body.classList.contains('dark');
  }

  // Mengubah tema light mode / dark mode
  toggleTheme() {
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}
