// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.getElementById('menuToggle');
    const container = document.querySelector('.container');
    const mainContent = document.querySelector('.main-content');

    // Hamburger menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            container.classList.toggle('sidebar-open');
        });
    }

    // Close sidebar when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Close sidebar on mobile
            if (sidebar) {
                sidebar.classList.remove('active');
            }
            if (container) {
                container.classList.remove('sidebar-open');
            }
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');

            // Get the target section
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Hide all sections
                sections.forEach(section => {
                    section.classList.remove('active');
                    section.style.display = 'none';
                });

                // Show target section with animation
                targetSection.classList.add('active');
                targetSection.style.display = 'block';
                setTimeout(() => {
                    targetSection.style.opacity = '1';
                }, 10);
            }
        });
    });

    // Show the first section (About) by default
    sections.forEach((section, index) => {
        if (index === 0) {
            section.classList.add('active');
            section.style.display = 'block';
            section.style.opacity = '1';
            section.style.transition = 'opacity 0.3s ease';
        } else {
            section.classList.remove('active');
            section.style.display = 'none';
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.3s ease';
        }
    });

    // Close sidebar when clicking outside of it
    document.addEventListener('click', (e) => {
        const isSidebarClick = sidebar && sidebar.contains(e.target);
        const isMenuToggleClick = menuToggle && menuToggle.contains(e.target);
        
        if (!isSidebarClick && !isMenuToggleClick && sidebar && sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            container.classList.remove('sidebar-open');
        }
    });

    // Add smooth scrolling for main content
    if (mainContent) {
        mainContent.addEventListener('scroll', () => {
            // You can add scroll-related animations here
        });
    }

    // Card hover effects are handled by CSS
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 10px 30px rgba(244, 196, 48, 0.1)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = 'none';
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validate form
            if (!fullName || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Create mailto link
            const subject = `New Contact Form Submission from ${fullName}`;
            const body = `Name: ${fullName}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            const mailtoLink = `mailto:kumarpriyansh2005@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Reset form
            contactForm.reset();
        });
    }

    // Smooth section visibility transition
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});

// Add smooth scroll behavior
document.documentElement.scrollBehavior = 'smooth';

// Handle responsive navigation toggle (for mobile)
window.addEventListener('resize', () => {
    // You can add responsive behavior here
});
