
    // Initialize Locomotive Scroll with improved mobile settings
    const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]'),
        smooth: true,
        multiplier: 1,
        lerp: 0.07,
        smartphone: {
            smooth: true,
            multiplier: 0.7,
            lerp: 0.1,
            touchMultiplier: 2.5
        },
        tablet: {
            smooth: true,
            multiplier: 0.8,
            lerp: 0.09,
            touchMultiplier: 2
        },
        reloadOnContextChange: true,
        gestureDirection: 'both'
    });

    // Handle resize events to update scroll
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            scroll.update();
        }, 250);
    });

    // Ensure scroll is updated when all content is loaded
    window.addEventListener('load', () => {
        scroll.update();
    });

    // Fix for iOS momentum scrolling
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
