import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {
  isDarkMode = false;

  ngOnInit() {
    this.isDarkMode = document.body.classList.contains('dark');
  }

  toggleTheme() {
    document.body.classList.toggle('dark', this.isDarkMode);
  }
}
