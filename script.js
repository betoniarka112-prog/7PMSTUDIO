document.addEventListener("DOMContentLoaded", function() {
    
    const menuLinks = document.querySelectorAll('.sidebar ul li a');

    menuLinks.forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            
            const targetId = this.getAttribute('href');

            if (targetId === '#TOP' || targetId === '#start-strony' || targetId === '#') {
                smoothScrollToTop(1000); // 1000ms = prędkość
            }

            else if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // --- KONFIGURACJA ---
                    const duration = 550; // CZAS w milisekundach (1500ms = 1.5 sekundy) - ZMIEŃ TUTAJ
                    const offset = 100;    // Korekta (ile pixeli nad sekcją zatrzymać - odpowiednik scroll-margin)
                    // --------------------

                    smoothScrollTo(targetSection, duration, offset);
                }
            }
        });
    });
});

// Funkcja obliczająca płynne przejście
function smoothScrollTo(target, duration, offset) {
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        
        // Easing function (ease-in-out) - sprawia, że start i koniec są łagodne
        const run = ease(timeElapsed, startPosition, distance, duration);

        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Funkcja matematyczna dla "miękkiego" ruchu
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Funkcja do przewijania NA SAMĄ GÓRĘ (0px)
function smoothScrollToTop(duration) {
    const startPosition = window.scrollY;
    const distance = -startPosition; // Przewijamy o tyle, ile jesteśmy w dół
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        
        // Easing function (ease-in-out) - sprawia, że start i koniec są łagodne
        const run = ease(timeElapsed, startPosition, distance, duration);

        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Funkcja matematyczna dla "miękkiego" ruchu
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
}