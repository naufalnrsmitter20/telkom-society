-- CreateTable
CREATE TABLE `User` (
    `user_id` CHAR(36) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `photo_profile` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `clasess` VARCHAR(191) NULL,
    `absent` VARCHAR(191) NULL,
    `Phone` VARCHAR(191) NULL,
    `NIS` VARCHAR(191) NULL,
    `NISN` VARCHAR(191) NULL,
    `schoolOrigin` VARCHAR(191) NULL,
    `role` ENUM('SISWA', 'GURU', 'ADMIN') NOT NULL DEFAULT 'SISWA',
    `job` ENUM('Undefined', 'Hustler', 'Hipster', 'Hacker') NOT NULL DEFAULT 'Undefined',
    `biography` VARCHAR(191) NULL,
    `status` ENUM('Have_Team', 'Dont_Have_Team') NOT NULL DEFAULT 'Dont_Have_Team',
    `linkedin` VARCHAR(191) NULL,
    `github` VARCHAR(191) NULL,
    `instagram` VARCHAR(191) NULL,
    `website` VARCHAR(191) NULL,
    `whatsapp` VARCHAR(191) NULL,
    `BirthDate` VARCHAR(191) NULL,
    `religion` ENUM('Islam', 'Kristen_Protestan', 'Kristen_Katolik', 'Budha', 'Hindu', 'Konghucu') NULL DEFAULT 'Islam',
    `gender` ENUM('Male', 'Female') NULL DEFAULT 'Male',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAuth` (
    `userauth_id` CHAR(36) NOT NULL,
    `password` VARCHAR(191) NULL,
    `last_login` DATETIME(3) NULL,
    `userEmail` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `UserAuth_userEmail_key`(`userEmail`),
    PRIMARY KEY (`userauth_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tim` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Tim_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `SkillName` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Skill_SkillName_key`(`SkillName`),
    PRIMARY KEY (`SkillName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Project` (
    `ProjeectName` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,

    UNIQUE INDEX `Project_ProjeectName_key`(`ProjeectName`),
    PRIMARY KEY (`ProjeectName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `certificate` (
    `CertificateName` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NULL,

    UNIQUE INDEX `certificate_CertificateName_key`(`CertificateName`),
    PRIMARY KEY (`CertificateName`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CertificateToUser` (
    `A` CHAR(36) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CertificateToUser_AB_unique`(`A`, `B`),
    INDEX `_CertificateToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TimToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_TimToUser_AB_unique`(`A`, `B`),
    INDEX `_TimToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SkillToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_SkillToUser_AB_unique`(`A`, `B`),
    INDEX `_SkillToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProjectToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` CHAR(36) NOT NULL,

    UNIQUE INDEX `_ProjectToUser_AB_unique`(`A`, `B`),
    INDEX `_ProjectToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAuth` ADD CONSTRAINT `UserAuth_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToUser` ADD CONSTRAINT `_CertificateToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CertificateToUser` ADD CONSTRAINT `_CertificateToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `certificate`(`CertificateName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TimToUser` ADD CONSTRAINT `_TimToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Tim`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TimToUser` ADD CONSTRAINT `_TimToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SkillToUser` ADD CONSTRAINT `_SkillToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Skill`(`SkillName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SkillToUser` ADD CONSTRAINT `_SkillToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToUser` ADD CONSTRAINT `_ProjectToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Project`(`ProjeectName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProjectToUser` ADD CONSTRAINT `_ProjectToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
