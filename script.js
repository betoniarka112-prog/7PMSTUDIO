/*
document.addEventListener("DOMContentLoaded", function() {
        
        const menuLinks = document.querySelectorAll('.nav_bar ul li a');

        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                
                const targetId = this.getAttribute('href');

                    if (targetId && targetId.startsWith('#')) {
                    const targetSection = document.querySelector(targetId);

                    if (targetSection) {
                        // --- KONFIGURACJA ---
                        const duration = 550; // CZAS w milisekundach (1500ms = 1.5 sekundy) - ZMIEŃ TUTAJ
                        const offset = 0;    // Korekta (ile pixeli nad sekcją zatrzymać - odpowiednik scroll-margin)
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
*/

function sendMail() {
    // 1. Get the data from inputs
    const params = {
        name: document.getElementById("from_name").value,
        email: document.getElementById("reply_to").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
    };

    // 2. Simple Validation
    if (!params.name || !params.email || !params.message) {
        alert("Proszę wypełnić wszystkie pola!");
        return;
    }

    const btn = document.getElementById("submit_btn");
    btn.innerText = "Wysyłanie...";
    btn.style.opacity = "0.7";

    // 3. Service ID, Template ID, and Public Key from your EmailJS account
    const serviceID = "service_3ppaqoh"; 
    const templateID = "template_uocsgzp";

    emailjs.send(serviceID, templateID, params)
        .then(res => {
            // Clear inputs
            document.getElementById("from_name").value = "";
            document.getElementById("reply_to").value = "";
            document.getElementById("subject").selectedIndex = 0;
            document.getElementById("message").value = "";
            
            console.log(res);
            alert("Wiadomość została wysłana pomyślnie!");
            btn.innerText = "Wyślij wiadomość";
            btn.style.opacity = "1";
        })
        .catch(err => {
            console.log(err);
            alert("Wystąpił błąd podczas wysyłania. Spróbuj ponownie.");
            btn.innerText = "Wyślij wiadomość";
            btn.style.opacity = "1";
        });
}