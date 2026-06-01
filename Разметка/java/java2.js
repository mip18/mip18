// Скрипт для галереи скриншотов
    document.addEventListener('DOMContentLoaded', () => {
        const mainScreenshot = document.querySelector('.main-screenshot');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const arrows = document.querySelectorAll('.nav-arrow');
        let currentIndex = 0;

        function updateGallery(index) {
            const newSrc = thumbnails[index].dataset.full;
            mainScreenshot.src = newSrc;
            
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnails[index].classList.add('active');
            currentIndex = index;
        }

        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => updateGallery(index));
        });

        arrows.forEach(arrow => {
            arrow.addEventListener('click', () => {
                const direction = arrow.classList.contains('next') ? 1 : -1;
                let newIndex = currentIndex + direction;
                
                if(newIndex < 0) newIndex = thumbnails.length - 1;
                if(newIndex >= thumbnails.length) newIndex = 0;
                
                updateGallery(newIndex);
            });
        });
    });
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.getElementById('menuToggle');
            const mobileMenu = document.getElementById('mobileMenu');
            const overlay = document.getElementById('overlay');
            
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                overlay.classList.toggle('active');
                
                // Блокировка скролла при открытом меню
                if (mobileMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Закрытие меню при клике на оверлей
            overlay.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                this.classList.remove('active');
                document.body.style.overflow = '';
            });
            
            // Закрытие меню при клике на пункт меню (для мобильной версии)
            const mobileLinks = document.querySelectorAll('.mobile-nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', function() {
                    menuToggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        });