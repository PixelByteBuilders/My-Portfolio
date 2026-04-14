// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    // Only run if both elements exist on the page
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            // Toggle the visibility of the menu
            navList.classList.toggle('active-menu');

            // Find the icon inside the bubble to swap it (Bars <-> X)
            const icon = menuToggle.querySelector('i');
            if (navList.classList.contains('active-menu')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close menu when a link is clicked (useful for one-page sites)
        const navLinks = navList.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active-menu');
                const icon = menuToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }
});