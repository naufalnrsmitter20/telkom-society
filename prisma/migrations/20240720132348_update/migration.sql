/*
  Warnings:

  - You are about to alter the column `job` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.
  - You are about to alter the column `gender` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `religion` ENUM('Islam', 'Kristen_Protestan', 'Kristen_Katolik', 'Budha', 'Hindu', 'Konghucu') NULL DEFAULT 'Islam',
    MODIFY `job` ENUM('Undefined', 'Hustler', 'Hipster', 'Hacker') NOT NULL DEFAULT 'Undefined',
    MODIFY `gender` ENUM('Male', 'Female') NULL DEFAULT 'Male';
