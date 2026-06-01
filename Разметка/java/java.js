    const hero = document.querySelector('.hero');
    const slides = document.querySelectorAll('.hero-slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 1;
    let dots = [];
    let autoSlideInterval;
    const realSlidesCount = 3;

    document.querySelector('.menu-toggle').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    function createDots() {
        for(let i = 0; i < realSlidesCount; i++) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.innerHTML = `<span class="dot-progress"></span>`;
            dot.addEventListener('click', () => {
                goToSlide(i + 1);
                resetAutoSlide();
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }
    }

    function updateDots() {
        const realIndex = (currentSlide - 1) % realSlidesCount;
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            dot.querySelector('.dot-progress').style.width = '0%';
            if(index === realIndex) {
                dot.classList.add('active');
                dot.querySelector('.dot-progress').style.width = '100%';
            }
        });
    }

    function goToSlide(slideIndex) {
        if(slideIndex >= slides.length - 1) {
            hero.scrollTo({ left: hero.clientWidth, behavior: 'auto' });
            currentSlide = 1;
        } 
        else if(slideIndex <= 0) {
            hero.scrollTo({ left: hero.clientWidth * (slides.length - 2), behavior: 'auto' });
            currentSlide = slides.length - 2;
        } 
        else {
            currentSlide = slideIndex;
            hero.scrollTo({
                left: hero.clientWidth * currentSlide,
                behavior: 'smooth'
            });
        }
        updateDots();
    }

    hero.addEventListener('scroll', () => {
        const scrollPos = hero.scrollLeft;
        currentSlide = Math.round(scrollPos / hero.clientWidth);
        
        if(currentSlide === slides.length - 1) {
            hero.scrollTo({ left: hero.clientWidth, behavior: 'auto' });
            currentSlide = 1;
        } 
        else if(currentSlide === 0) {
            hero.scrollTo({ left: hero.clientWidth * (slides.length - 2), behavior: 'auto' });
            currentSlide = slides.length - 2;
        }
        
        updateDots();
        resetAutoSlide();
    });

    createDots();
    updateDots();
    startAutoSlide();
    hero.scrollTo({ left: hero.clientWidth, behavior: 'auto' });

    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
        resetAutoSlide();
    });

    document.querySelectorAll('.slide-local-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const isNext = e.target.classList.contains('next-btn');
            goToSlide(currentSlide + (isNext ? 1 : -1));
            resetAutoSlide();
        });
    });
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
