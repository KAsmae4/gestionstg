-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 16 mai 2024 à 22:44
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `btn`
--

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000001_create_service_table', 1),
(2, '2014_10_12_000002_create_users_table', 1),
(3, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(4, '2019_08_19_000000_create_failed_jobs_table', 1),
(5, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(6, '2024_04_19_222206_create_permission_tables', 1),
(7, '2024_04_28_191511_create_trainees_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 2),
(1, 'App\\Models\\User', 4),
(1, 'App\\Models\\User', 5),
(2, 'App\\Models\\User', 7),
(3, 'App\\Models\\User', 3),
(3, 'App\\Models\\User', 6);

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2024-05-05 18:07:35', '2024-05-05 18:07:35'),
(2, 'superAdmin', 'web', '2024-05-05 18:07:36', '2024-05-05 18:07:36'),
(3, 'manager', 'web', '2024-05-05 18:07:36', '2024-05-05 18:07:36');

-- --------------------------------------------------------

--
-- Structure de la table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Directeur général et commertial', 'active', '2024-05-05 18:22:16', '2024-05-05 18:22:16'),
(2, 'Comité des Directeurs', 'inactive', '2024-05-05 18:22:32', '2024-05-05 18:27:03'),
(3, 'Direction Commercial', 'Active', '2024-05-05 18:22:53', '2024-05-05 18:28:10'),
(4, 'Direction Financiére', 'inactive', '2024-05-05 18:29:00', '2024-05-05 18:29:00'),
(5, 'Direction des Systémes d\'infotmation', 'active', '2024-05-05 18:33:44', '2024-05-05 18:33:44');

-- --------------------------------------------------------

--
-- Structure de la table `trainees`
--

CREATE TABLE `trainees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `Telephone` varchar(255) NOT NULL,
  `etablissement` varchar(255) NOT NULL,
  `CIN` varchar(255) NOT NULL,
  `Vill` varchar(255) NOT NULL,
  `date_debut` varchar(255) NOT NULL,
  `date_fin` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `pdf_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `trainees`
--

INSERT INTO `trainees` (`id`, `name`, `surname`, `email`, `Telephone`, `etablissement`, `CIN`, `Vill`, `date_debut`, `date_fin`, `service`, `pdf_path`, `created_at`, `updated_at`) VALUES
(1, 'meriem', 'talib', 'meriemtalib@gmail.com', '0705753084', 'ofppt', 'EA345564', 'benguerir', '2024-04-01', '2024-04-30', 'Direction des Systémes d\'infotmation', 'uploads/1714982411_Meriem Talib (2).pdf', '2024-05-06 08:00:12', '2024-05-06 08:00:12'),
(2, 'asmae', 'kerarmi', 'asmaekerarmi@gmail.com', '0687654433', 'ofppt', 'EA55443', 'benguerir', '2024-04-01', '2024-04-30', 'Direction des Systémes d\'infotmation', 'uploads/1714982711_Meriem Talib (2).pdf', '2024-05-06 08:05:11', '2024-05-06 08:05:11'),
(3, 'farah', 'zaaiter', 'zaaiterfarah@gmail.com', '0765438876', 'fst', 'EA54332', 'benguerir', '2024-03-01', '2024-05-31', 'Directeur général et commertial', 'uploads/1714982845_Meriem Talib (2).pdf', '2024-05-06 08:07:25', '2024-05-06 08:07:25'),
(4, 'zaineb', 'azizi', 'azizizaineb@gmail.com', '0705758865', 'ensa', 'EA56776', 'marakech', '2024-02-01', '2024-04-30', 'Direction Commercial', 'uploads/1714983108_Meriem Talib (2).pdf', '2024-05-06 08:11:48', '2024-05-06 08:11:48'),
(5, 'ahmad', 'nassiri', 'nassiriahmad@gmail.com', '0656543225', 'ena', 'EA56765', 'marakech', '2024-04-15', '2024-06-15', 'Comité des Directeurs', 'uploads/1714983414_Ahmad Nassiri.pdf', '2024-05-06 08:16:54', '2024-05-06 08:16:54'),
(6, 'Oumaima', 'Talib', 'oumaimatalib@gmail.com', '0654654532', 'fst', 'EA56776', 'benguerir', '2024-04-01', '2024-07-31', 'Direction Financiére', 'uploads/1715015185_Meriem Talib (2).pdf', '2024-05-06 17:06:26', '2024-05-06 17:06:26');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Prenom` varchar(255) NOT NULL,
  `CIN` varchar(255) NOT NULL,
  `Vill` varchar(255) NOT NULL,
  `Date_naissance` varchar(255) NOT NULL,
  `Adresse` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `Telephone` varchar(255) NOT NULL,
  `service` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `Nome`, `Prenom`, `CIN`, `Vill`, `Date_naissance`, `Adresse`, `email`, `Telephone`, `service`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(2, 'Chchab', 'Ahmmad', 'EA56762', 'benguerir', '12-02-1982', 'benguerir', 'chchabahmmad@gmail.com', '0754631198', 'Direction Commercial', NULL, '$2y$10$uqpvsRLGDYcOfhZ4fCayXeRqT/5NP5R15aPWYSXO8IFPOrV/CDoI2', NULL, '2024-05-05 18:51:27', '2024-05-05 18:51:27'),
(3, 'Rahim', 'Adham', 'EA55411', 'benguerir', '22-01-1985', 'benguerir', 'rahimadham@gmail.com', '0654631100', 'Direction Financiére', NULL, '$2y$10$JSJEFqqjSHUWf/YAhAuJM.tn9VaDfe4YpfqOjlfetAeI5idXq7ZzK', NULL, '2024-05-05 18:53:55', '2024-05-05 18:53:55'),
(4, 'Sami', 'Rahim', 'EA56333', 'benguerir', '13-04-1988', 'benguerir', 'rahim@gmail.com', '0654630011', 'Directeur général et commertial', NULL, '$2y$10$XSKj1LL.5jRTiJKJCspvJehyEuB8mbRfgR8aA/jtBdcbazG2tkgsO', NULL, '2024-05-05 19:15:40', '2024-05-05 19:15:40'),
(5, 'Raadi', 'Zaid', 'EA5655', 'benguerir', '19-08-1981', 'benguerir', 'raadi@gmail.com', '065464532', 'Direction Financiére', NULL, '$2y$10$xSu4MlvuGpI7m0MfCshkgOSIC7j3R0fqyaRUBj9hVCj8Q7qVoeoEe', NULL, '2024-05-05 19:17:24', '2024-05-05 19:17:24'),
(6, 'Tabli', 'Rahma', 'EA56366', 'marakech', '22-11-1990', 'benguerir', 'rahmar@gmail.com', '0754635643', 'Direction Commercial', NULL, '$2y$10$7IUWGHM46ArX8FNRqH/wZeI8bUutLY8.U1dh4ZCiV0v86vBo1IH2u', NULL, '2024-05-05 19:19:21', '2024-05-05 19:19:21'),
(7, 'jabli', 'zakaria', 'EA765573', 'benguerir', '05-11-1990', 'benguerir', 'jabli.zakaria@gmail.com', '0662038667', 'Direction des Systémes d\'infotmation', NULL, '$2y$10$RQILpaN5zimyTnnegnQtqOZ9D7SGzVA1t00wHrpSVWHDHYclniI0q', NULL, '2024-05-06 07:56:23', '2024-05-06 07:56:23');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Index pour la table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Index pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `trainees`
--
ALTER TABLE `trainees`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `trainees`
--
ALTER TABLE `trainees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
