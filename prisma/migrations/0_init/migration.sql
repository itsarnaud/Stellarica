-- CreateTable
CREATE TABLE `guild_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guild_id` VARCHAR(20) NOT NULL,
    `guild_name` VARCHAR(100) NOT NULL,
    `prefix` VARCHAR(10) NULL DEFAULT '!',
    `moderation_channel_id` VARCHAR(20) NULL,
    `auto_mod_enabled` BOOLEAN NULL DEFAULT false,
    `max_warnings` INTEGER NULL DEFAULT 3,
    `mute_role_id` VARCHAR(20) NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `guild_id`(`guild_id`),
    INDEX `idx_guild_id`(`guild_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `moderation_logs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action_id` VARCHAR(50) NOT NULL,
    `action_type` VARCHAR(20) NOT NULL,
    `target_user_id` VARCHAR(20) NOT NULL,
    `moderator_id` VARCHAR(100) NOT NULL,
    `reason` TEXT NOT NULL,
    `duration` VARCHAR(50) NULL,
    `guild_id` VARCHAR(20) NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `action_id`(`action_id`),
    INDEX `idx_action_id`(`action_id`),
    INDEX `idx_action_type`(`action_type`),
    INDEX `idx_created_at`(`created_at`),
    INDEX `idx_guild_id`(`guild_id`),
    INDEX `idx_moderator_id`(`moderator_id`),
    INDEX `idx_target_user_id`(`target_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sanctions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sanction_id` VARCHAR(50) NOT NULL,
    `user_id` VARCHAR(20) NOT NULL,
    `moderator_id` VARCHAR(100) NOT NULL,
    `type` VARCHAR(20) NOT NULL,
    `reason` TEXT NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NULL,
    `is_active` BOOLEAN NULL DEFAULT true,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `sanction_id`(`sanction_id`),
    INDEX `idx_end_date`(`end_date`),
    INDEX `idx_is_active`(`is_active`),
    INDEX `idx_sanction_id`(`sanction_id`),
    INDEX `idx_type`(`type`),
    INDEX `idx_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(20) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `joined_date` DATE NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `user_id`(`user_id`),
    INDEX `idx_user_id`(`user_id`),
    INDEX `idx_username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `warns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `warn_id` VARCHAR(50) NOT NULL,
    `user_id` VARCHAR(20) NOT NULL,
    `moderator_id` VARCHAR(100) NOT NULL,
    `reason` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `is_active` BOOLEAN NULL DEFAULT true,

    UNIQUE INDEX `warn_id`(`warn_id`),
    INDEX `idx_created_at`(`created_at`),
    INDEX `idx_moderator_id`(`moderator_id`),
    INDEX `idx_user_id`(`user_id`),
    INDEX `idx_warn_id`(`warn_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `moderation_logs` ADD CONSTRAINT `moderation_logs_target_user_id_fkey` FOREIGN KEY (`target_user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `moderation_logs` ADD CONSTRAINT `moderation_logs_guild_id_fkey` FOREIGN KEY (`guild_id`) REFERENCES `guild_settings`(`guild_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `sanctions` ADD CONSTRAINT `sanctions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `warns` ADD CONSTRAINT `warns_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

