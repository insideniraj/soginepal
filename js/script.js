// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const count = parseInt(counter.innerText);
            const increment = target / 100;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounters(), 20);
            } else {
                counter.innerText = target + '+';
            }
        });
    };

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger counter animation when hero stats are visible
                if (entry.target.classList.contains('hero-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .testimonial-card, .hero-stats');
    animateElements.forEach(el => observer.observe(el));

    // Parallax Effect for Hero Background
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroImage.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Product Card Hover Effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Smooth Reveal Animation for Sections
    const revealSections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(section);
    });

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Form Validation (if contact form exists)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = this.querySelector('input[name="name"]');
            const email = this.querySelector('input[name="email"]');
            const message = this.querySelector('textarea[name="message"]');
            
            let isValid = true;
            
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Valid email is required');
                isValid = false;
            }
            
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            }
            
            if (isValid) {
                // Here you would typically send the form data
                showSuccess('Message sent successfully!');
                this.reset();
            }
        });
    }

    // Utility Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Hardware Categories Modal Functions
    window.showSubcategories = function(category) {
        const modal = document.getElementById('subcategories-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');
        
        const subcategories = {
            connectors: {
                title: 'Connectors',
                items: [
                    { name: 'L Connectors', desc: '90° angle connections' },
                    { name: '180° Connectors', desc: 'Straight line connections' },
                    { name: 'T Connectors', desc: 'Three-way connections' },
                    { name: 'Cross Connectors', desc: 'Four-way connections' },
                    { name: 'U Connectors', desc: 'Channel connections' },
                    { name: 'Flexible Connectors', desc: 'Adjustable angle connections' },
                    { name: 'Pivot Connectors', desc: 'Rotating connections' },
                    { name: 'Glass-to-Glass Connectors', desc: 'Direct glass connections' },
                    { name: 'Glass-to-Wall Connectors', desc: 'Wall mounting connections' },
                    { name: 'Structural Connectors', desc: 'Heavy-duty connections' },
                    { name: 'Waterproof Connectors', desc: 'Sealed connections' },
                    { name: 'Adjustable Connectors', desc: 'Variable angle connections' }
                ]
            },
            brackets: {
                title: 'Brackets',
                items: [
                    { name: 'Wall Brackets', desc: 'Wall mounting brackets' },
                    { name: 'Floor Brackets', desc: 'Floor support brackets' },
                    { name: 'Ceiling Brackets', desc: 'Ceiling mounting brackets' },
                    { name: 'Corner Brackets', desc: 'Corner support brackets' },
                    { name: 'Adjustable Brackets', desc: 'Height adjustable brackets' },
                    { name: 'Heavy Duty Brackets', desc: 'Industrial strength brackets' },
                    { name: 'Decorative Brackets', desc: 'Aesthetically designed brackets' },
                    { name: 'Hidden Brackets', desc: 'Concealed mounting brackets' },
                    { name: 'Swing Brackets', desc: 'Movable brackets' },
                    { name: 'Fixed Brackets', desc: 'Permanent mounting brackets' },
                    { name: 'Multi-Point Brackets', desc: 'Multiple contact brackets' },
                    { name: 'Spring-Loaded Brackets', desc: 'Tension brackets' }
                ]
            },
            handles: {
                title: 'Handles',
                items: [
                    { name: 'Pull Handles', desc: 'Standard pull handles' },
                    { name: 'Push Handles', desc: 'Push-type handles' },
                    { name: 'Lever Handles', desc: 'Lever-operated handles' },
                    { name: 'Round Handles', desc: 'Circular grip handles' },
                    { name: 'Square Handles', desc: 'Square profile handles' },
                    { name: 'Tubular Handles', desc: 'Hollow tube handles' },
                    { name: 'Flush Handles', desc: 'Recessed handles' },
                    { name: 'Ergonomic Handles', desc: 'Comfort grip handles' },
                    { name: 'Designer Handles', desc: 'Decorative handles' },
                    { name: 'Security Handles', desc: 'Lockable handles' },
                    { name: 'Sliding Door Handles', desc: 'Sliding mechanism handles' },
                    { name: 'Emergency Handles', desc: 'Emergency exit handles' }
                ]
            },
            fittings: {
                title: 'Fittings',
                items: [
                    { name: 'Patch Fittings', desc: 'Glass door patch fittings' },
                    { name: 'Spider Fittings', desc: 'Multi-arm fittings' },
                    { name: 'Point Fixed Fittings', desc: 'Single point fittings' },
                    { name: 'Structural Fittings', desc: 'Load-bearing fittings' },
                    { name: 'Tension Fittings', desc: 'Cable tension fittings' },
                    { name: 'Compression Fittings', desc: 'Pressure fittings' },
                    { name: 'Weatherproof Fittings', desc: 'Outdoor fittings' },
                    { name: 'Decorative Fittings', desc: 'Aesthetic fittings' },
                    { name: 'Adjustable Fittings', desc: 'Variable fittings' },
                    { name: 'Quick-Release Fittings', desc: 'Easy removal fittings' },
                    { name: 'Safety Fittings', desc: 'Security fittings' },
                    { name: 'Custom Fittings', desc: 'Made-to-order fittings' }
                ]
            }
        };
        
        if (subcategories[category]) {
            modalTitle.textContent = subcategories[category].title;
            modalBody.innerHTML = '';
            
            subcategories[category].items.forEach(item => {
                const subcategoryItem = document.createElement('div');
                subcategoryItem.className = 'subcategory-item';
                subcategoryItem.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                `;
                modalBody.appendChild(subcategoryItem);
            });
            
            modal.style.display = 'block';
        }
    };
    
    window.closeModal = function() {
        const modal = document.getElementById('subcategories-modal');
        modal.style.display = 'none';
    };
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('subcategories-modal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#e74c3c';
        
        setTimeout(() => {
            errorDiv.remove();
            input.style.borderColor = '';
        }, 3000);
    }

    function showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }

    // Lazy Loading for Images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #D4AF37;
        color: #2C2C2C;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        font-size: 18px;
    `;

    document.body.appendChild(scrollTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Performance Optimization: Debounce Scroll Events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll events
    const debouncedScroll = debounce(() => {
        // Scroll-dependent functions here
    }, 10);

    window.addEventListener('scroll', debouncedScroll);

    // Product Category Tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    const productCategories = document.querySelectorAll('.product-category');
    
    if (categoryTabs.length > 0) {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetCategory = this.getAttribute('data-category');
                
                // Remove active class from all tabs and categories
                categoryTabs.forEach(t => t.classList.remove('active'));
                productCategories.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show target category
                const targetElement = document.getElementById(targetCategory);
                if (targetElement) {
                    targetElement.classList.add('active');
                }
            });
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                const answer = faqItem.querySelector('.faq-answer');
                const icon = this.querySelector('i');
                
                // Close other open FAQ items
                faqQuestions.forEach(q => {
                    if (q !== this) {
                        const otherItem = q.parentElement;
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherIcon = q.querySelector('i');
                        
                        otherAnswer.style.maxHeight = '0';
                        otherIcon.style.transform = 'rotate(0deg)';
                    }
                });
                
                // Toggle current FAQ item
                if (answer.style.maxHeight === '0px' || !answer.style.maxHeight) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    answer.style.maxHeight = '0';
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        });
    }

    // Contact Form Enhancement
    const quoteForm = document.querySelector('#quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Basic validation
            let isValid = true;
            const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'projectType', 'productCategory', 'message'];
            
            requiredFields.forEach(field => {
                const input = this.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    showFormError(input, 'This field is required');
                    isValid = false;
                } else {
                    clearFormError(input);
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('[name="email"]');
            if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
                showFormError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showFormSuccess('Thank you! Your quote request has been submitted successfully. We will get back to you within 24 hours.');
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }

    // Gmail Quote Submission
    const submitQuoteBtn = document.querySelector('#submitQuoteBtn');
    if (submitQuoteBtn) {
        submitQuoteBtn.addEventListener('click', function() {
            // Get all form data
            const form = document.querySelector('#quoteForm');
            const formData = new FormData(form);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate required fields
            let isValid = true;
            const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'projectType', 'productCategory', 'message'];
            
            requiredFields.forEach(field => {
                const input = form.querySelector(`[name="${field}"]`);
                if (!input.value.trim()) {
                    showFormError(input, 'This field is required');
                    isValid = false;
                } else {
                    clearFormError(input);
                }
            });
            
            // Email validation
            const emailInput = form.querySelector('[name="email"]');
            if (emailInput.value.trim() && !isValidEmail(emailInput.value)) {
                showFormError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            if (isValid) {
                // Prepare email content
                const subject = `SOGI Quote Request - ${formObject.projectType} Project`;
                
                let emailBody = `Hello SOGI Team,\n\n`;
                emailBody += `I would like to request a quote for the following project:\n\n`;
                emailBody += `**Project Details:**\n`;
                emailBody += `- Project Type: ${formObject.projectType}\n`;
                emailBody += `- Product Category: ${formObject.productCategory}\n`;
                emailBody += `- Glass Thickness: ${formObject.glassThickness || 'Not specified'}\n`;
                emailBody += `- Estimated Quantity: ${formObject.quantity || 'Not specified'}\n`;
                emailBody += `- Project Timeline: ${formObject.timeline || 'Not specified'}\n`;
                emailBody += `- Budget Range: ${formObject.budget || 'Not specified'}\n\n`;
                emailBody += `**Project Requirements:**\n${formObject.message}\n\n`;
                emailBody += `**Contact Information:**\n`;
                emailBody += `- Name: ${formObject.firstName} ${formObject.lastName}\n`;
                emailBody += `- Company: ${formObject.company || 'Not specified'}\n`;
                emailBody += `- Email: ${formObject.email}\n`;
                emailBody += `- Phone: ${formObject.phone}\n\n`;
                emailBody += `Please provide a detailed quote for this project.\n\n`;
                emailBody += `Best regards,\n${formObject.firstName} ${formObject.lastName}`;
                
                // Encode subject and body for Gmail URL
                const encodedSubject = encodeURIComponent(subject);
                const encodedBody = encodeURIComponent(emailBody);
                
                // Create Gmail compose URL
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=soginepal@gmail.com&su=${encodedSubject}&body=${encodedBody}`;
                
                // Open Gmail in new tab
                window.open(gmailUrl, '_blank');
                
                // Show success message
                showFormSuccess('Gmail opened! Please review and send your quote request to soginepal@gmail.com');
            }
        });
    }

    // Form error and success functions
    function showFormError(input, message) {
        clearFormError(input);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 12px;
            margin-top: 5px;
            display: block;
        `;
        
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#e74c3c';
    }

    function clearFormError(input) {
        const existingError = input.parentNode.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        input.style.borderColor = '';
    }

    function showFormSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.textContent = message;
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 20px 25px;
            border-radius: 10px;
            z-index: 1000;
            max-width: 400px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => successDiv.remove(), 300);
        }, 5000);
    }

    // Add CSS animations for form messages
    const formMessageCSS = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    const formStyle = document.createElement('style');
    formStyle.textContent = formMessageCSS;
    document.head.appendChild(formStyle);
});

// CSS for mobile menu (add to style.css if needed)
const mobileMenuCSS = `
@media (max-width: 768px) {
    .nav-menu {
        position: fixed;
        top: 100%;
        left: 0;
        width: 100%;
        background: rgba(44, 44, 44, 0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        padding: 20px 0;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
        z-index: 998;
    }
    
    .nav-menu.active {
        display: flex;
        transform: translateY(0);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
}
`;

// Add mobile menu CSS to head
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

