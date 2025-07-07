# ПРО ГОЛОС - Курс по технике речи

Статическая версия сайта курса "ПРО ГОЛОС" от Влады Мамедовой с автоматическим управлением акциями и централизованным контентом.

## 🎯 Описание

Это профессиональный лендинг-страница курса по технике речи, включающая:

- **12 основных блоков** с информацией о курсе
- **Адаптивный дизайн** для всех устройств (десктоп, планшет, мобильные)
- **Интерактивную карусель** с 23 запросами клиентов
- **Счетчик обратного отсчета** до окончания акции
- **Модальное окно** для регистрации с валидацией
- **Интеграцию с Make.com** для автоматической обработки заявок
- **Централизованное управление** ценами и датами

## 📊 Особенности

- ✅ **Полностью автоматическое управление акциями** - цены и даты меняются в одном месте
- ✅ **Умный счетчик** - автоматически переключает цены после окончания акции
- ✅ **Адаптивный дизайн** - корректно отображается на всех устройствах
- ✅ **Интеграция с Make.com** - заявки отправляются на автоматизированную обработку
- ✅ **Современный дизайн** - мягкие синие тона и белые блоки
- ✅ **SEO-оптимизация** - правильная структура HTML и метатеги

## 🗂️ Структура файлов

```
pro-voice-master/
├── index.html              # Главная страница (471 строка)
├── css/
│   └── style.css          # Стили сайта (1100+ строк)
├── js/
│   └── script.js          # JavaScript функциональность (780+ строк)
├── images/
│   ├── vlada-photo.jpg    # Фотография автора курса
│   └── vm_logo.jpg        # Логотип VM
├── files/
│   ├── program.pdf        # PDF программа курса для скачивания
│   ├── program.html       # HTML версия программы
│   └── program.txt        # Текстовая версия программы
└── README.md              # Этот файл с инструкциями
```

## 🎛️ Управление контентом

### 1. 💰 Изменение цен и дат акций

**Самое главное!** Для изменения цен и дат акции нужно отредактировать только один блок в файле `js/script.js`:

```javascript
// Найдите в начале файла js/script.js этот блок:
const PROMO_CONFIG = {
    // Дата окончания акции
    deadline: '2025-08-01',        // Формат: YYYY-MM-DD
    deadlineText: '1 августа',     // Текст для отображения
    
    // Цены самостоятельного тарифа
    selfTariff: {
        currentPrice: '4 499 ₽',   // Цена во время акции
        oldPrice: '7 499 ₽',       // Обычная цена (зачеркнутая)
        regularPrice: '7 499 ₽'    // Цена после окончания акции
    },
    
    // Цены тарифа с куратором
    curatorTariff: {
        currentPrice: '9 499 ₽',   // Цена во время акции
        oldPrice: '12 499 ₽',      // Обычная цена (зачеркнутая)
        regularPrice: '12 499 ₽'   // Цена после окончания акции
    }
};
```

**Пример изменения для новой акции:**
```javascript
const PROMO_CONFIG = {
    deadline: '2025-12-31',
    deadlineText: '31 декабря',
    selfTariff: {
        currentPrice: '3 999 ₽',
        oldPrice: '6 999 ₽',
        regularPrice: '6 999 ₽'
    },
    curatorTariff: {
        currentPrice: '8 999 ₽',
        oldPrice: '11 999 ₽',
        regularPrice: '11 999 ₽'
    }
};
```

### 2. 📝 Изменение основного контента

#### Заголовки и описания (файл `index.html`):

**Главный заголовок:**
```html
<h1 class="hero-title">ПРО ГОЛОС</h1>
<p class="hero-subtitle">Курс по технике речи от Влады Мамедовой</p>
```

**Описание курса:**
```html
<p class="hero-description">
    Овладей речью, которая звучит без спешки, зажимов и страха...
</p>
```

**Заголовки секций:**
```html
<h2 class="section-title">За 1 месяц ты получишь</h2>
<h2 class="section-title">Для кого подходит курс</h2>
<!-- и т.д. -->
```

#### Программа курса:
```html
<div class="program-item">
    <div class="program-week">Неделя 1</div>
    <h3>Основы дыхания и постановка голоса</h3>
    <p>Диафрагмально-реберное дыхание, работа с голосовыми связками</p>
</div>
```

### 3. 🖼️ Изменение изображений

**Фотография автора** (`images/vlada-photo.jpg`):
- Замените файл `vlada-photo.jpg` на новую фотографию
- Рекомендуемый размер: 300x300px
- Формат: JPG или PNG

**Логотип** (`images/vm_logo.jpg`):
- Замените файл `vm_logo.jpg` на новый логотип
- Рекомендуемый размер: 50x50px

### 4. 🎨 Изменение цветовой схемы

В файле `css/style.css` найдите и измените основные цвета:

```css
/* Основной синий цвет */
rgba(30, 64, 175, 0.85)  /* Замените на нужный цвет */

/* Красный цвет акции */
#dc2626  /* Замените на нужный цвет */

/* Фон синих секций */
.section-blue {
    background: linear-gradient(135deg, 
        rgba(30, 64, 175, 0.8) 0%, 
        rgba(29, 78, 216, 0.8) 100%);
}
```

### 5. 📧 Настройка интеграции с Make.com

В файле `js/script.js` найдите URL вебхука:

```javascript
const webhookResponse = await fetch('https://hook.eu2.make.com/b14fpmmc28whdu9d8ugp5jmqlfzw3k1r', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        telegram: data.telegram || '',
        tariff: data.tariff,
        tariff_name: getTariffName(data.tariff),
        timestamp: new Date().toISOString(),
        source: 'landing_page'
    })
});
```

**Измените URL на ваш вебхук Make.com.**

### 6. 📞 Изменение контактов

**Telegram для связи:**
```javascript
// В файле js/script.js
const telegramUrl = `https://t.me/vladamamedova?text=${encodeURIComponent(message)}`;
```

**Демо-урок:**
```javascript
// В файле js/script.js, функция openDemoVideo()
const demoUrl = 'https://disk.yandex.ru/i/NAqfQjsmyF6ZAw';
```

**Программа курса в PDF:**
```javascript
// В файле js/script.js, функция downloadProgram()
link.href = 'files/program.pdf';
link.download = 'Программа_курса_ПРО_ГОЛОС.pdf';
```

## 🧪 Тестирование функций

### Тестирование акций

Откройте консоль разработчика (F12) и выполните:

```javascript
// Тест завершенной акции
window.testExpiredPromo();

// Возврат к активной акции
window.testActivePromo();

// Принудительное обновление цен
window.updatePricesAndDates();
```

### Проверка счетчика
```javascript
// Проверка работы счетчика
console.log('Акция активна:', window.isPromoActive());
console.log('Конфигурация:', window.PROMO_CONFIG);
```

## 🚀 Развертывание

### На GitHub Pages:
1. Загрузите все файлы в GitHub репозиторий
2. Settings → Pages → Deploy from branch → main → Save
3. Сайт будет доступен: `https://username.github.io/repo-name/`

### На хостинге:
1. Загрузите все файлы в папку сайта
2. Убедитесь, что `index.html` в корне
3. Проверьте работу на `https://yourdomain.com/`

## 🔧 Часто задаваемые вопросы

### Как изменить дату окончания акции?
Измените `deadline` и `deadlineText` в `PROMO_CONFIG` в файле `js/script.js`

### Почему не обновляются цены?
Проверьте консоль браузера на ошибки. Выполните `window.updatePricesAndDates()`

### Как добавить новую секцию?
Скопируйте блок `<section>` в `index.html` и добавьте стили в `css/style.css`

### Как изменить карусель запросов?
Отредактируйте содержимое `.request-card` в файле `index.html`

### Как протестировать форму?
Заполните форму и проверьте, приходят ли данные на ваш вебхук Make.com

### Как создать PDF файл программы курса?
1. Откройте файл `files/program.html` в браузере
2. Нажмите `Cmd+P` (Mac) или `Ctrl+P` (Windows)
3. Выберите "Сохранить как PDF"
4. Сохраните как `files/program.pdf`
5. Замените текущий файл на настоящий PDF

### Почему кнопка "Скачать программу" не работает?
Проверьте, что файл `files/program.pdf` существует и доступен

## 📈 Аналитика

Для добавления Google Analytics или Яндекс.Метрики добавьте код в `<head>` файла `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🎯 Технологии

- **HTML5** - семантическая разметка
- **CSS3** - адаптивные стили, анимации, Grid Layout
- **Vanilla JavaScript** - без внешних библиотек
- **Google Fonts** - шрифт Inter
- **Make.com** - автоматизация обработки заявок

## 📞 Поддержка

Если у вас возникли вопросы по настройке сайта:
- Telegram автора: @vladamamedova
- Демо-урок: https://disk.yandex.ru/i/NAqfQjsmyF6ZAw

---

**Последнее обновление:** Декабрь 2024
**Версия:** 2.0 (с автоматическим управлением акциями)

