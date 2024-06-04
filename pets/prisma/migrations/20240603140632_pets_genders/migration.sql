/*
  Warnings:

  - Added the required column `gender` to the `Pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pets` ADD COLUMN `gender` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Pets` ADD CONSTRAINT `Pets_gender_fkey` FOREIGN KEY (`gender`) REFERENCES `Gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
