-- AlterTable
ALTER TABLE `TeamRequest` ADD COLUMN `notificationId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `TeamRequest` ADD CONSTRAINT `TeamRequest_notificationId_fkey` FOREIGN KEY (`notificationId`) REFERENCES `Notification`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
