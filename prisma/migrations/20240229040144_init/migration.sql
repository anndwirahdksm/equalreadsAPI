-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `buku` (
    `id_buku` INTEGER NOT NULL AUTO_INCREMENT,
    `judul` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,
    `penulis` VARCHAR(191) NOT NULL,
    `penerbit` VARCHAR(191) NOT NULL,
    `tahunterbit` DATETIME(3) NOT NULL,
    `jumlahhalaman` INTEGER NOT NULL,
    `coverbuku` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_buku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_buku` (
    `id_kategori` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kategori` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_kategori`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `peminjaman` (
    `id_peminjaman` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_buku` INTEGER NOT NULL,
    `tgl_pinjam` DATETIME(3) NOT NULL,
    `tgl_kembali` DATETIME(3) NOT NULL,
    `status` INTEGER NOT NULL,

    PRIMARY KEY (`id_peminjaman`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `koleksi_pribadi` (
    `id_koleksi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_buku` INTEGER NOT NULL,

    PRIMARY KEY (`id_koleksi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ulasan_buku` (
    `id_ulasan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_buku` INTEGER NOT NULL,
    `ulasan` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,

    PRIMARY KEY (`id_ulasan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_buku_relasi` (
    `id_kategorirelasi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_buku` INTEGER NOT NULL,
    `id_kategori` INTEGER NOT NULL,

    PRIMARY KEY (`id_kategorirelasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `peminjaman` ADD CONSTRAINT `peminjaman_id_buku_fkey` FOREIGN KEY (`id_buku`) REFERENCES `buku`(`id_buku`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `koleksi_pribadi` ADD CONSTRAINT `koleksi_pribadi_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `koleksi_pribadi` ADD CONSTRAINT `koleksi_pribadi_id_buku_fkey` FOREIGN KEY (`id_buku`) REFERENCES `buku`(`id_buku`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ulasan_buku` ADD CONSTRAINT `ulasan_buku_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ulasan_buku` ADD CONSTRAINT `ulasan_buku_id_buku_fkey` FOREIGN KEY (`id_buku`) REFERENCES `buku`(`id_buku`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_buku_relasi` ADD CONSTRAINT `kategori_buku_relasi_id_buku_fkey` FOREIGN KEY (`id_buku`) REFERENCES `buku`(`id_buku`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_buku_relasi` ADD CONSTRAINT `kategori_buku_relasi_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori_buku`(`id_kategori`) ON DELETE CASCADE ON UPDATE CASCADE;
