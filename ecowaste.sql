-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 09 Jun 2025 pada 07.08
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecowaste`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `province` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `waste_type` enum('Plastik','Kertas','Logam','Organik','Elektronik','B3') NOT NULL,
  `waste_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `locations`
--

INSERT INTO `locations` (`id`, `name`, `province`, `city`, `address`, `latitude`, `longitude`, `waste_type`, `waste_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Bank Sampah Gowok', 'Daerah Istimewa Yogyakarta', 'Kabupaten Sleman', '6C72+4QR, Jl. Nogogini, Ambarukmo, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281', -7.7837488794602105, 110.40075936959728, 'Organik', 4, '2025-06-09 05:15:43', '2025-06-09 05:15:43'),
(2, 'Bank Sampah Mondoroko RW 7', 'Daerah Istimewa Yogyakarta ', 'Kota Yogyakarta', 'Jl. Mondorakan No.27, Prenggan, Kec. Kotagede, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55172', -7.823035454207674, 110.39663949661129, 'Plastik', 1, '2025-06-09 05:15:43', '2025-06-09 05:15:43'),
(3, 'Bank Sampah Gemah Ripah Bantul', 'Daerah Istimewa Yogyakarta', 'Kabupaten Bantul', 'Jl. Urip Sumoharjo Dk, Jl. Badegan No.RT 12, Bejen, Bantul, Kec. Bantul, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55711', -7.884977245384479, 110.32954426880754, 'Kertas', 2, '2025-06-09 05:17:44', '2025-06-09 05:17:44'),
(4, 'Bank Sampah Induk Cabang Sadang Serang', 'Jawa Barat', 'Kota Bandung', 'Jl. Sadang Tengah No.6, Sekeloa, Kecamatan Coblong, Kota Bandung, Jawa Barat 40133', -6.837927769387835, 107.62292935452277, 'Logam', 3, '2025-06-09 05:18:39', '2025-06-09 05:18:39'),
(5, 'Bank Sampah Bumi Inpirasi', 'Jawa Barat', 'Kota Bandung', 'Jl. Cisitu Indah VI No.188, Dago, Kecamatan Coblong, Kota Bandung, Jawa Barat 40135', -6.837885202070845, 107.61469199034352, 'Organik', 4, '2025-06-09 05:19:06', '2025-06-09 05:19:06'),
(6, 'Bank Sampah Bersinar', 'Jawa Barat', 'Kabupaten Bandung', 'Bandung, Jl. Terusan Bojongsoang No.174A, Kec. Baleendah, Kabupaten Bandung, Jawa Barat 40375', -6.966261282088851, 107.63120006380055, 'Organik', 4, '2025-06-09 05:19:06', '2025-06-09 05:19:06'),
(7, 'Bank Sampah Sirnajaya', 'Jawa Barat', 'Kabupaten Bekasi', 'perum KSB blok F19 no 25 desa sirna jaya kec Serang baru kab, Serang, Cikarang Sel., Kabupaten Bekasi, Jawa Barat 17330', -6.364826402006817, 107.13545961114026, 'Plastik', 1, '2025-06-09 05:21:28', '2025-06-09 05:21:28'),
(8, 'Bank Sampah Bukit Asri Ciomas', 'Jawa Barat', 'Kabupaten Bogor', '9QV6+FVR, Jl. Cemara I, Pagelaran, Kec. Ciomas, Kabupaten Bogor, Jawa Barat 16610', -6.539443678308334, 106.75319472245019, 'Organik', 4, '2025-06-09 05:21:28', '2025-06-09 05:21:28'),
(9, 'Bank Sampah Induk Surabaya', 'Jawa Timur', 'Surabaya', 'Jl. Raya Menur No.31-A, Manyar Sabrangan, Kec. Mulyorejo, Surabaya, Jawa Timur 60116', -7.277942348097421, 112.76303745332461, 'Elektronik', 5, '2025-06-09 05:23:59', '2025-06-09 05:23:59'),
(10, 'Bank Sampah Sri Wilis', 'Jawa Timur', 'Kota Kediri', 'Jl. G. Tigabelas No.1, Pojok, Kec. Mojoroto, Kota Kediri, Jawa Timur 64115', -7.755387804723226, 111.96394312394689, 'B3', 6, '2025-06-09 05:25:14', '2025-06-09 05:25:14'),
(11, 'Bank Sampah Malang', 'Jawa Timur ', 'Kota Malang', 'Jl. S. Supriadi No.38 A, Sukun, Kec. Sukun, Kota Malang, Jawa Timur 65147', -7.932245211789904, 112.63960229365077, 'Plastik', 1, '2025-06-09 05:25:45', '2025-06-09 05:25:45'),
(12, 'Bank Sampah Buduran', 'Jawa Timur', 'Kabupaten Madiun', 'FJ6R+WX, Karanglo, Buduran, Kec. Wonoasri, Kabupaten Madiun, Jawa Timur', -7.492685884348024, 111.62590025175295, 'Logam', 3, '2025-06-09 05:26:32', '2025-06-09 05:26:32'),
(13, 'Bank Sampah Induk Salatiga Gudang Kecandran', 'Jawa Tengah', 'Kota Salatiga', 'MFCM+524, Jl. Bodronoyo, Kecandran, Kec. Sidomukti, Kota Salatiga, Jawa Tengah 50722', -7.306452375666517, 110.48999986044467, 'Kertas', 2, '2025-06-09 05:27:47', '2025-06-09 05:27:47'),
(14, 'Bank Sampah Barokah Kratonan', 'Jawa Tengah', 'Kota Surakarta', 'Jl. Manduro I No.1, Kratonan, Kec. Serengan, Kota Surakarta, Jawa Tengah 57153', -7.524341118623919, 110.8195896993246, 'B3', 6, '2025-06-09 05:29:46', '2025-06-09 05:29:46'),
(15, 'Bank Sampah Resik Becik', 'Jawa Tengah', 'Kota Semarang', 'Jl. Cokrokembang No.11, Krobokan, Kec. Semarang Barat, Kota Semarang, Jawa Tengah 50141', -6.914833825076268, 110.4071402536642, 'Plastik', 1, '2025-06-09 05:30:46', '2025-06-09 05:30:46'),
(16, 'Bank Sampah Ngudi Lestari Kel. Tinjomoyo', 'Jawa Tengah', 'Kota Semarang', 'Jl karangrejo selatan VI Rt 01, RW VII No.Kel, Tinjomoyo, Kec. Banyumanik, Kota Semarang, Jawa Tengah 50262', -6.965272537784196, 110.40944984461433, 'Logam', 3, '2025-06-09 05:31:50', '2025-06-09 05:31:50'),
(17, 'Bank Sampah Mawar\r\n', 'Daerah Khusus Ibukota Jakarta', 'Kota Jakarta Selatan', 'Jl. Taman Margasatwa Rt 004/05 No. 26, RT.4/RW.5, Jati Padang, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12540', -6.269766568460127, 106.82779352949848, 'Plastik', 1, '2025-06-09 05:33:41', '2025-06-09 05:33:41'),
(18, 'Bank Sampah Asri', 'Daerah Khusus Ibukota Jakarta', 'Kota Jakarta Timur', '8, Jl. Anggrek Raya No.30, RT.1/RW.2, Malaka Sari, Kec. Duren Sawit, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13460', -6.2062866399228485, 106.93079035414846, 'Kertas', 2, '2025-06-09 05:33:41', '2025-06-09 05:33:41'),
(19, 'Bank Sampah Madusela', 'Daerah Khusus Ibukota Jakarta', 'Kota Jakarta Pusat', 'Jl. Mangga Dua Dalam, Mangga Dua Sel., Kecamatan Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10730', -6.12573121449857, 106.82779352949848, 'Organik', 4, '2025-06-09 05:35:19', '2025-06-09 05:35:19'),
(20, 'Bank Sampah Unit Jambu Basah', 'Daerah Khusus Ibukota Jakarta', 'Kota Jakarta Barat', 'SDN, 10 Pagi, RT.9/RW.6, Kembangan Utara, Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11610', -6.142799062576089, 106.74539606717101, 'Plastik', 1, '2025-06-09 05:36:15', '2025-06-09 05:36:15'),
(21, 'Bank Sampah Sarana Gathi', 'Bali', 'Kota Denpasar', 'Jl. Ahmad Yani Utara No.453, Peguyangan, Kec. Denpasar Utara, Kota Denpasar, Bali 80115', -8.599665177617426, 115.211068934324, 'Plastik', 1, '2025-06-09 06:35:50', '2025-06-09 06:35:50'),
(22, 'Bank Sampah Adi Asih Pertiwi', 'Bali', 'Kota Denpasar', 'Gg. Sandat No.10, Banjar Kebonkuri Tengah, Kesiman, Kec. Denpasar Tim., Kota Denpasar, Bali 80237', -8.637913959274822, 115.24802238952643, 'Plastik', 1, '2025-06-09 06:40:41', '2025-06-09 06:40:41'),
(23, 'Bank Sampah Galang Panji', 'Bali', 'Kabupaten Buleleng', 'Jl. Rajawali, Panji, Kec. Sukasada, Kabupaten Buleleng, Bali 81161', -8.109393438065185, 115.0779177586036, 'Organik', 4, '2025-06-09 06:41:40', '2025-06-09 06:41:40'),
(24, 'Bank Sampah Sedulur 22', 'Lampung', 'Kota Metro', 'Jl. Bangka No.8, Hadimulyo Bar., Kec. Metro Pusat, Kota Metro, Lampung 34113', -5.063667723107605, 105.28505079019592, 'Kertas', 2, '2025-06-09 06:42:37', '2025-06-09 06:42:37'),
(25, 'Bank Sampah Emak', 'Kabupaten Lampung Selatan', 'Lampung', 'Perum, Sohibanila, Kec. Natar, Kabupaten Lampung Selatan, Lampung 35111', -5.242076250738082, 105.20256298810799, 'Kertas', 2, '2025-06-09 07:06:35', '2025-06-09 07:06:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` text NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `eco_points` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `wasterecords`
--

CREATE TABLE `wasterecords` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `location_id` int(11) NOT NULL,
  `waste_id` int(11) NOT NULL,
  `weight` float NOT NULL,
  `date_collected` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `wastes`
--

CREATE TABLE `wastes` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `recyclable` tinyint(1) NOT NULL,
  `eco_points` int(11) NOT NULL,
  `tips` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `wastes`
--

INSERT INTO `wastes` (`id`, `type`, `price`, `recyclable`, `eco_points`, `tips`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Plastik', 10000, 1, 5, NULL, NULL, '2025-06-09 05:55:01', '2025-06-09 05:55:01'),
(2, 'Kertas', 12000, 0, 4, NULL, NULL, '2025-06-09 05:55:01', '2025-06-09 05:55:01'),
(3, 'Logam', 13000, 1, 5, NULL, NULL, '2025-06-09 05:55:01', '2025-06-09 05:55:01'),
(4, 'Organik', 11000, 0, 7, NULL, NULL, '2025-06-09 05:55:01', '2025-06-09 05:55:01'),
(5, 'Elektronik', 14000, 1, 6, NULL, NULL, '2025-06-09 05:55:01', '2025-06-09 05:55:01'),
(6, 'B3', 13500, 0, 7, NULL, NULL, '2025-06-09 05:55:01', '2025-06-09 05:55:01');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `waste_id` (`waste_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username_2` (`username`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `username_3` (`username`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `username_4` (`username`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `username_5` (`username`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `username_6` (`username`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `username_7` (`username`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `username_8` (`username`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `username_9` (`username`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `username_10` (`username`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `username_11` (`username`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `username_12` (`username`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `username_13` (`username`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `username_14` (`username`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `username_15` (`username`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `username_16` (`username`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `username_17` (`username`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `username_18` (`username`),
  ADD UNIQUE KEY `email_18` (`email`),
  ADD UNIQUE KEY `username_19` (`username`),
  ADD UNIQUE KEY `email_19` (`email`);

--
-- Indeks untuk tabel `wasterecords`
--
ALTER TABLE `wasterecords`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `location_id` (`location_id`),
  ADD KEY `waste_id` (`waste_id`);

--
-- Indeks untuk tabel `wastes`
--
ALTER TABLE `wastes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `wasterecords`
--
ALTER TABLE `wasterecords`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `wastes`
--
ALTER TABLE `wastes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `locations`
--
ALTER TABLE `locations`
  ADD CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_10` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_11` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_12` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_13` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_14` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_15` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_16` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_17` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_18` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_19` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_2` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_20` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_3` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_4` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_5` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_6` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_7` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_8` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `locations_ibfk_9` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `wasterecords`
--
ALTER TABLE `wasterecords`
  ADD CONSTRAINT `wasterecords_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_10` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_11` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_12` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_13` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_14` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_15` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_16` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_17` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_18` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_19` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_20` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_21` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_22` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_23` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_24` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_25` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_26` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_27` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_28` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_29` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_3` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_30` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_31` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_32` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_33` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_34` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_35` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_36` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_37` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_38` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_39` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_40` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_41` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_42` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_43` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_44` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_45` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_46` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_47` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_48` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_49` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_5` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_50` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_51` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_52` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_53` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_54` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_55` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_56` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_57` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_6` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_7` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_8` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `wasterecords_ibfk_9` FOREIGN KEY (`waste_id`) REFERENCES `wastes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
