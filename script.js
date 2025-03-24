// Создание и анимация звезд
function createStars() {
    const container = document.querySelector('.stars');
    const starCount = 250;

    if (container.children.length < starCount) {
        const starsToAdd = starCount - container.children.length;
        
        for (let i = 0; i < starsToAdd; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            if (Math.random() > 0.8) {
                star.classList.add('bright');
            }
            
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            const duration = 5 + Math.random() * 5;
            star.style.setProperty('--duration', `${duration}s`);
            star.style.animationDelay = `${Math.random() * duration}s`;
            
            star.addEventListener('animationend', () => {
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = '0s';
                star.style.animation = 'none';
                star.offsetHeight;
                star.style.animation = `starTravel ${duration}s linear infinite`;
            });
            
            container.appendChild(star);
        }
    }
}

// Переключение табов
function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSection = tab.dataset.section;

            // Обновляем активный таб
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Показываем соответствующую секцию
            sections.forEach(section => {
                if (section.classList.contains(targetSection + '-section')) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
        });
    });
}

// Инициализация при загрузке страницы
window.addEventListener('load', () => {
    createStars();
    initTabs();
    setInterval(createStars, 1000); // Обновление звезд каждые 1 секунды
});

document.addEventListener('DOMContentLoaded', function() {
    const enterScreen = document.getElementById('enterScreen');
    const profileContent = document.getElementById('profileContent');
    const bgImage = document.getElementById('bgImage');
    const orderFormModal = document.getElementById('orderFormModal');
    const closeOrderForm = document.getElementById('closeOrderForm');
    const cancelOrder = document.getElementById('cancelOrder');
    const reduxOrderForm = document.getElementById('reduxOrderForm');
    const successNotification = document.getElementById('successNotification');
    const notificationOkButton = document.getElementById('notificationOkButton');
    const telegramOption = document.getElementById('telegramOption');
    const discordOption = document.getElementById('discordOption');
    
    // Переменная для хранения выбранного типа контакта
    let selectedContactType = '';
    
    // Устанавливаем фоновое изображение
    if (bgImage) {
        bgImage.style.backgroundImage = 'url("back.jpg")';
    }
    
    // Вход на сайт
    enterScreen.addEventListener('click', function() {
        enterScreen.classList.add('fade-out');
        setTimeout(() => {
            enterScreen.style.display = 'none';
            profileContent.classList.remove('hidden');
            profileContent.classList.add('fade-in');
        }, 200);
    });

    // Обработчики для кнопок
    const reviewsButton = document.getElementById('reviewsButton');
    const portfolioButton = document.getElementById('portfolioButton');
    const orderButton = document.getElementById('orderButton');
    
    // Кнопка Reviews - редирект
    if (reviewsButton) {
        reviewsButton.addEventListener('click', function() {
            window.open('https://discord.gg/7FBT69XU7x', '_blank');
        });
    }
    
    // Кнопка Portfolio - редирект
    if (portfolioButton) {
        portfolioButton.addEventListener('click', function() {
            window.open('https://mirz.us', '_blank');
        });
    }
    
    // Кнопка заказа - открываем форму
    if (orderButton) {
        orderButton.addEventListener('click', function() {
            orderFormModal.classList.remove('hidden');
            orderFormModal.classList.add('fade-in');
        });
    }
    
    // Обработка выбора типа контакта
    if (telegramOption) {
        telegramOption.addEventListener('click', function() {
            telegramOption.classList.add('selected');
            discordOption.classList.remove('selected');
            selectedContactType = 'telegram';
            
            const contactInput = document.getElementById('contact');
            contactInput.placeholder = 'Ваш Telegram: @username';
        });
    }
    
    if (discordOption) {
        discordOption.addEventListener('click', function() {
            discordOption.classList.add('selected');
            telegramOption.classList.remove('selected');
            selectedContactType = 'discord';
            
            const contactInput = document.getElementById('contact');
            contactInput.placeholder = 'Ваш Discord: username';
        });
    }
    
    // Закрытие формы заказа
    if (closeOrderForm) {
        closeOrderForm.addEventListener('click', function() {
            closeOrderModal();
        });
    }
    
    if (cancelOrder) {
        cancelOrder.addEventListener('click', function() {
            closeOrderModal();
        });
    }
    
    // Закрытие уведомления об успешной отправке
    if (notificationOkButton) {
        notificationOkButton.addEventListener('click', function() {
            successNotification.classList.add('fade-out');
            setTimeout(() => {
                successNotification.classList.add('hidden');
                successNotification.classList.remove('fade-out');
            }, 200);
        });
    }
    
    // Функция закрытия формы
    function closeOrderModal() {
        orderFormModal.classList.add('fade-out');
        setTimeout(() => {
            orderFormModal.classList.add('hidden');
            orderFormModal.classList.remove('fade-out');
            // Сбрасываем форму
            reduxOrderForm.reset();
            // Сбрасываем выбор контакта
            telegramOption.classList.remove('selected');
            discordOption.classList.remove('selected');
            selectedContactType = '';
        }, 200);
    }
    
    // Функция для кодирования строки в Base64 с поддержкой UTF-8
    function utf8ToBase64(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    // Обработка отправки формы
    if (reduxOrderForm) {
        reduxOrderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверяем выбор типа контакта
            if (!selectedContactType) {
                // Показываем ошибку
                showErrorNotification('Пожалуйста, выберите способ связи (Telegram или Discord)');
                return;
            }
            
            // Получаем значения полей
            const task = document.getElementById('taskDescription').value;
            const deadline = document.getElementById('deadline').value;
            const budget = document.getElementById('budget').value;
            const contact = document.getElementById('contact').value;
            
            // Проверяем заполнение всех полей
            if (!task || !deadline || !budget || !contact) {
                showErrorNotification('Пожалуйста, заполните все поля формы');
                return;
            }
            
            try {
                // Создаем объект данных заказа
                const orderData = {
                    task: task,
                    deadline: deadline,
                    budget: budget,
                    contact: contact,
                    contactType: selectedContactType
                };
                
                // Преобразуем в строку JSON
                const jsonString = JSON.stringify(orderData);
                
                // Кодируем в Base64 с поддержкой UTF-8
                const base64String = utf8ToBase64(jsonString);
                
                // Формируем команду для отправки боту
                const manualCommand = `/start ${base64String}`;
                
                // Закрываем форму
                orderFormModal.classList.add('fade-out');
                setTimeout(() => {
                    orderFormModal.classList.add('hidden');
                    orderFormModal.classList.remove('fade-out');
                    
                    // Сбрасываем форму
                    reduxOrderForm.reset();
                    telegramOption.classList.remove('selected');
                    discordOption.classList.remove('selected');
                    selectedContactType = '';
                    
                    // Обновляем функцию для показа уведомления
                    showOrderConfirmation(manualCommand);
                    
                }, 200);
                
            } catch (error) {
                console.error("Ошибка при формировании заказа:", error);
                showErrorNotification('Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.');
            }
        });
        
        // Функция для показа ошибки
        function showErrorNotification(message) {
            successNotification.querySelector('.notification-icon i').className = 'fas fa-exclamation-triangle';
            successNotification.querySelector('.notification-icon').style.background = 'rgba(180, 60, 60, 0.2)';
            successNotification.querySelector('.notification-icon').style.color = 'rgba(200, 60, 60, 1)';
            successNotification.querySelector('.notification-title').textContent = 'Ошибка!';
            successNotification.querySelector('.notification-message').textContent = message;
            successNotification.querySelector('.notification-button').style.background = 'rgba(180, 60, 60, 0.3)';
            
            successNotification.classList.remove('hidden');
            successNotification.classList.add('fade-in');
        }
    }

    // Обновляем функцию для показа уведомления
    function showOrderConfirmation(command) {
        // Получаем контейнер уведомления
        const notificationContainer = document.getElementById('successNotification');
        
        // Обновляем содержимое уведомления с новой структурой
        notificationContainer.innerHTML = `
            <div class="notification-inner">
                <div class="notification-icon">
                    <i class="fas fa-check"></i>
                </div>
                <h3 class="notification-title">Заказ сформирован</h3>
                <p class="notification-message">
                    Для отправки заказа:
                    <br>1. Нажмите кнопку "Перейти к боту"
                    <br>2. Скопируйте и отправьте команду ниже в чат с ботом:
                </p>
                <div class="command-box">${command}</div>
                <button id="copyCommand" class="copy-button">Скопировать команду</button>
                <button id="openBotButton" class="notification-button">Перейти к боту</button>
            </div>
        `;
        
        // Показываем уведомление
        notificationContainer.classList.remove('hidden');
        notificationContainer.classList.add('fade-in');
        
        // Добавляем обработчики для кнопок
        document.getElementById('copyCommand').addEventListener('click', function() {
            navigator.clipboard.writeText(command).then(() => {
                this.textContent = 'Скопировано!';
                this.style.background = 'rgba(40, 40, 40, 0.2)';
                setTimeout(() => {
                    this.textContent = 'Скопировать команду';
                    this.style.background = '';
                }, 2000);
            });
        });
        
        document.getElementById('openBotButton').addEventListener('click', function() {
            window.open('https://t.me/mirzorders_bot', '_blank');
        });
    }
}); 