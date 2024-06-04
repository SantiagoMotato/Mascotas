/*
  Warnings:

  - Added the required column `category` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pets` ADD COLUMN `category` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_category_fkey` FOREIGN KEY (`category`) REFERENCES `Categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
