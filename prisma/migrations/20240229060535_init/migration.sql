-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('pengguna', 'petugas', 'admin') NOT NULL DEFAULT 'pengguna';
