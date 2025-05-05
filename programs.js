// 프로그램 페이지 전용 자바스크립트

document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('hidden');
        });
    }

    // 일정 탭 기능
    const dayTabs = document.querySelectorAll('.day-tab');
    const dayContents = document.querySelectorAll('.day-content');
    
    if (dayTabs.length > 0 && dayContents.length > 0) {
        dayTabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // 탭 활성화
                dayTabs.forEach(t => {
                    t.classList.remove('bg-secondary-700', 'text-white');
                    t.classList.add('bg-gray-200', 'text-gray-700');
                });
                this.classList.remove('bg-gray-200', 'text-gray-700');
                this.classList.add('bg-secondary-700', 'text-white');
                
                // 컨텐츠 표시
                dayContents.forEach(c => c.classList.add('hidden'));
                dayContents[index].classList.remove('hidden');
            });
        });
    }

    // 스크롤 시 스티키 헤더 효과
    const header = document.querySelector('header');
    const tabSection = document.querySelector('.tab-button').closest('section');
    
    if (header && tabSection) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 탭 앵커 링크 처리
    // URL에서 앵커 확인
    const hash = window.location.hash;
    if (hash) {
        // 해당 섹션으로 스크롤 (헤더 높이 고려)
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(function() {
                const headerHeight = document.querySelector('header').offsetHeight + 
                                    document.querySelector('.tab-button').closest('section').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }, 300); // 페이지 로딩 후 약간의 지연 시간을 두고 스크롤
        }
    }
    
    // 각 탭 링크 클릭 이벤트
    const tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('header').offsetHeight + 
                                        document.querySelector('.tab-button').closest('section').offsetHeight;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                    window.location.hash = targetId;
                }
            });
        });
    }

    // 프로그램 카드 효과
    const programCards = document.querySelectorAll('.program-card');
    if (programCards.length > 0) {
        programCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('transform', 'scale-105', 'shadow-lg');
                this.classList.remove('shadow-md');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('transform', 'scale-105', 'shadow-lg');
                this.classList.add('shadow-md');
            });
        });
    }

    // 프로그램 섹션 스크롤 감지 및 해당 탭 활성화
    const programSections = document.querySelectorAll('section[id]');
    const scrollSpy = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 3;
        
        programSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // 해당 섹션에 맞는 탭 활성화
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('bg-primary-200', 'font-bold');
                    
                    if (btn.getAttribute('href') === `#${sectionId}`) {
                        btn.classList.add('bg-primary-200', 'font-bold');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', scrollSpy);
    
    // 초기 스크롤 상태에서도 탭 활성화 확인
    scrollSpy();

    // 이미지 지연 로딩
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // 프로그램 상세 정보 토글
    const detailsToggles = document.querySelectorAll('.details-toggle');
    if (detailsToggles.length > 0) {
        detailsToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.classList.toggle('hidden');
                    // 아이콘 변경
                    const icon = this.querySelector('svg');
                    if (icon) {
                        if (targetElement.classList.contains('hidden')) {
                            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />';
                        } else {
                            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />';
                        }
                    }
                }
            });
        });
    }
});
