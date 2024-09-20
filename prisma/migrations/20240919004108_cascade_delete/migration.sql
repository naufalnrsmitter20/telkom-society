-- DropForeignKey
ALTER TABLE `TeamRequest` DROP FOREIGN KEY `TeamRequest_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `TeamRequest` DROP FOREIGN KEY `TeamRequest_senderId_fkey`;

-- AddForeignKey
ALTER TABLE `TeamRequest` ADD CONSTRAINT `TeamRequest_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamRequest` ADD CONSTRAINT `TeamRequest_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
