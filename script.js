// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Плавная прокрутка
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

// Изменение навигации при прокрутке
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Анимация появления элементов при прокрутке
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Наблюдение за элементами для анимации
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .achievement-card, .about-card, .contact-card');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Обработка формы обратной связи
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получение данных формы
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Простая валидация
        if (!name || !phone || !service) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        
        // Формирование сообщения для отправки
        const serviceNames = {
            'individual': 'Индивидуальная тренировка',
            'group': 'Групповая тренировка', 
            'kids': 'Детская секция',
            'competition': 'Подготовка к соревнованиям'
        };
        
        const text = `🏓 Новая заявка на тренировку!
        
👤 Имя: ${name}
📞 Телефон: ${phone}
🏃‍♂️ Тип тренировки: ${serviceNames[service] || service}
${message ? `💬 Сообщение: ${message}` : ''}`;
        
        // Создание ссылки для WhatsApp (замените номер на свой)
        const whatsappUrl = `https://wa.me/79218988574?text=${encodeURIComponent(text)}`;
        
        // Открытие WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Очистка формы
        this.reset();
        showNotification('Заявка отправлена! Перенаправляем в WhatsApp...', 'success');
    });
}

// Функция показа уведомлений
function showNotification(message, type = 'info') {
    // Создание элемента уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 500;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Удаление через 4 секунды
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// Анимация счетчиков в статистике
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + '+';
            }
        }, 40);
    });
}

// Запуск анимации счетчиков при появлении секции
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    heroObserver.observe(heroSection);
}

// Модальное окно с реквизитами
const modal = document.getElementById('requisitesModal');
const requisitesBtn = document.getElementById('requisitesBtn');
const requisitesFooterBtn = document.getElementById('requisitesFooterBtn');
const closeModal = document.getElementById('closeModal');

// Открытие модального окна
if (requisitesBtn) {
    requisitesBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    });
}

// Открытие модального окна из футера
if (requisitesFooterBtn) {
    requisitesFooterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
    });
}

// Закрытие модального окна по крестику
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Возвращаем прокрутку
    });
}

// Закрытие модального окна по клику на фон
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Закрытие модального окна по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Модальное окно для записи на турнир
const tournamentModal = document.getElementById('tournamentModal');
const tournamentBtn = document.getElementById('tournamentBtn');
const closeTournamentModal = document.getElementById('closeTournamentModal');

// Открытие модального окна турнира
if (tournamentBtn) {
    tournamentBtn.addEventListener('click', (e) => {
        e.preventDefault();
        tournamentModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

// Закрытие модального окна турнира по крестику
if (closeTournamentModal) {
    closeTournamentModal.addEventListener('click', () => {
        tournamentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Закрытие модального окна турнира по клику на фон
window.addEventListener('click', (e) => {
    if (e.target === tournamentModal) {
        tournamentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Закрытие модального окна турнира по ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && tournamentModal && tournamentModal.style.display === 'block') {
        tournamentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Обработка формы записи на турнир
const tournamentForm = document.getElementById('tournamentForm');
if (tournamentForm) {
    tournamentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получение данных формы
        const formData = new FormData(this);
        const name = formData.get('name');
        const phone = formData.get('phone');
        const level = formData.get('level');
        const message = formData.get('message');
        
        // Простая валидация
        if (!name || !phone || !level) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        
        // Формирование сообщения для отправки
        const levelNames = {
            'beginner': 'Начинающий',
            'intermediate': 'Средний',
            'advanced': 'Продвинутый',
            'professional': 'Профессиональный'
        };
        
        const text = `🏆 Заявка на участие в турнире!
        
👤 Имя: ${name}
📞 Телефон: ${phone}
🏓 Уровень игры: ${levelNames[level] || level}
${message ? `💬 Дополнительная информация: ${message}` : ''}`;
        
        // Создание ссылки для WhatsApp
        const whatsappUrl = `https://wa.me/79218988574?text=${encodeURIComponent(text)}`;
        
        // Открытие WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Очистка формы
        this.reset();
        
        // Закрытие модального окна
        tournamentModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        showNotification('Заявка на турнир отправлена! Перенаправляем в WhatsApp...', 'success');
    });
}

// Добавление активного класса для навигации
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Добавление CSS для активной ссылки навигации
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #e74c3c !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);