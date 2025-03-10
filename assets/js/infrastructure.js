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


// Add this to your existing infrastructure.js file

// Alternative Video Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const videoThumbnailWrapper = document.querySelector('.video-thumbnail-wrapper');
    const videoIframeContainer = document.getElementById('videoIframeContainer');
    
    if (videoThumbnailWrapper && videoIframeContainer) {
        videoThumbnailWrapper.addEventListener('click', function() {
            // Replace with your actual YouTube video ID
            const videoId = 'Uol4IeogBa4?si=tP9071gFHbW7YKL0';
            
            // Create YouTube iframe
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            // Clear the container and add the iframe
            videoIframeContainer.innerHTML = '';
            videoIframeContainer.appendChild(iframe);
            
            // Hide the thumbnail wrapper
            videoThumbnailWrapper.style.opacity = '0';
            setTimeout(() => {
                videoThumbnailWrapper.style.display = 'none';
            }, 300);
        });
    }
    
    // Share button functionality
    const shareVideoButton = document.querySelector('.share-video-button');
    if (shareVideoButton) {
        shareVideoButton.addEventListener('click', function() {
            // You can implement a share modal or use the Web Share API if supported
            if (navigator.share) {
                navigator.share({
                    title: 'Ralin Polymers & Aameya Polymers Corporate Film ( PP / BOPP Bags / Laminates / Pouch Manufacturers )',
                    text: 'Corporate Film of Dewas based Units of Ralin Polymers Pvt. Ltd. & Aameya Polymers LLP - Leading manufacturers of all types of packing materials such as PP and BOPP Bags, Laminate Films, and Pouches. Complete factory walkthrough and detailed video showing excellent manufacturing process and products.',
                    url: window.location.href,
                })
                .catch(console.error);
            } else {
                alert('Share this video: ' + window.location.href);
            }
        });
    }
});