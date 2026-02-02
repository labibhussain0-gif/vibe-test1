// ===== Finance Blog JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNewsletterForm();
    initHeaderScroll();
    initDynamicTicker();
    initSmoothScroll();
    initCardAnimations();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.getElementById('main-nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
    }
}

// Newsletter Form Handling
function initNewsletterForm() {
    const form = document.getElementById('newsletter-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;

            // Show success message
            const button = form.querySelector('button');
            const originalText = button.textContent;

            button.textContent = '✓ Subscribed!';
            button.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
                form.reset();
            }, 3000);
        });
    }
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// Dynamic News Ticker with 2026 Budget Headlines
function initDynamicTicker() {
    const tickerContent = document.getElementById('ticker-content');

    if (!tickerContent) return;

    // 2026 Budget Headlines - Defence Budget Hike & STT Tax Changes
    const budgetHeadlines = [
        { icon: '🛡️', text: '2026 Defence Budget hiked by 12.9% to ₹6.21 lakh crore - largest allocation ever' },
        { icon: '💹', text: 'STT on F&O trades doubled to 0.02% effective April 2026 - impacts derivative traders' },
        { icon: '⚔️', text: 'Government allocates ₹1.72 lakh crore for defence capital expenditure in 2026' },
        { icon: '📉', text: 'STT changes expected to impact high-frequency traders significantly - experts warn' },
        { icon: '🚀', text: 'Indigenous defence production gets ₹1.05 lakh crore boost in Union Budget 2026' }
    ];

    // Clear existing content and build dynamic ticker
    tickerContent.innerHTML = '';

    // Create ticker items from data array
    function createTickerItems() {
        budgetHeadlines.forEach((headline, index) => {
            const item = document.createElement('span');
            item.className = 'ticker-item';
            item.textContent = `${headline.icon} ${headline.text}`;
            tickerContent.appendChild(item);

            // Add separator after each item
            const separator = document.createElement('span');
            separator.className = 'ticker-separator';
            separator.textContent = '•';
            tickerContent.appendChild(separator);
        });
    }

    // Create initial items and duplicate for seamless loop
    createTickerItems();
    createTickerItems(); // Duplicate for infinite scroll effect

    // Calculate animation duration based on content width
    const contentWidth = tickerContent.scrollWidth;
    const animationDuration = contentWidth / 50; // Adjust speed: lower = faster

    // Apply dynamic animation
    tickerContent.style.animation = `ticker ${animationDuration}s linear infinite`;
}


// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// Card Hover Animations (Intersection Observer)
function initCardAnimations() {
    const cards = document.querySelectorAll('.article-card, .expert-card, .market-card, .trust-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Market data simulation (optional enhancement)
function updateMarketData() {
    const marketCards = document.querySelectorAll('.market-card');

    marketCards.forEach(card => {
        const valueEl = card.querySelector('.market-value');
        const changeEl = card.querySelector('.market-change');

        if (valueEl && changeEl) {
            // Simulate small fluctuations
            const currentChange = parseFloat(changeEl.textContent);
            const fluctuation = (Math.random() - 0.5) * 0.1;
            const newChange = (currentChange + fluctuation).toFixed(2);

            changeEl.textContent = newChange > 0 ? `+${newChange}%` : `${newChange}%`;

            if (parseFloat(newChange) >= 0) {
                card.classList.remove('negative');
                card.classList.add('positive');
            } else {
                card.classList.remove('positive');
                card.classList.add('negative');
            }
        }
    });
}

// Add mobile nav styles dynamically
const mobileNavStyles = document.createElement('style');
mobileNavStyles.textContent = `
    @media (max-width: 768px) {
        .main-nav.active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 15, 26, 0.98);
            backdrop-filter: blur(20px);
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .main-nav.active .nav-list {
            flex-direction: column;
            gap: 0;
        }
        .main-nav.active .nav-link {
            display: block;
            padding: 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }
`;
document.head.appendChild(mobileNavStyles);
