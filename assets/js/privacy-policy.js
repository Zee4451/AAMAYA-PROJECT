document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality for rights section
    const rightItems = document.querySelectorAll('.right-item');
    
    rightItems.forEach(item => {
        const header = item.querySelector('.right-header');
        
        header.addEventListener('click', () => {
            // Toggle active class on the clicked item
            item.classList.toggle('active');
            
            // Close other items
            rightItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
        });
    });
    
    // Smooth scrolling for table of contents links
    const tocLinks = document.querySelectorAll('.toc-links a');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll to the target element with smooth behavior
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});