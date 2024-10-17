/*
  Warnings:

  - You are about to drop the column `mentor` on the `team` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `teammember` table. All the data in the column will be lost.
  - You are about to drop the column `BirthDate` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `NIS` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `NISN` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `absent` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `biography` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `clasess` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `generation` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `job` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `schoolOrigin` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `user` table. All the data in the column will be lost.
  - Added the required column `memberId` to the `TeamMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_certificatetouser` DROP FOREIGN KEY `_CertificateToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_projecttouser` DROP FOREIGN KEY `_ProjectToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `_skilltouser` DROP FOREIGN KEY `_SkillToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `teammember` DROP FOREIGN KEY `TeamMember_user_id_fkey`;

-- AlterTable
ALTER TABLE `_certificatetouser` MODIFY `A` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_projecttouser` MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_skilltouser` MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `project` ADD COLUMN `teamId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `team` DROP COLUMN `mentor`,
    ADD COLUMN `mentorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `teammember` DROP COLUMN `user_id`,
    ADD COLUMN `memberId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `BirthDate`,
    DROP COLUMN `NIS`,
    DROP COLUMN `NISN`,
    DROP COLUMN `Phone`,
    DROP COLUMN `absent`,
    DROP COLUMN `biography`,
    DROP COLUMN `clasess`,
    DROP COLUMN `generation`,
    DROP COLUMN `job`,
    DROP COLUMN `schoolOrigin`,
    DROP COLUMN `status`,
    ADD COLUMN `studentId` VARCHAR(191) NULL,
    ADD COLUMN `teacherId` VARCHAR(191) NULL,
    MODIFY `role` ENUM('GUEST', 'SISWA', 'GURU', 'ADMIN') NOT NULL DEFAULT 'GUEST';

-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `absent` VARCHAR(191) NULL,
    `NIS` VARCHAR(191) NULL,
    `NISN` VARCHAR(191) NULL,
    `schoolOrigin` VARCHAR(191) NULL,
    `generation` VARCHAR(191) NULL,
    `biography` LONGTEXT NULL,
    `status` ENUM('Have_Team', 'Dont_Have_Team') NOT NULL DEFAULT 'Dont_Have_Team',
    `BirthDate` VARCHAR(191) NULL,
    `jobId` VARCHAR(191) NULL,
    `classOfTalentId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Student_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teacher` (
    `id` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `desc` LONGTEXT NULL,
    `school` VARCHAR(191) NOT NULL,
    `subject` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Teacher_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserJob` (
    `id` VARCHAR(191) NOT NULL,
    `jobName` VARCHAR(191) NOT NULL DEFAULT '',
    `jobDesc` VARCHAR(191) NOT NULL DEFAULT '',
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassOfTalent` (
    `id` VARCHAR(191) NOT NULL,
    `Studentclass` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `UserJob`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_classOfTalentId_fkey` FOREIGN KEY (`classOfTalentId`) REFERENCES `ClassOfTalent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_mentorId_fkey` FOREIGN KEY (`mentorId`) REFERENCES `Teacher`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToUser` ADD CONSTRAINT `_CertificateToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SkillToUser` ADD CONSTRAINT `_SkillToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToUser` ADD CONSTRAINT `_ProjectToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
