// Counter Animation Function
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // Animation duration in milliseconds
    const startTime = performance.now();
    const startValue = 0;
    
    // Easing function for smooth animation
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const currentValue = Math.floor(startValue + (target - startValue) * easedProgress);
        
        element.textContent = currentValue.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize Locomotive Scroll instance
document.addEventListener('DOMContentLoaded', function() {
    // Initialize counter animations when Locomotive Scroll is ready
    if (typeof scroll !== 'undefined') {
        // Add scroll event listener for counter animations
        scroll.on('call', function(value, way, obj) {
            if (value === 'fadeIn' && way === 'enter') {
                const counterElement = obj.el;
                const countElements = counterElement.querySelectorAll('.count');
                
                countElements.forEach(function(countElement) {
                    if (!countElement.hasAttribute('data-animated')) {
                        animateCounter(countElement);
                        countElement.setAttribute('data-animated', 'true');
                    }
                });
            }
        });
    }
    
    // Fallback for when Locomotive Scroll is not available
    const handleIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countElements = entry.target.querySelectorAll('.count');
                
                countElements.forEach(countElement => {
                    if (!countElement.hasAttribute('data-animated')) {
                        animateCounter(countElement);
                        countElement.setAttribute('data-animated', 'true');
                    }
                });
                
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Create Intersection Observer
    const counterObserver = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });
    
    // Observe all counter cards
    document.querySelectorAll('.counter-card').forEach(card => {
        counterObserver.observe(card);
    });
});