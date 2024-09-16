/*
  Warnings:

  - You are about to drop the column `userId` on the `TeamMember` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TeamMember` DROP FOREIGN KEY `TeamMember_userId_fkey`;

-- AlterTable
ALTER TABLE `TeamMember` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
