// Loader functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body to prevent scrolling
    document.body.classList.add('loading');
});

window.addEventListener('load', function() {
    // Get the loader element
    const loader = document.querySelector('.loader-wrapper');
    
    // Hide the loader after a short delay
    setTimeout(function() {
        loader.classList.add('loader-hidden');
        // Remove loading class from body to allow scrolling
        document.body.classList.remove('loading');
        
        // Remove the loader from DOM after transition completes
        loader.addEventListener('transitionend', function() {
            if (loader.parentNode) {
                loader.parentNode.removeChild(loader);
            }
        });
    }, 800); // Adjust delay as needed
});