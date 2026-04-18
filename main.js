// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');
    const sideNavLinks = document.querySelectorAll('.side-nav a');
    const sections = document.querySelectorAll('main, section');
    const navIcons = document.querySelectorAll('.side-nav .nav-icon');

    // --- 1. Mobile Menu Toggle Logic ---
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active-menu');
            const icon = menuToggle.querySelector('i');
            if (navList.classList.contains('active-menu')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active-menu');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // --- 2. Scroll Spy (Highlight side-nav icons on scroll) ---
    const observerOptions = {
        root: null,
        rootMargin: '-10% 0px -80% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navIcons.forEach(icon => icon.classList.remove('active'));
                const activeLink = document.querySelector(`.side-nav a[href="#${id}"] .nav-icon`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // --- 3. Home Highlight Fallback ---
    window.addEventListener('scroll', () => {
        if (window.scrollY < 100) {
            navIcons.forEach(icon => icon.classList.remove('active'));
            const homeIcon = document.querySelector('.side-nav a[href="#home"] .nav-icon');
            if (homeIcon) homeIcon.classList.add('active');
        }
    });

    // --- 4. Smooth Scrolling with Offset ---
    sideNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const cleanId = targetId.replace('#', '');
            const targetSection = document.getElementById(cleanId);

            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5. Theme Toggle Logic (Dark/Teal Mode) ---
    const themeBtn = document.querySelector('.theme-btn');
    const aboutImg = document.querySelector('.image-card img');
    const avatarImg = document.querySelector('.avatar-section img');

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            // Toggle the light-mode class on body
            document.body.classList.toggle('light-mode');

            // Swap the theme icon
            const tIcon = themeBtn.querySelector('i');
            if (document.body.classList.contains('light-mode')) {
                tIcon.classList.replace('fa-adjust', 'fa-sun');
                
                // Swap images to Teal versions
                if (aboutImg) aboutImg.src = 'img/About-teal.png';
                if (avatarImg) avatarImg.src = 'img/Avatar-teal.png';
            } else {
                tIcon.classList.replace('fa-sun', 'fa-adjust');
                
                // Swap images back to Original versions
                if (aboutImg) aboutImg.src = 'img/About-purple.png';
                if (avatarImg) avatarImg.src = 'img/Avatar.png';
            }

            // Save preference
            const isTealMode = document.body.classList.contains('light-mode');
            localStorage.setItem('theme', isTealMode ? 'teal' : 'dark');
        });
    }

    // Persistence: Check saved theme on load
    if (localStorage.getItem('theme') === 'teal') {
        document.body.classList.add('light-mode');
        const tIcon = themeBtn?.querySelector('i');
        if (tIcon) tIcon.classList.replace('fa-adjust', 'fa-sun');
        if (aboutImg) aboutImg.src = 'img/About-teal.png';
        if (avatarImg) avatarImg.src = 'img/Avatar-teal.png';
    }
});