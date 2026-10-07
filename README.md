# SIMOBILE - Prototipe Aplikasi Kasir Toko Makmur Jaya
 UTS Gasal 2026/2027 - Hybrid Mobile Programming  

---

## Tim Pengembang
* **Rafael Brilliant** (NRP: 160424058)
* **Bryan Octavius** (NRP: 160424064)
* **Vuai Arlene Harianto** (NRP: 160424043)
* **Kenny Widyanto** (NRP: 160424038)

---

## 1. Cara Instalasi

Ikuti langkah-langkah instalasi berikut untuk mempersiapkan proyek:

1. **Hapus folder cache `.angular`** (wajib dilakukan untuk mencegah error cache build antar-mesin):
   * **Windows (PowerShell):**
     ```powershell
     Remove-Item -Recurse -Force .angular -ErrorAction SilentlyContinue
     ```
   * **Manual**
     ```bash
     hapus .angular lalu ionic serve pastikan sudah menginstall ionic versi 7
     ```

2. **Bersihkan cache NPM (opsional jika ada kendala cache):**
   ```bash
   npm cache clean --force
   ```

3. **Install seluruh dependensi awal:**
   ```bash
   npm install
   ```

4. **Install versi Ionic Angular yang sesuai:**
   ```bash
   npm install @ionic/angular@7.8.0 --save
   ```

---

## 2. Cara Menjalankan Aplikasi

1. **Jalankan development server menggunakan Ionic CLI:**
   ```bash
   ionic serve
   ```

2. **Akses aplikasi di browser:**
   * Buka browser dan arahkan ke alamat: `http://localhost:8100`
   * Tekan tombol `F12` (atau klik kanan > *Inspect*) pada browser, lalu aktifkan mode tampilan mobile/device toolbar untuk simulasi tampilan HP terbaik.

---

## 3. Daftar Fitur yang Berhasil Diimplementasikan

Berikut daftar fitur yang telah berhasil diimplementasikan sesuai ketentuan teknis UTS dan materi perkuliahan:

1. **Struktur Navigasi Tab & Side Drawer:**
   * Navigasi utama menggunakan 4 tab: **Dashboard**, **Produk**, **Keranjang**, dan **Profil**.
   * Dibungkus menu geser samping (*Side Drawer*) menggunakan `ion-menu` dengan fitur `auto-hide` untuk menu **Dashboard**, **Riwayat Transaksi**, **Pengaturan & Tema**, dan **Tentang SIMOBILE**.

2. **Halaman Dashboard Informatif:**
   * Menampilkan ringkasan data real-time: total varian produk, total nota transaksi hari ini, total omset harian, dan produk paling laris (*best seller*).
   * Data dihitung dan diambil langsung dari Service menggunakan teknik *Interpolation Binding* `{{ }}`.

3. **Pencarian Produk Real-Time:**
   * Pencarian barang di katalog yang langsung memfilter daftar barang secara otomatis saat mengetik tanpa memerlukan tombol submit.
   * Diimplementasikan menggunakan *Two-Way Data Binding* `[(ngModel)]`.

4. **Detail Produk via Route Parameter:**
   * Mengarahkan ke halaman detail produk dinamis berdasarkan ID pada URL (`/product-detail/:id`).
   * Menangkap parameter rute menggunakan `ActivatedRoute` (`this.route.params.subscribe`) serta menampilkan sisa stok, harga beli (modal), harga jual, dan estimasi keuntungan bersih per item.

5. **Property & Event Binding:**
   * Fallback gambar produk: Menampilkan gambar default secara otomatis jika produk belum memiliki foto via *Property Binding* `[src]`.
   * Tombol *"Tambah ke Keranjang"* otomatis nonaktif/ter-disable jika stok barang habis via *Property Binding* `[disabled]="product.stock === 0"`.
   * Aksi penambahan item dan interaksi tombol ditangani dengan *Event Binding* `(click)`.

6. **Form Tambah Produk dengan Validasi:**
   * Form penambahan data barang berbasis **Reactive Form** (`FormGroup`, `Validators`).
   * Dilengkapi validasi lengkap: nama wajib diisi (minimal 3 karakter), kategori dropdown, harga beli > 0, harga jual > 0, dan stok tidak boleh negatif.
   * Menampilkan pesan error yang informatif di bawah setiap field yang salah, dan tombol submit terkunci otomatis jika form belum valid.

7. **Arsitektur 3 Angular Service Terpisah:**
   * Logika data dipisahkan secara modular ke dalam 3 service independen (*Single Source of Truth*):
     * `ProductsService`: Pengelolaan inventaris produk (termasuk 10 data dummy produk awal) dan pemotongan stok.
     * `CartService`: Pengelolaan keranjang belanja, penyesuaian kuantitas, dan hitung total harga.
     * `TransactionService`: Pencatatan transaksi belanja, hitung omset hari ini, dan analisa produk terlaris.

8. **Simulasi Keranjang & Checkout:**
   * Halaman kasir/keranjang yang menghitung subtotal dan total tagihan belanja secara otomatis.
   * Tombol *"Konfirmasi Transaksi"* yang memicu pencatatan nota transaksi, pemotongan stok produk secara otomatis, dan memunculkan pop-up `ion-alert` konfirmasi.

9. **Riwayat Transaksi Penjualan Interaktif:**
   * Menampilkan daftar transaksi yang pernah dilakukan menggunakan komponen `ion-accordion-group` dan `ion-accordion`.
   * Setiap nota dapat diklik/di-expand untuk melihat rincian item belanjaan serta keuntungan bersih transaksi.

10. **Custom Theme & Dark Mode:**
    * Kustomisasi palet warna tema Ionic di `src/theme/variables.scss` menyesuaikan identitas Toko Makmur Jaya (aksen hijau dan kuning).
    * Fitur toggle Mode Gelap / Terang (*Dark Mode*) di halaman Pengaturan yang langsung mengubah style aplikasi secara real-time.

11. **Animasi Performa Tinggi dengan AnimationController:**
    * **Animasi Masuk Banner Dashboard:** Efek *fade-in* dan translasi vertikal saat membuka dashboard.
    * **Animasi Tombol Keranjang:** Efek *scale bounce* saat tombol tambah ke keranjang diklik.
    * **Animasi Kartu Profil:** Efek *scale & opacity* saat halaman profil pemilik toko dibuka (`ionViewDidEnter`).
