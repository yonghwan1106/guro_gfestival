// 메인 자바스크립트 파일

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('hidden');
        });
    }

    // 스크롤 이벤트에 따른 헤더 스타일 변경
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 스크롤 애니메이션
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    if (fadeElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0)';
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });
    }

    // 카운트다운 타이머 (축제 날짜까지)
    const countdownElement = document.getElementById('countdown');
    
    if (countdownElement) {
        const festivalDate = new Date('2025-09-26T00:00:00+09:00'); // 축제 시작일
        
        function updateCountdown() {
            const now = new Date();
            const distance = festivalDate - now;
            
            // 시간 계산
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // HTML 업데이트
            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${days}</span>
                    <span class="countdown-label">일</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${hours}</span>
                    <span class="countdown-label">시간</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${minutes}</span>
                    <span class="countdown-label">분</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${seconds}</span>
                    <span class="countdown-label">초</span>
                </div>
            `;
            
            // 축제가 시작되었으면 메시지 변경
            if (distance < 0) {
                countdownElement.innerHTML = '<div class="text-xl font-bold">축제가 시작되었습니다!</div>';
            }
        }
        
        // 초기 실행 및 1초마다 업데이트
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // 프로그램 소개에 사용할 간단한 슬라이더
    const sliderContainer = document.querySelector('.program-slider');
    
    if (sliderContainer) {
        const slides = sliderContainer.querySelectorAll('.program-slide');
        const prevBtn = document.getElementById('slider-prev');
        const nextBtn = document.getElementById('slider-next');
        
        let currentSlide = 0;
        
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // 초기 슬라이드 표시
        showSlide(currentSlide);
        
        // 이벤트 리스너 추가
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        // 자동 슬라이드 (선택 사항)
        /*
        setInterval(() => {
            nextSlide();
        }, 5000);
        */
    }

    // 뉴스레터 폼 제출 처리
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // 여기에 실제 폼 제출 코드를 추가 (AJAX 요청 등)
                // 임시 처리:
                const formWrapper = this.querySelector('.form-wrapper');
                formWrapper.innerHTML = '<div class="text-center py-4"><p class="text-lg font-medium">구독해 주셔서 감사합니다!</p><p>최신 소식을 이메일로 받아보실 수 있습니다.</p></div>';
            }
        });
    }

    // 언어 변경 기능
    const langButtons = document.querySelectorAll('.lang-button');
    
    if (langButtons.length > 0) {
        langButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const lang = this.getAttribute('data-lang');
                
                // 선택된 언어 버튼 스타일 변경
                langButtons.forEach(btn => {
                    btn.classList.remove('active-lang');
                });
                this.classList.add('active-lang');
                
                // 실제 사이트에서는 언어 변경 기능 구현
                console.log(`언어가 ${lang}(으)로 변경되었습니다.`);
                
                // localStorage에 언어 설정 저장 (나중에 사용)
                localStorage.setItem('preferredLanguage', lang);
            });
        });
        
        // 저장된 언어 설정 불러오기
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            const langBtn = document.querySelector(`.lang-button[data-lang="${savedLang}"]`);
            if (langBtn) langBtn.classList.add('active-lang');
        } else {
            // 기본값은 한국어
            const koLangBtn = document.querySelector('.lang-button[data-lang="ko"]');
            if (koLangBtn) koLangBtn.classList.add('active-lang');
        }
    }

    // 이미지 지연 로딩
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// AOS (Animate On Scroll) 스타일 애니메이션 설정
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
}
