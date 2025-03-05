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