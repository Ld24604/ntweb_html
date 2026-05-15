/* ==================== MAIN JAVASCRIPT ==================== */

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle && menuToggle.checked) {
                menuToggle.checked = false;
            }
        }
    });
});

// Skill progress bar animation when scrolling into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.animation = 'fillBar 1s ease-out forwards';
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Start observing skill items
document.querySelectorAll('.skill-item').forEach(item => {
    observer.observe(item);
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name && email && message) {
            // Simulate form submission
            const button = contactForm.querySelector('.submit-btn');
            const originalText = button.textContent;
            button.textContent = 'Message Sent! ✓';
            button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                button.textContent = originalText;
                button.style.background = '';
            }, 3000);
        }
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const header = document.querySelector('.header');
    const menuToggle = document.getElementById('menu-toggle');
    
    if (menuToggle && menuToggle.checked && !header.contains(e.target)) {
        menuToggle.checked = false;
    }
});
