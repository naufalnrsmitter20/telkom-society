-- AlterTable
ALTER TABLE `Team` ADD COLUMN `teamStatus` ENUM('ACTIVE', 'INACTIVE', 'DELETED') NOT NULL DEFAULT 'ACTIVE';
