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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// IntersectionObserver para resaltar el enlace activo
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
                title: messages.success[lang] || messages.success.es,
                showConfirmButton: false,
                timer: 2000
            });
            this.reset();
        })
        .catch(error => {
            console.error("Error:", error);
            Swal.fire({
                icon: 'error',
                title: messages.errorTitle[lang] || messages.errorTitle.es,
                text: messages.errorText[lang] || messages.errorText.es,
                showConfirmButton: false,
                timer: 2000
            });
        });
});


// Animación al hacer scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.section');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Animations style
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.5s ease';
});

// Animations
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

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
