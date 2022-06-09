<h1 align="center">GameAuctionForTwitch</a> 
<img src="https://i.gifer.com/origin/9f/9f90c58ff4b9f3ed1adff97e43416056_w200.gif" height="45"/></h1>
<h3 align="center">Сервис считывающий сообщения с чата twitch канала и собирающий только упоминания об играх. Тем самым формируется список игр за которые проголосовали люди, для того чтобы стример мог выбрать самую популярную.</h3>

# Запуск проекта

1. npm i
2. Установить ключ доступа к вашему аккаунту
3. Установить канал с которого считывать данные
4. npm start dev

# О проекте

<img src="https://github.com/Dobrohub/GameAuctionForTwitch/blob/main/ProjectDescription/aucproj.gif"/>

Когда в чате появляется упоминание об игре, в рейтинг автоматически добавляется информация о ней. Мы видим кол-во голосов, рейтинг игры и ссылка на YouTube трейлер. Рейтинг игр выстраивается от большего к меньшему. Все происходит без перезагрузки страницы. 

Считывание чата твича:
- tmi-js

Поиск трейлеров:
- YouTube API

Поиск информации об играх:
- Rawg.io API

# Другие технологии проекта

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) 

<img src="https://img.shields.io/badge/Material-Ui-brightgreen?style=for-the-badge"/> 

<img src="https://img.shields.io/badge/ANT-Design-brightgreen?style=for-the-badge"/> 

<img src="https://img.shields.io/badge/Bootstrap-style-green?style=for-the-badge"/> 

# Планы проекта

- Рефакторинг кода.
- Переписать на реакт.
- Отображение списка прогосовавших.
- Личный кабинет для подключения каналов.
- 1 человек 1 голос.
- Возможность изменить голос.
- Уведомление об "особых" голосах на экране.

Идея и реализация - Клычников Сергей.

