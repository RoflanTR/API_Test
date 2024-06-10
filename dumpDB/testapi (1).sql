-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Июн 10 2024 г., 18:33
-- Версия сервера: 10.4.24-MariaDB
-- Версия PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `testapi`
--

-- --------------------------------------------------------

--
-- Структура таблицы `genders`
--

CREATE TABLE `genders` (
  `id` tinyint(1) UNSIGNED NOT NULL,
  `gender` varchar(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `genders`
--

INSERT INTO `genders` (`id`, `gender`) VALUES
(1, 'Мужской'),
(2, 'Женский');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `gender` tinyint(1) UNSIGNED DEFAULT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `date_register` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `password`, `gender`, `photo`, `date_register`) VALUES
(1, 'ruslan', NULL, 'agaf322@bk.ru', '$2a$10$jT0cKJVEtiMW9aLp0L8AgOQycJTlVle9GQEZchZ7cmJLrDtWujwgK', NULL, NULL, '2020-06-09'),
(13, 'fghfgh', NULL, 'fgh@fdgd.ru', '$2a$10$RJRTGTdIEX5trQ1JUdEAtO.fgReVFxB82dYTGXqYmvoytrmUm5eda', NULL, NULL, '2024-06-09'),
(14, 'авап', NULL, '2231@bk.ru', '$2a$10$G4ZxCkVCX2qkhrLrcBBNSOK1ETtdgwnWu4Ijjqqr47CBIVpfz5qsm', 2, '2024-06-10T10-59-16.080Z-localhost_3000_.png', '2022-06-09'),
(21, 'cvbvcb', 'fghfghfgh', 'fghfgh@bk.ru', '$2a$10$ZJUlAMtayX58j45JcDfxcuILG.0aGf8jdcZ2d8eYy.CIbxFzrNNte', 2, '2024-06-10T16-24-24.134Z-localhost_3000_.png', '2024-06-09'),
(22, 'олег', NULL, 'asdasd@bk.ru', '$2a$10$rPfmVUGFn1bdLBgPulBK.u9QWgPEpcm3YRKx2T.MDRJ8G9zn4rhj.', NULL, NULL, '2024-06-10'),
(23, 'степан', NULL, 'sdfsdf@bk.ru', '$2a$10$Sd1rguh3eKxEL0L3Yi7apusNta4e0A3F55AYMnjP2P0p9mTYjCVbe', NULL, NULL, '2024-06-10'),
(24, 'алексей', NULL, 'sdfsdfw@bk.ru', '$2a$10$PAuoUXPKSfGIq/T9jCAr6eTUMfNRUxzqx/zfx/L3vU9EPFDUTsRGy', NULL, NULL, '2024-06-10'),
(25, 'дмитрий', NULL, 'xvcbcvb@mail.ru', '$2a$10$qV001MatkhgjKcfI6BtyrO/tzvZ8f9dXuri7838NwYdyeIz0I0Mgu', NULL, NULL, '2024-06-10'),
(26, 'дмитрий', NULL, 'xvcbcvb@mail.com', '$2a$10$zkWJ8XUcCOcNBknDReXimePUGKRmslbg.NTeQ/sGA.nvOsNKjdoRC', NULL, NULL, '2024-06-10'),
(27, 'николай', NULL, 'vc@mail.com', '$2a$10$cwUhkuwyY89ZDvroGoftQ.YDYpl9.qxcDOo9pyMjAUW9eqytn60f2', NULL, NULL, '2024-06-10'),
(28, 'анатолий', NULL, 'cfb@mail.com', '$2a$10$wlw0Y9i9PKnBRdfeDZncc.mYQXL9MUXILqYbQjYxTxt8DU0orn/Wa', NULL, NULL, '2024-06-10'),
(29, 'патрик', NULL, 'nvbnvbnvbn@mail.com', '$2a$10$mr4ZebyICUzXUBDpyjLN0.nf2Wwa6HYix7oqUqzK1pWVcDoXVGt6C', NULL, NULL, '2024-06-10'),
(30, 'елена', NULL, 'exfg@mail.com', '$2a$10$BCX1svG6Fi2XneJ.mWhXJehkvRQtVsnQHcihyy3P2GqGZj2uc/1aG', NULL, NULL, '2024-06-10'),
(31, 'светлана', NULL, 'evxfg@mail.com', '$2a$10$GwUwP9kuBLXO3kEbe6w8w.2KtODI5xVSWDNlD9.pthPVeIARqpHKS', NULL, NULL, '2024-06-10');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `gender` (`gender`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `genders`
--
ALTER TABLE `genders`
  MODIFY `id` tinyint(1) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`gender`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
