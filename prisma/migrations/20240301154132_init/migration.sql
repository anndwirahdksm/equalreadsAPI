/*
  Warnings:

  - You are about to alter the column `status` on the `peminjaman` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `peminjaman` MODIFY `status` ENUM('dipinjam', 'dikembalikan', 'hilang') NOT NULL DEFAULT 'dipinjam';
