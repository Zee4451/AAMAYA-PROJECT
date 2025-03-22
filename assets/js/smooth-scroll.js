// Smooth scrolling functionality for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Get the Locomotive Scroll instance
    // We need to wait a bit to ensure Locomotive Scroll is initialized
    setTimeout(() => {
        // Check if window.locomotiveScroll exists, if not create it
        if (!window.locomotiveScroll) {
            window.locomotiveScroll = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]'),
                smooth: true,
                smartphone: { smooth: true },
                tablet: { smooth: true }
            });
        }
        
        // Get all anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        // Add click event listener to each anchor link
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Use Locomotive Scroll to smoothly scroll to the target
                    window.locomotiveScroll.scrollTo(targetElement);
                }
            });
        });
    }, 100);
});