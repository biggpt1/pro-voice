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

// Обработка формы
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Формируем сообщение для Telegram
    const message = `🎯 Новая заявка на курс "ПРО ГОЛОС"
    
👤 Имя: ${data.name}
📧 Email: ${data.email}
📱 Телефон: ${data.phone}
💬 Telegram: @${data.telegram}
🎯 Тариф: ${data.tariff === 'self' ? 'Самостоятельный (4 499 ₽)' : 'С куратором (9 499 ₽)'}`;
    
    // Открываем Telegram с готовым сообщением
    const telegramUrl = `https://t.me/vladamamedova?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
    
    // Также отправляем через Яндекс.Форму (если нужно)
    submitToYandexForm(data);
    
    alert('Спасибо за интерес к курсу! Мы открыли Telegram с готовым сообщением. Отправьте его, и мы свяжемся с вами в ближайшее время.');
    closeModal();
    this.reset();
});

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
let currentSlide = 0;
const slidesPerView = window.innerWidth <= 768 ? 1 : (window.innerWidth <= 1024 ? 2 : 3);
let totalSlides = 0;

function initCarousel() {
    const track = document.getElementById('requestsTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const cards = track.children;
    
    totalSlides = Math.ceil(cards.length / slidesPerView);
    
    // Создаем точки навигации
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    updateCarousel();
}

function moveCarousel(direction) {
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    updateCarousel();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateCarousel();
}

function updateCarousel() {
    const track = document.getElementById('requestsTrack');
    const dots = document.querySelectorAll('.dot');
    const cardWidth = 350 + 20; // ширина карточки + gap
    
    // Обновляем позицию трека
    const offset = -currentSlide * cardWidth * slidesPerView;
    track.style.transform = `translateX(${offset}px)`;
    
    // Обновляем активную точку
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Автоматическое переключение слайдов
function startAutoSlide() {
    setInterval(() => {
        moveCarousel(1);
    }, 5000); // Переключение каждые 5 секунд
}

// Функция для демо-видео
function openDemoVideo() {
    window.open('https://disk.yandex.ru/i/NAqfQjsmyF6ZAw', '_blank');
}

// Функция скачивания программы
function downloadProgram() {
    // Здесь можно добавить ссылку на реальный PDF файл
    alert('Программа курса будет отправлена на ваш email после регистрации');
    openModal();
}

// FAQ функциональность
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Закрываем все открытые FAQ
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Открываем текущий, если он не был активен
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Плавная прокрутка к секциям
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

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
    const deadline = new Date('2025-01-10T23:59:59').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = deadline - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            const countdownElements = document.querySelectorAll('.countdown');
            countdownElements.forEach(el => {
                el.textContent = `${days}д ${hours}ч ${minutes}м до окончания акции`;
            });
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
    initCarousel();
    startAutoSlide();
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
});

// Функция для показа уведомлений
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
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

// Обновляем обработчик формы с валидацией
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!validateForm(this)) {
                showNotification('Пожалуйста, заполните все обязательные поля корректно', 'error');
                return;
            }
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Формируем сообщение для Telegram
            const message = `🎯 Новая заявка на курс "ПРО ГОЛОС"
            
👤 Имя: ${data.name}
📧 Email: ${data.email}
📱 Телефон: ${data.phone}
💬 Telegram: @${data.telegram || 'не указан'}
🎯 Тариф: ${data.tariff === 'self' ? 'Самостоятельный (4 499 ₽)' : 'С куратором (9 499 ₽)'}`;
            
            // Открываем Telegram с готовым сообщением
            const telegramUrl = `https://t.me/vladamamedova?text=${encodeURIComponent(message)}`;
            window.open(telegramUrl, '_blank');
            
            showNotification('Спасибо за заявку! Мы открыли Telegram с готовым сообщением.');
            closeModal();
            this.reset();
        });
    }
});

