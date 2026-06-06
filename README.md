# Nommunch

Nommunch adalah aplikasi web yang dikembangkan menggunakan React.js sebagai frontend, Express.js sebagai backend, dan MySQL sebagai database.

## Tech Stack

* React.js
* Vite
* Express.js
* Node.js
* MySQL

## Setup Project

Clone repository:

```bash
git clone https://github.com/Cahyooo/nommunch-Pres.git
cd nommunch-Pres
```

## Database

Import file berikut ke MySQL:

```text
nommunch.sql
```

Pastikan database yang terbentuk bernama:

```text
nommunch
```

## Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd ../server
npm install
```

## Environment Configuration

Konfigurasi database berada pada:

```text
server/.env
```

Contoh konfigurasi:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nommunch
```

## Running the Application

Jalankan frontend:

```bash
cd client
npm run dev
```

Jalankan backend pada terminal terpisah:

```bash
cd server
npm run dev
```

Aplikasi dapat diakses melalui:

```text
http://localhost:5173
dan
http://localhost:5173/admin
```

## Project Structure

```text
nommunch/
├── client/
│   └── src/
├── server/
│   ├── middleware/
│   ├── routes/
│   └── db.js
│   └── server.js
└── nommunch.sql
```

## Team Members

Cahya Winata - 2531163
Ricksen Lee - 2531059
Christian - 2531097
Ayumi - 2531028
Febrianti - 2531009


## Course Information

**Program Studi:** Sistem Informasi
**Mata Kuliah:** Perancangan Situs Web + Sistem Basis Data
**Project:** Nommunch
