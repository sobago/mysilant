# Электронная сервисная книжка "Мой Силант"
|||
|-|-|
|Backend|Папка с данными API и БД|
|Frontend|Папка с сайтом|

Логины для тестирования:
Админ: admin/pass
Клиент: ao.zander/ao.zanderao.zander
Сервисная организация: silant/silantsilant

## Backend
Используется Django Rest Framework, установленные дополнительные библиотеке в файле requirements.txt
БД SQlite3, при необходимости можно изменить.
- Установить и запустить виртуальное окружения из папки Backend
- Перейт в папку mysilant, запустить стандартный веб-сервер командой `python manage.py runserver`

---
## Frontend
React JS, SASS
- Установить зависимости через npm, или create-react-app
- Запустить из паки mysilant `serve -s build` или `npm start` для среды разработки
