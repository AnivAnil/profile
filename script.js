// ===== MOBILE HAMBURGER MENU =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    const navFlex = document.querySelector('.nav-flex');
    const navLinks = document.querySelector('.nav-links');
    if (navFlex && navLinks) {
        // Insert hamburger before nav-links
        navFlex.insertBefore(hamburger, navLinks);
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
            this.innerHTML = navLinks.classList.contains('open') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }

    // ===== FADE-IN ANIMATIONS (Intersection Observer) =====
    const cards = document.querySelectorAll('.service-card, .bpo-item, .tool-card, .testimonial-card, .card-glass');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // ===== CONTACT FORM HANDLER =====
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('cname').value.trim();
            const email = document.getElementById('cemail').value.trim();
            const msg = document.getElementById('cmsg').value.trim();
            const status = document.getElementById('formStatus');

            if (!name || !email || !msg) {
                status.innerHTML = '⚠️ Please fill in all required fields.';
                status.style.color = '#fdcb6e';
                return;
            }
            if (!email.includes('@')) {
                status.innerHTML = '⚠️ Please enter a valid email address.';
                status.style.color = '#fdcb6e';
                return;
            }

            const subject = `Inquiry from ${name} (QualiTestHub)`;
            const body = `Name: ${name}%0AEmail: ${email}%0ASubject: ${document.getElementById('csubject').value}%0AMessage: ${msg}`;
            window.location.href = `mailto:qualitesthub@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            status.innerHTML = '✅ Opening your mail client... Thank you!';
            status.style.color = '#00b894';
            setTimeout(() => {
                form.reset();
                status.innerHTML = '';
            }, 2000);
        });
    }
});
