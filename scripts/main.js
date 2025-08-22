/**
 * Manages the theme (dark/light mode).
 * Handles theme toggling and persists the choice in localStorage.
 */
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = document.getElementById('themeIcon');
        this.currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }

    setTheme(theme) {
        // Set theme attribute on the root element
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        this.currentTheme = theme;
        this.updateIcon();

        const mobileScreen = document.querySelector('.mobile-screen');
        if (mobileScreen) {
            if (theme === 'dark') {
                mobileScreen.style.backgroundColor = '#0d121e';
            } else {
                mobileScreen.style.backgroundColor = '#f0f1f5';
            }
        }
    }

    updateIcon() {
        if (!this.themeIcon || !this.themeToggle) return;
        // Set sun icon for light mode, moon for dark mode
        const newIcon = this.currentTheme === 'dark' ? 'sun' : 'moon';
        this.themeIcon.setAttribute('data-feather', newIcon);
        feather.replace(); // Re-render Feather icons
    }

    toggleTheme() {
        this.setTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
    }

    init() {
        this.setTheme(this.currentTheme);
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        // Listen for OS theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            // Only applies if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

/**
 * Manages language and translations (RTL/LTR).
 * Reads from translationsData and updates the DOM.
 */
class LanguageManager {
    constructor(translations) {
        this.langToggle = document.getElementById('langToggle');
        this.langText = document.getElementById('langText');
        this.translations = translations;
        this.currentLang = localStorage.getItem('language') || 'fa';
    }

    applyLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
        this.updateContent();
        this.updateToggleText();
    }

    getNestedTranslation(key) {
        // Safely access nested keys like 'nav.home'
        return key.split('.').reduce((obj, k) => obj && obj[k], this.translations[this.currentLang]);
    }

    updateContent() {
        // Handle elements with data-translate for innerHTML
        document.querySelectorAll('[data-translate]').forEach(el => {
            const key = el.getAttribute('data-translate');
            const text = this.getNestedTranslation(key);
            if (text !== undefined) {
                if (el.tagName === 'META') {
                    el.setAttribute('content', text);
                } else {
                    el.innerHTML = text;
                }
            }
        });

        // Handle elements with data-translate-placeholder for placeholder text
        document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
            const key = el.getAttribute('data-translate-placeholder');
            const text = this.getNestedTranslation(key);
            if (text !== undefined) {
                el.placeholder = text;
            }
        });
    }

    updateToggleText() {
        if (!this.langText) return;
        this.langText.textContent = this.currentLang === 'fa' ? 'EN' : 'FA';
    }

    toggleLanguage() {
        const newLang = this.currentLang === 'fa' ? 'en' : 'fa';
        this.applyLanguage(newLang);
    }

    init() {
        if (this.langToggle) {
            this.langToggle.addEventListener('click', () => this.toggleLanguage());
        }
        this.applyLanguage(this.currentLang);
    }
}

/**
 * Manages all UI interactions and animations.
 */
class UIManager {
    constructor() {
        this.navbar = document.getElementById('mainNavbar');
        this.preloader = document.getElementById('preloader');
        this.navbarToggler = document.getElementById('navbarToggler');
        this.navbarMenu = document.querySelector('.navbar-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        const nav = document.getElementById('navbar-nav');
        if (nav) {
            this.navIndicator = document.createElement('div');
            this.navIndicator.className = 'nav-indicator';
            nav.appendChild(this.navIndicator);
        }
    }

    // Handles navbar scroll effects and active link indicator.
    handleNavbar() {
        if (!this.navIndicator) return;

        const updateIndicator = (el) => {
            if (!el) return;
            this.navIndicator.style.width = `${el.offsetWidth}px`;
            this.navIndicator.style.left = `${el.offsetLeft}px`;
            this.navLinks.forEach(link => link.classList.remove('active'));
            el.classList.add('active');
        };

        this.navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => updateIndicator(link));
        });

        const navList = document.querySelector('.navbar-nav');
        if (navList) {
            navList.addEventListener('mouseleave', () => {
                const currentActive = document.querySelector('.nav-link.active');
                updateIndicator(currentActive);
            });
        }

        window.addEventListener('scroll', () => {
            if (this.navbar) {
                this.navbar.classList.toggle('scrolled', window.scrollY > 50);
            }

            let currentSectionId = '';
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 100) {
                    currentSectionId = section.getAttribute('id');
                }
            });
            const activeLink = document.querySelector(`.nav-link[href*="${currentSectionId}"]`);
            if (activeLink) updateIndicator(activeLink);
        }, { passive: true });

        // Set initial indicator position after a short delay
        setTimeout(() => updateIndicator(document.querySelector('.nav-link.active')), 100);
    }

    // Handles reveal-on-scroll animations for sections.
    handleRevealAnimations() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }

    // Handles mobile menu toggling.
    handleMobileMenu() {
        if (!this.navbarToggler || !this.navbarMenu) return;
        this.navbarToggler.addEventListener('click', e => {
            e.stopPropagation();
            this.navbarMenu.classList.toggle('active');
        });
        document.addEventListener('click', e => {
            if (this.navbarMenu.classList.contains('active') && !this.navbarMenu.contains(e.target) && e.target !== this.navbarToggler) {
                this.navbarMenu.classList.remove('active');
            }
        });
    }

    // Hides the preloader.
    hidePreloader() {
        if (this.preloader) {
            this.preloader.classList.add('hidden');
        }
    }

    // Initializes all UI functionalities.
    init() {
        this.handleNavbar();
        this.handleRevealAnimations();
        this.handleMobileMenu();
    }
}

/**
 * Main application class to initialize all modules.
 */
class AmlakyarApp {
    constructor() {
        this.uiManager = new UIManager();
        this.themeManager = new ThemeManager();
        this.languageManager = new LanguageManager(window.translationsData || {});
    }

    init() {
        // Hide body initially to prevent flash of unstyled content
        document.body.style.opacity = 0;
        feather.replace();
        this.themeManager.init();
        this.languageManager.init();
        this.uiManager.init();

        // On window load, hide preloader and trigger entry animations
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.uiManager.hidePreloader();
                document.body.style.transition = 'opacity 0.5s ease';
                document.body.style.opacity = 1;
                // Set animation delays from HTML attributes
                document.querySelectorAll('.initial-load-animation').forEach(el => {
                    const delay = el.getAttribute('data-animation-delay') || '0';
                    el.style.setProperty('--delay', `${delay}s`);
                });
            }, 100);
        });
    }
}

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    if (typeof translationsData !== 'undefined') {
        const app = new AmlakyarApp();
        app.init();
    } else {
        console.error("Translation data not found. Make sure translations.js is loaded before main.js");
    }
});