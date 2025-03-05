document.addEventListener('DOMContentLoaded', function() {
    // Initialize Locomotive Scroll
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        lerp: 0.05,
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    // Handle navigation scroll
    document.querySelectorAll('[data-scroll-to]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-scroll-to');
            scroll.scrollTo(target);


        });
    });

    // Update scroll on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            scroll.update();
        }, 250);
    });

    

    // Hero video background
    const heroVideo = document.getElementById('hero-video');

    // Check if video exists
    if (heroVideo) {
        // Ensure video plays on mobile devices
        heroVideo.addEventListener('canplay', function() {
            heroVideo.play().catch(function(error) {
                console.log("Video play failed:", error);
                // If autoplay fails, show a play button or fallback image
                const videoContainer = document.querySelector('.video-container');
                if (videoContainer) {
                    videoContainer.classList.add('video-fallback');
                }
            });
        });

        // Pause video when not in viewport to save resources
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    heroVideo.play().catch(e => console.log("Could not play video:", e));
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(heroVideo);
    }

    // Background image slider for product highlight section
    const slides = document.querySelectorAll('.background-slider .slide');
    let currentSlide = 0;

    function changeSlide() {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Add active class to current slide
        slides[currentSlide].classList.add('active');

        // Increment current slide index
        currentSlide = (currentSlide + 1) % slides.length;
    }

    // Initialize the first slide
    if (slides.length > 0) {
        slides[0].classList.add('active');

        // Change slide every 5 seconds
        setInterval(changeSlide, 5000);
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter-number');

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

    // Create Intersection Observer
    const options = {
        root: null, // use viewport
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of element is visible
    };

    let hasAnimated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                // Reset all counters to 0
                counters.forEach(counter => {
                    counter.textContent = '0';
                });

                // Start animation for each counter
                counters.forEach(counter => {
                    startCounter(counter);
                });

                hasAnimated = true;
                observer.disconnect(); // Stop observing after animation starts
            }
        });
    }, options);

    // Start observing the counter section
    const counterSection = document.querySelector('.counter-section');
    if (counterSection) {
        observer.observe(counterSection);
    }

    // Testimonials Slider
    const track = document.querySelector('.testimonial-track');
    const items = document.querySelectorAll('.testimonial-item');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevButton = document.querySelector('.prev-btn');
    const nextButton = document.querySelector('.next-btn');
    let currentIndex = 0;

    // Create dots
    items.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % items.length;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        goToSlide(currentIndex);
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Auto slide every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-slide on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Update Locomotive Scroll when all images are loaded
    window.addEventListener('load', () => {
        scroll.update();
    });
});

