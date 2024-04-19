/*
  Warnings:

  - Added the required column `tgl_ulasan` to the `ulasan_buku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ulasan_buku` ADD COLUMN `tgl_ulasan` DATETIME(3) NOT NULL;
