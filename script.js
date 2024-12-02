// Scroll Reveal Animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// Smooth Counter Animation
function animateCounter(element, target) {
    const duration = 2000; // Animation duration in milliseconds
    const start = 0;
    const increment = (target - start) / (duration / 16); // 60fps
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            return;
        }
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
    };
    
    requestAnimationFrame(updateCounter);
}

// Initialize Stats Animation
function initStatsAnimation() {
    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stats = entry.target.querySelectorAll('.stat-number');
                stats.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    if (!stat.hasAttribute('data-animated')) {
                        animateCounter(stat, target);
                        stat.setAttribute('data-animated', 'true');
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px'
    });

    observer.observe(statsContainer);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initStatsAnimation();
    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Add fadeIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});

// Reinitialize on dynamic content changes
window.addEventListener('load', () => {
    initStatsAnimation();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Parallax Effect for Hero Section
function parallaxHero() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}

// Form Validation and Animation
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('.submit-button');
        submitBtn.innerHTML = '<span class="loading"></span>Sending...';
        submitBtn.disabled = true;
    });
}

// Initialize all animations
window.addEventListener('load', () => {
    // Add reveal class to elements
    document.querySelectorAll('.service-card, .about-content, .stat-item, .contact-info').forEach(el => {
        el.classList.add('reveal');
    });
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
        revealOnScroll();
        parallaxHero();
    });
});

// Intersection Observer for better performance
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// Progress bar animation
function initProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                if (progressBar) {
                    const width = progressBar.dataset.width || 0;
                    progressBar.style.width = width + '%';
                }
            }
        });
    }, { threshold: 0.3 });

    // Observe all progress bars
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const progress = bar.querySelector('.progress');
        if (progress) {
            progress.style.width = '0%';
            observer.observe(bar);
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initProgressBars();
});

// Reinitialize on page load (for dynamic content)
window.addEventListener('load', () => {
    initProgressBars();
});

// Handle Navigation Scroll Effect
function handleNavScroll() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleNavScroll);

// Navigation scroll effect
// window.addEventListener('scroll', function() {
//     const nav = document.querySelector('nav');
//     if (window.scrollY > 100) {
//         nav.classList.add('scrolled');
//     } else {
//         nav.classList.remove('scrolled');
//     }
// });
