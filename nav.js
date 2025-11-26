document.addEventListener('DOMContentLoaded', function() {
    // mark active bottom nav links
    try {
        const path = location.pathname.split('/').pop() || 'dashboard.html';
        document.querySelectorAll('.nav-bottom a[data-page]').forEach(a => {
            const page = a.getAttribute('data-page');
            if (page === path) a.classList.add('active'); else a.classList.remove('active');
        });
        // mark side menu links too
        document.querySelectorAll('.side-link').forEach(a => {
            const href = a.getAttribute('href') && a.getAttribute('href').split('/').pop();
            if (href === path) a.classList.add('active'); else a.classList.remove('active');
        });
    } catch (e) {
        // silent
        console.warn('nav.js init error', e);
    }
});
