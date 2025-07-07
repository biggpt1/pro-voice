// ===== КОНФИГУРАЦИЯ ЦЕНЫ И ДАТЫ АКЦИИ =====
// Здесь можно легко изменить все цены и даты в одном месте
const PROMO_CONFIG = {
    // Дата окончания акции
    deadline: '2025-08-01', // Формат: YYYY-MM-DD
    deadlineText: '1 августа', // Текст для отображения
    // Цены самостоятельного тарифа
    selfTariff: {
        currentPrice: '4 499 ₽',    // Цена во время акции
        oldPrice: '7 499 ₽',       // Обычная цена
        regularPrice: '7 499 ₽'    // Цена после окончания акции 
    },
    
    // Цены тарифа с куратором
    curatorTariff: {
        currentPrice: '9 499 ₽',    // Цена во время акции
        oldPrice: '12 499 ₽',      // Обычная цена
        regularPrice: '12 499 ₽'   // Цена после окончания акции
    }
};

// Функция для проверки, действует ли еще акция
function isPromoActive() {
    const deadline = new Date(PROMO_CONFIG.deadline + 'T23:59:59').getTime();
    const now = new Date().getTime();
    return now < deadline;
}

// Функция для автоматического обновления всех цен и дат на странице
function updatePricesAndDates() {
    const promoActive = isPromoActive();
    
    if (promoActive) {
        // Акция действует - показываем акционные цены
        updatePromoPrices();
    } else {
        // Акция завершена - показываем обычные цены
        updateRegularPrices();
    }
}

// Функция обновления цен во время акции
function updatePromoPrices() {
    // Обновляем даты акции
    const priceLabelEl = document.querySelector('.price-label');
    if (priceLabelEl) {
        priceLabelEl.textContent = `Акция до ${PROMO_CONFIG.deadlineText}:`;
    }
    
    const priceNoteElements = document.querySelectorAll('.price-note');
    priceNoteElements.forEach(el => {
        el.textContent = `до ${PROMO_CONFIG.deadlineText}`;
    });
    
    const urgencyTextEl = document.querySelector('.urgency-text');
    if (urgencyTextEl) {
        urgencyTextEl.textContent = `Акция действует до ${PROMO_CONFIG.deadlineText}`;
    }
    
    // Обновляем акционные цены
    const heroPriceValue = document.querySelector('.price-value');
    const heroPriceOld = document.querySelector('.price-old');
    if (heroPriceValue) {
        heroPriceValue.textContent = PROMO_CONFIG.selfTariff.currentPrice;
        console.log('✅ Обновлена текущая цена:', PROMO_CONFIG.selfTariff.currentPrice);
    }
    if (heroPriceOld) {
        heroPriceOld.textContent = PROMO_CONFIG.selfTariff.oldPrice;
        heroPriceOld.style.display = 'inline-block';
        heroPriceOld.style.visibility = 'visible';
        heroPriceOld.style.opacity = '1';
        console.log('✅ Обновлена старая цена:', PROMO_CONFIG.selfTariff.oldPrice);
        console.log('✅ Элемент старой цены найден:', heroPriceOld);
    } else {
        console.log('❌ Элемент старой цены НЕ найден!');
    }
    
    const priceCurrentElements = document.querySelectorAll('.price-current');
    const priceOldElements = document.querySelectorAll('.price-old');
    
    if (priceCurrentElements[0]) {
        priceCurrentElements[0].textContent = PROMO_CONFIG.selfTariff.currentPrice;
    }
    if (priceOldElements[1]) {
        priceOldElements[1].textContent = PROMO_CONFIG.selfTariff.oldPrice;
    }
    
    if (priceCurrentElements[1]) {
        priceCurrentElements[1].textContent = PROMO_CONFIG.curatorTariff.currentPrice;
    }
    if (priceOldElements[2]) {
        priceOldElements[2].textContent = PROMO_CONFIG.curatorTariff.oldPrice;
    }
    
    const selfOption = document.querySelector('option[value="self"]');
    const curatorOption = document.querySelector('option[value="curator"]');
    if (selfOption) {
        selfOption.textContent = `Самостоятельный (${PROMO_CONFIG.selfTariff.currentPrice})`;
    }
    if (curatorOption) {
        curatorOption.textContent = `С куратором (${PROMO_CONFIG.curatorTariff.currentPrice})`;
    }
}

// Функция обновления цен после окончания акции
function updateRegularPrices() {
    // Скрываем акционные блоки
    const priceLabelEl = document.querySelector('.price-label');
    if (priceLabelEl) {
        priceLabelEl.textContent = 'Обычная цена:';
    }
    
    const priceNoteElements = document.querySelectorAll('.price-note');
    priceNoteElements.forEach(el => {
        el.style.display = 'none'; // Скрываем "до X"
    });
    
    const urgencyTextEl = document.querySelector('.urgency-text');
    if (urgencyTextEl) {
        urgencyTextEl.textContent = 'Курс доступен по обычной цене';
    }
    
    // Устанавливаем обычные цены (без скидки)
    const heroPriceValue = document.querySelector('.price-value');
    const heroPriceOld = document.querySelector('.price-old');
    if (heroPriceValue) {
        heroPriceValue.textContent = PROMO_CONFIG.selfTariff.regularPrice;
    }
    if (heroPriceOld) {
        heroPriceOld.style.display = 'none'; // Скрываем зачеркнутую цену
    }
    
    const priceCurrentElements = document.querySelectorAll('.price-current');
    const priceOldElements = document.querySelectorAll('.price-old');
    
    if (priceCurrentElements[0]) {
        priceCurrentElements[0].textContent = PROMO_CONFIG.selfTariff.regularPrice;
    }
    if (priceOldElements[1]) {
        priceOldElements[1].style.display = 'none';
    }
    
    if (priceCurrentElements[1]) {
        priceCurrentElements[1].textContent = PROMO_CONFIG.curatorTariff.regularPrice;
    }
    if (priceOldElements[2]) {
        priceOldElements[2].style.display = 'none';
    }
    
    const selfOption = document.querySelector('option[value="self"]');
    const curatorOption = document.querySelector('option[value="curator"]');
    if (selfOption) {
        selfOption.textContent = `Самостоятельный (${PROMO_CONFIG.selfTariff.regularPrice})`;
    }
    if (curatorOption) {
        curatorOption.textContent = `С куратором (${PROMO_CONFIG.curatorTariff.regularPrice})`;
    }
}

// Функция для получения названий тарифов с ценами (для отправки данных)
function getTariffName(tariffType) {
    const promoActive = isPromoActive();
    
    if (tariffType === 'self') {
        const price = promoActive ? PROMO_CONFIG.selfTariff.currentPrice : PROMO_CONFIG.selfTariff.regularPrice;
        return `Самостоятельный (${price})`;
    } else {
        const price = promoActive ? PROMO_CONFIG.curatorTariff.currentPrice : PROMO_CONFIG.curatorTariff.regularPrice;
        return `С куратором (${price})`;
    }
}

// Функция для работы с FAQ
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = element.querySelector('.faq-toggle');
    
    // Закрываем все остальные FAQ
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem && item.classList.contains('active')) {
            item.classList.remove('active');
            const otherToggle = item.querySelector('.faq-toggle');
            if (otherToggle) otherToggle.textContent = '+';
        }
    });
    
    // Переключаем текущий FAQ
    faqItem.classList.toggle('active');
    
    if (faqItem.classList.contains('active')) {
        toggle.textContent = '−';
    } else {
        toggle.textContent = '+';
    }
}

// Функция для скачивания программы
function downloadProgram() {
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    
    // Можно добавить реальную ссылку на PDF файл программы
    // link.href = 'files/program.pdf';
    
    // Пока показываем уведомление
    showNotification('Программа курса будет отправлена на ваш email после регистрации на курс', 'info');
    
    // Открываем модальное окно для регистрации
    setTimeout(() => {
        openModal();
    }, 1500);
}

// Функция для открытия демо-урока
function openDemoVideo() {
    // Ссылка на демо-урок из README
    const demoUrl = 'https://disk.yandex.ru/i/NAqfQjsmyF6ZAw';
    window.open(demoUrl, '_blank');
    
    showNotification('Демо-урок открывается в новой вкладке', 'success');
}

// Функции для модального окна
function openModal(tariff = '') {
    const modal = document.getElementById('modal');
    const tariffSelect = document.getElementById('tariff');
    
    if (tariff === 'self') {
        tariffSelect.value = 'self';
    } else if (tariff === 'curator') {
        tariffSelect.value = 'curator';
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Закрытие модального окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}



// Функция отправки в Яндекс.Форму
function submitToYandexForm(data) {
    // Здесь можно добавить отправку в Яндекс.Форму
    // const formData = new FormData();
    // formData.append('name', data.name);
    // formData.append('email', data.email);
    // formData.append('phone', data.phone);
    // formData.append('telegram', data.telegram);
    // formData.append('tariff', data.tariff);
    
    // fetch('https://forms.yandex.ru/cloud/ваш-id/', {
    //     method: 'POST',
    //     body: formData
    // });
}

// Функциональность карусели запросов
// Текущий индекс слайда (от 0 до totalSlides-1)
let currentSlide = 0;

// Кол-во карточек, видимых одновременно, определяется динамически
let slidesPerView = 1;

// Общее кол-во "страниц" слайдов, зависит от кол-ва карточек и slidesPerView
let totalSlides = 0;

/**
 * Функция возвращает количество видимых карточек в зависимости от ширины экрана
 */
function getSlidesPerView() {
    const width = window.innerWidth;
    if (width <= 768) return 1;    // Мобильные телефоны — 1 карточка
    if (width <= 1024) return 2;   // Планшеты — 2 карточки
    return 3;                      // Десктоп — 3 карточки
}

/**
 * Функция возвращает ширину одной карточки с учётом отступа справа (gap)
 * Чтобы сдвиг карусели был точным и не ломал верстку
 */
function getCardWidth() {
    const track = document.getElementById('requestsTrack');
    const firstCard = track.querySelector('.request-card');
    if (firstCard) {
        const style = window.getComputedStyle(firstCard);
        const width = firstCard.offsetWidth; // реальная ширина карточки
        const gapRight = parseInt(style.marginRight) || 20; // отступ справа (gap)
        return width + gapRight;
    }
    return 370; // Запасной вариант, если что-то пошло не так
}

/**
 * Инициализация карусели — создание точек навигации и вычисление параметров
 */
function initCarousel() {
    slidesPerView = getSlidesPerView();

    const track = document.getElementById('requestsTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const cards = track.children;
    
    // Вычисляем количество "страниц" (слайдов)
    totalSlides = Math.ceil(cards.length / slidesPerView);

    // Очищаем и создаём точки для навигации
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active'); // первая точка активна по умолчанию
        dot.addEventListener('click', () => goToSlide(i)); // клик по точке — перейти к слайду
        dotsContainer.appendChild(dot);
    }
    
    currentSlide = 0; // стартуем с первого слайда
    updateCarousel(); // обновляем отображение карусели
}

/**
 * Обновляет позицию карусели и активную точку навигации
 */
function updateCarousel() {
    const track = document.getElementById('requestsTrack');
    const dots = document.querySelectorAll('.dot');
    const cardWidth = getCardWidth();

    // Вычисляем смещение по оси X (сдвиг трека)
    let offset = -currentSlide * cardWidth * slidesPerView;

    // Максимально допустимый сдвиг, чтобы не уехать вправо в пустоту
    const maxOffset = -(cardWidth * (document.getElementById('requestsTrack').children.length - slidesPerView));

    // Ограничиваем сдвиг максимальными значениями
    if (offset < maxOffset) offset = maxOffset;
    if (offset > 0) offset = 0;

    // Применяем сдвиг с помощью CSS transform для плавного движения
    track.style.transform = `translateX(${offset}px)`;

    // Обновляем активное состояние точек навигации
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

/**
 * Перемещает карусель на указанное направление: -1 (влево), 1 (вправо)
 */
function moveCarousel(direction) {
    currentSlide += direction;

    // Цикличное переключение (с начала на конец и наоборот)
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    updateCarousel();
}

/**
 * Переходит на конкретный слайд по индексу
 */
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

/**
 * Обработчик изменения размера окна:
 * Если изменилось количество видимых карточек, пересчитываем параметры карусели
 */
window.addEventListener('resize', () => {
    const oldSlidesPerView = slidesPerView;
    slidesPerView = getSlidesPerView();

    if (oldSlidesPerView !== slidesPerView) {
        const track = document.getElementById('requestsTrack');
        const cards = track.children;
        totalSlides = Math.ceil(cards.length / slidesPerView);

        // Если текущий слайд выходит за пределы, корректируем его
        if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;

        updateCarousel();
    }
});



// Анимация появления элементов при скролле
function animateOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .audience-item, .testimonial-card, .bonus-card, .tariff-card, .program-item, .format-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Обработка изменения размера окна для карусели
function handleResize() {
    const newSlidesPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
    if (newSlidesPerView !== slidesPerView) {
        location.reload(); // Перезагружаем страницу для пересчета карусели
    }
}

// Дополнительные функции для улучшения UX
function addHoverEffects() {
    // Добавляем эффекты наведения для карточек
    const cards = document.querySelectorAll('.benefit-card, .audience-item, .testimonial-card, .bonus-card, .program-item, .format-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Функция для отслеживания кликов (аналитика)
function trackButtonClicks() {
    const buttons = document.querySelectorAll('button, .demo-link, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log('Button clicked:', buttonText);
            
            // Здесь можно добавить отправку события в Google Analytics
            // gtag('event', 'click', {
            //     'event_category': 'Button',
            //     'event_label': buttonText
            // });
        });
    });
}

// Функция для создания эффекта печатающегося текста
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Функция для добавления счетчика обратного отсчета
function startCountdown() {
    const deadline = new Date(PROMO_CONFIG.deadline + 'T23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = deadline - now;
        
        const countdownElements = document.querySelectorAll('.countdown');
        
        if (timeLeft > 0) {
            // Акция еще идет - показываем обратный отсчет
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            countdownElements.forEach(el => {
                el.textContent = `${days}д ${hours}ч ${minutes}м до окончания акции`;
                el.style.color = '#dc2626'; // Красный текст на белом фоне
                el.style.background = 'white';
                el.style.borderColor = '#dc2626';
            });
        } else {
            // Акция завершена - показываем сообщение и обновляем цены
            countdownElements.forEach(el => {
                el.textContent = '🚀 Акция завершена! Курс доступен по обычной цене';
                el.style.color = '#6b7280'; // Серый текст
                el.style.background = 'white';
                el.style.borderColor = '#6b7280';
            });
            
            // Автоматически обновляем цены при истечении акции
            updatePricesAndDates();
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 60000); // Обновляем каждую минуту
}

// Функция для lazy loading изображений
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Функция для добавления эффекта параллакса
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем цены и даты из конфигурации
    setTimeout(() => {
        updatePricesAndDates();
    }, 100); // Небольшая задержка для гарантии загрузки всех элементов
    
    initCarousel();
    animateOnScroll();
    addHoverEffects();
    trackButtonClicks();
    startCountdown();
    lazyLoadImages();
    addParallaxEffect();
    
    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    
    // Добавляем обработчики для кнопок карусели
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => moveCarousel(-1));
        nextBtn.addEventListener('click', () => moveCarousel(1));
    }
    
    // Добавляем плавную прокрутку для всех якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Добавляем обработчик для формы подписки (если есть)
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Здесь можно добавить отправку email для подписки
            console.log('Subscribe email:', email);
            alert('Спасибо за подписку! Мы будем держать вас в курсе новостей.');
            this.reset();
        });
    }
    
    // Обработчик формы регистрации с валидацией
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                showNotification('Пожалуйста, заполните все обязательные поля корректно', 'error');
                return;
            }
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Показываем индикатор загрузки
            const submitBtn = this.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправляем...';
            submitBtn.disabled = true;
            
            try {
                // Отправляем данные на вебхук
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
                
                if (webhookResponse.ok) {
                    // Формируем сообщение для Telegram (закомментировано)
                    // const message = `🎯 Новая заявка на курс "ПРО ГОЛОС"
                    // 
                    // 👤 Имя: ${data.name}
                    // 📧 Email: ${data.email}
                    // 📱 Телефон: ${data.phone}
                    // 💬 Telegram: @${data.telegram || 'не указан'}
                    // 🎯 Тариф: ${data.tariff === 'self' ? 'Самостоятельный (4 499 ₽)' : 'С куратором (9 499 ₽)'}`;
                    
                    // Открываем Telegram с готовым сообщением (закомментировано)
                    // const telegramUrl = `https://t.me/vladamamedova?text=${encodeURIComponent(message)}`;
                    // window.open(telegramUrl, '_blank');
                    
                    showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
                    closeModal();
                    this.reset();
                } else {
                    throw new Error('Ошибка отправки на сервер');
                }
                
            } catch (error) {
                console.error('Ошибка при отправке данных:', error);
                showNotification('Произошла ошибка при отправке. Попробуйте еще раз.', 'error');
            } finally {
                // Восстанавливаем кнопку
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Дополнительная проверка после полной загрузки страницы
window.addEventListener('load', function() {
    updatePricesAndDates();
    
    // Принудительное обновление цен с задержкой
    setTimeout(() => {
        updatePricesAndDates();
        
        // Дополнительная проверка hero-цены
        const heroPriceOld = document.querySelector('.hero-price .price-old');
        if (heroPriceOld) {
            heroPriceOld.textContent = PROMO_CONFIG.selfTariff.oldPrice;
            heroPriceOld.style.display = 'inline-block';
            heroPriceOld.style.visibility = 'visible';
            heroPriceOld.style.opacity = '1';
            heroPriceOld.style.fontSize = '1.5rem';
            heroPriceOld.style.color = '#374151';
            heroPriceOld.style.textDecoration = 'line-through';
            heroPriceOld.style.fontWeight = '500';
            console.log('🔧 Принудительно обновлена старая цена:', heroPriceOld.textContent);
        } else {
            console.log('❌ Элемент .hero-price .price-old НЕ найден!');
        }
        
        // Ищем и обновляем ВСЕ элементы старой цены
        const allPriceOldElements = document.querySelectorAll('.price-old');
        console.log('🔍 Найдено элементов .price-old:', allPriceOldElements.length);
        
        allPriceOldElements.forEach((element, index) => {
            if (index === 0) { // Первый элемент - это hero-секция
                element.textContent = PROMO_CONFIG.selfTariff.oldPrice;
                element.style.display = 'inline-block';
                element.style.visibility = 'visible';
                element.style.opacity = '1';
                console.log('🔧 Обновлен элемент #' + index + ':', element.textContent);
            }
        });
        
        console.log('🔄 Цены обновлены принудительно');
    }, 500);
});

// Глобальная функция для отладки (можно вызвать из консоли)
window.updatePricesAndDates = updatePricesAndDates;
window.PROMO_CONFIG = PROMO_CONFIG;
window.isPromoActive = isPromoActive;

// Функция для тестирования - установить дату в прошлое для проверки
window.testExpiredPromo = function() {
    PROMO_CONFIG.deadline = '2020-01-01';
    PROMO_CONFIG.deadlineText = '1 января 2020';
    updatePricesAndDates();
    console.log('🧪 Тестирование: акция завершена');
};

// Функция для тестирования - вернуть активную акцию
window.testActivePromo = function() {
    PROMO_CONFIG.deadline = '2025-12-31';
    PROMO_CONFIG.deadlineText = '31 декабря';
    updatePricesAndDates();
    console.log('🧪 Тестирование: акция активна');
};

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    let backgroundColor = '#10b981'; // success - зеленый
    if (type === 'error') backgroundColor = '#ef4444'; // ошибка - красный  
    if (type === 'info') backgroundColor = '#3b82f6'; // информация - синий
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Скрываем через 3 секунды
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Функция для валидации формы
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
        } else {
            field.style.borderColor = '#e5e7eb';
        }
    });
    
    // Валидация email
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#ef4444';
            isValid = false;
        }
    }
    
    // Валидация телефона
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(phoneField.value)) {
            phoneField.style.borderColor = '#ef4444';
            isValid = false;
        }
    }
    
    return isValid;
}



