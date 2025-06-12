// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();

    // Initialize all components
    initInterfaceCarousel();
    initStatsAnimation();
    initScrollAnimations();
    initRippleEffect();
    initSmoothScrolling();
    initParallaxEffect();
    initHeaderScrollEffect();
});

// Interface Carousel
function initInterfaceCarousel() {
    const interfaces = [
        {
            title: "OCR Musical Inteligente",
            description: "Sube una foto de tu partitura y nuestra IA la convierte automáticamente en formato digital editable",
            features: [
                "Reconocimiento 99.8% preciso",
                "Soporte para escritura a mano",
                "Corrección automática de errores"
            ],
            image: "https://zkmgvocohtfcqygudgjd.supabase.co/storage/v1/object/public/landing//Group%2040.png"
        },
        {
            title: "Editor Colaborativo en Tiempo Real",
            description: "Edita partituras con músicos de todo el mundo simultáneamente, como Google Docs pero para música",
            features: [
                "Edición simultánea",
                "Chat integrado",
                "Historial de cambios"
            ],
            image: "https://zkmgvocohtfcqygudgjd.supabase.co/storage/v1/object/public/landing//git.png"
        },
        {
            title: "Repositorio Musical con Git",
            description: "Versiona tus composiciones, crea ramas para experimentar y fusiona cambios fácilmente",
            features: [
                "Control de versiones",
                "Branches y merges",
                "Pull requests musicales"
            ],
            image: "https://zkmgvocohtfcqygudgjd.supabase.co/storage/v1/object/public/landing//Frame.png"
        },
        {
            title: "Reproducción con IA",
            description: "Escucha tus composiciones con instrumentos virtuales realistas y ajustes automáticos de tempo",
            features: [
                "Instrumentos realistas",
                "Mezcla automática",
                "Exportación a audio"
            ],
            image: "https://zkmgvocohtfcqygudgjd.supabase.co/storage/v1/object/public/landing//Frame409.png"
        }
    ];

    let currentInterface = 0;

    const interfaceTitle = document.querySelector('.interface-title');
    const interfaceDescription = document.querySelector('.interface-description');
    const interfaceFeatures = document.querySelector('.interface-features');
    const interfaceCounter = document.querySelector('.interface-counter');
    const interfaceImage = document.querySelector('.mockup-content');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevInterface');
    const nextBtn = document.getElementById('nextInterface');

    function updateInterface(index) {
        const current = interfaces[index];

        // Update content with fade effect
        const content = document.querySelector('.interface-content'); 
        console.log("Found mockup-content:", interfaceImage);
        if (!interfaceImage) {
            console.error("mockup-content not found at updateInterface()");
        }
        content.style.opacity = '0';

        setTimeout(() => {
            interfaceTitle.textContent = current.title;
            interfaceDescription.textContent = current.description;
            interfaceCounter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(interfaces.length).padStart(2, '0')}`;

            // Update features
            interfaceFeatures.innerHTML = '';
            current.features.forEach(feature => {
                const li = document.createElement('li');
                li.textContent = feature;
                interfaceFeatures.appendChild(li);
            });

            interfaceImage.innerHTML = `<img src="${current.image}" alt="${current.title}" class="mockup-image" />`;
            console.log("Image HTML:", interfaceImage.innerHTML);
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });

            content.style.opacity = '1';
        }, 150);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        currentInterface = (currentInterface - 1 + interfaces.length) % interfaces.length;
        updateInterface(currentInterface);
    });

    nextBtn.addEventListener('click', () => {
        currentInterface = (currentInterface + 1) % interfaces.length;
        updateInterface(currentInterface);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentInterface = index;
            updateInterface(currentInterface);
        });
    });

    // Auto-advance carousel
    setInterval(() => {
        currentInterface = (currentInterface + 1) % interfaces.length;
        updateInterface(currentInterface);
    }, 6000);
}

// Stats Animation
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function animateStats() {
        if (animated) return;
        animated = true;

        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            const duration = 2000;
            const steps = 60;
            const stepValue = target / steps;
            const stepTime = duration / steps;

            let current = 0;
            let step = 0;

            const timer = setInterval(() => {
                step++;
                const progress = step / steps;
                const easeOut = 1 - Math.pow(1 - progress, 3);
                current = Math.floor(target * easeOut);

                stat.textContent = current.toLocaleString();

                if (step >= steps) {
                    clearInterval(timer);
                    stat.textContent = target.toLocaleString();
                }
            }, stepTime);
        });
    }

    // Trigger animation when stats section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
        .section-header,
        .feature-card,
        .value-card,
        .timeline-item,
        .interface-card
    `);

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Ripple Effect for Buttons
function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple CSS
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effect for Hero Background
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const floatingNotes = document.querySelectorAll('.floating-note');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        floatingNotes.forEach((note, index) => {
            const speed = 0.2 + (index * 0.1);
            note.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScrollHandler = debounce(() => {
    // Handle scroll events here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);