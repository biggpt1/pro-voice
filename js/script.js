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
    
    // Здесь можно добавить отправку данных на сервер
    console.log('Данные формы:', data);
    
    alert('Спасибо за регистрацию! Мы свяжемся с вами в ближайшее время.');
    closeModal();
    this.reset();
});

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
    const elements = document.querySelectorAll('.benefit-card, .audience-item, .testimonial-card, .bonus-card, .tariff-card');
    
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initCarousel();
    startAutoSlide();
    animateOnScroll();
    
    // Добавляем обработчик изменения размера окна
    window.addEventListener('resize', handleResize);
    
    // Добавляем обработчики для кнопок карусели
    document.querySelector('.carousel-btn.prev').addEventListener('click', () => moveCarousel(-1));
    document.querySelector('.carousel-btn.next').addEventListener('click', () => moveCarousel(1));
});

// Функция для отправки данных формы (можно расширить для интеграции с бэкендом)
function submitForm(formData) {
    // Здесь можно добавить отправку данных на сервер
    // Например, через fetch API или XMLHttpRequest
    
    // Пример:
    /*
    fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Регистрация успешна!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Произошла ошибка при регистрации');
    });
    */
}

// Дополнительные функции для улучшения UX
function addHoverEffects() {
    // Добавляем эффекты наведения для карточек
    const cards = document.querySelectorAll('.benefit-card, .audience-item, .testimonial-card, .bonus-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Функция для отслеживания кликов по кнопкам (аналитика)
function trackButtonClicks() {
    const buttons = document.querySelectorAll('button, .demo-link');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            console.log('Button clicked:', buttonText);
            
            // Здесь можно добавить отправку события в Google Analytics или другую систему аналитики
            // gtag('event', 'click', {
            //     'event_category': 'Button',
            //     'event_label': buttonText
            // });
        });
    });
}

// Инициализация дополнительных функций
document.addEventListener('DOMContentLoaded', function() {
    addHoverEffects();
    trackButtonClicks();
});

