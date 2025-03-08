// Add this to your existing script.js file

// Function to start the counter animation
function startCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds
    let start = 0;
    let startTime = null;

    function updateCounter(currentTime) {
        if (!startTime) startTime = currentTime;

        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        const currentValue = Math.floor(progress * (target - start) + start);
        counter.textContent = currentValue;

        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    }

    requestAnimationFrame(updateCounter);
}

// Create Intersection Observer for counter animations
const options = {
    root: null, // use viewport
    rootMargin: '0px',
    threshold: 0.2 // trigger when 20% of element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const countersInView = entry.target.querySelectorAll('.delivery-number');
            countersInView.forEach(counter => {
                startCounter(counter);
            });
            observer.unobserve(entry.target);
        }
    });
}, options);

// Observe deliveries section
const deliveriesSection = document.querySelector('.deliveries-section');
if (deliveriesSection) {
    observer.observe(deliveriesSection);
}

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
    smartphone: {
        smooth: true
    },
    tablet: {
        smooth: true
    }
});

// Counter Animation Function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2500;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuart = t => 1 - (--t) * t * t * t;
    let frame = 0;
    
    const updateCounter = () => {
        frame++;
        const progress = easeOutQuart(frame / totalFrames);
        const current = Math.round(progress * target);
        
        // Format number with commas
        element.textContent = current.toLocaleString();
        
        if (frame < totalFrames) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };
    
    updateCounter();
}

// Intersection Observer for Counter Animation
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !entry.target.hasAttribute('data-counted')) {
                animateCounter(statNumber);
                entry.target.setAttribute('data-counted', 'true');
                
                // Animate the SVG circle
                const circle = entry.target.querySelector('.stat-circle circle');
                if (circle) {
                    circle.style.strokeDashoffset = '0';
                }
            }
        }
    });
}, observerOptions);

// Observe all stat cards
document.querySelectorAll('.stat-card').forEach(card => {
    counterObserver.observe(card);
    
    // Add hover effect for adjacent cards
    card.addEventListener('mouseenter', () => {
        const siblings = Array.from(card.parentElement.children);
        siblings.forEach(sibling => {
            if (sibling !== card) {
                sibling.style.transform = 'scale(0.95)';
                sibling.style.opacity = '0.7';
            }
        });
    });
    
    card.addEventListener('mouseleave', () => {
        const siblings = Array.from(card.parentElement.children);
        siblings.forEach(sibling => {
            sibling.style.transform = '';
            sibling.style.opacity = '';
        });
    });
});

// Parallax effect for stats cards
document.querySelectorAll('.stat-card').forEach((card, index) => {
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = card.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 25;
        const y = (clientY - top - height / 2) / 25;
        
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Smooth reveal animation for stats section
const statsSection = document.querySelector('.delivery-stats');
if (statsSection) {
    const revealStats = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };
    
    const statsObserver = new IntersectionObserver(revealStats, {
        threshold: 0.2
    });
    
    statsObserver.observe(statsSection);
}

// Update counters on scroll
scroll.on('scroll', () => {
    document.querySelectorAll('.stat-number:not([data-counted])').forEach(counter => {
        const rect = counter.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top <= windowHeight * 0.75 && rect.bottom >= windowHeight * 0.25) {
            if (!counter.hasAttribute('data-counted')) {
                animateCounter(counter);
                counter.setAttribute('data-counted', 'true');
            }
        }
    });
});