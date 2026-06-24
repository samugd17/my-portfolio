// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const yearEl = document.getElementById('year');
const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");

// Set current year in footer
yearEl.textContent = new Date().getFullYear();

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Highlight active nav link on scroll
const observerOptions = {
    root: null,
    rootMargin: '-120px 0px -60% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinksItems.forEach(item => {
                const link = item.querySelector('a');
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

document.querySelectorAll('section[id]').forEach(section => {
    observer.observe(section);
});

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            card.style.display = (filter === 'all' || card.getAttribute('data-category') === filter)
                ? 'block'
                : 'none';
        });
    });
});

// Contact form submission (EmailJS + SweetAlert)
if (contactForm && window.emailjs) {
    emailjs.init("4ez17r0ajw3xc07_w");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const lang = document.documentElement.lang;
        const messages = {
            success: {
                es: "¡Mensaje enviado con éxito!",
                en: "Message sent successfully!"
            },
            errorTitle: {
                es: "Ups...",
                en: "Oops..."
            },
            errorText: {
                es: "¡El mensaje no ha podido ser enviado!, puedes contactarme directamente a través de mi correo electrónico: samuglezdiaz@gmail.com",
                en: "The message could not be sent! You can contact me directly at: samuglezdiaz@gmail.com"
            }
        };

        emailjs.sendForm("service_jxnnjbe", "template_lvbamhw", this)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: messages.success[lang],
                    showConfirmButton: false,
                    timer: 2500
                });
                this.reset();
            })
            .catch(error => {
                console.error("Error:", error);
                Swal.fire({
                    icon: 'error',
                    title: messages.errorTitle[lang],
                    text: messages.errorText[lang],
                    showConfirmButton: false,
                    timer: 2500
                });
            });
    });
}


// Reveal sections on scroll (hidden state set here so it degrades gracefully without JS)
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
    });
}, { rootMargin: '0px 0px -100px 0px' });

sections.forEach(section => revealObserver.observe(section));

// Modal
function openModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.addEventListener("click", function (event) {
    if (event.target === modal) {
        closeModal();
    }
});
