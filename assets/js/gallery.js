document.addEventListener('DOMContentLoaded', function() {
    // Gallery filtering
    const filterButtons = document.querySelectorAll('.gallery-filter .filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
            
            // Update Locomotive Scroll
            if (typeof scroll !== 'undefined') {
                setTimeout(() => {
                    scroll.update();
                }, 350);
            }
        });
    });
    
    // Gallery Modal
    const galleryModal = document.querySelector('.gallery-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalImage = document.querySelector('.modal-image');
    const modalVideo = document.querySelector('.modal-video');
    const modalImageContainer = document.querySelector('.modal-image-container');
    const modalVideoContainer = document.querySelector('.modal-video-container');
    const modalTitle = document.querySelector('.modal-title');
    const modalDescription = document.querySelector('.modal-description');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    
    let currentIndex = 0;
    let filteredItems = [];
    
    // Open modal when clicking on gallery item
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Get currently visible items based on active filter
            const activeFilter = document.querySelector('.gallery-filter .filter-btn.active');
            const filterValue = activeFilter.getAttribute('data-filter');
            
            filteredItems = Array.from(galleryItems).filter(item => {
                return filterValue === 'all' || item.getAttribute('data-category') === filterValue;
            });
            
            // Find index of clicked item in filtered items
            currentIndex = filteredItems.indexOf(this);
            
            // Open modal with clicked item
            openModal(this);
        });
    });
    
    // Close modal when clicking close button or overlay
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Navigate through gallery items
    modalPrev.addEventListener('click', showPrevItem);
    modalNext.addEventListener('click', showNextItem);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!galleryModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevItem();
        } else if (e.key === 'ArrowRight') {
            showNextItem();
        }
    });
    
    // Open modal with gallery item
    function openModal(item) {
        const isVideo = item.classList.contains('video-item');
        const img = item.querySelector('img');
        const title = item.querySelector('.gallery-info h3').textContent;
        const description = item.querySelector('.gallery-info p').textContent;
        
        // Set modal content
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        
        if (isVideo) {
            // Show video container, hide image container
            modalImageContainer.style.display = 'none';
            modalVideoContainer.style.display = 'block';
            
            // Set video source
            const videoId = item.querySelector('.video-data').getAttribute('data-video-id');
            modalVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else {
            // Show image container, hide video container
            modalImageContainer.style.display = 'block';
            modalVideoContainer.style.display = 'none';
            
            // Set image source
            modalImage.src = img.src;
            modalImage.alt = img.alt;
        }
        
        // Show modal
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    function closeModal() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Stop video if playing
        modalVideo.src = '';
    }
    
    // Show previous item
    function showPrevItem() {
        currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
        openModal(filteredItems[currentIndex]);
    }
    
    // Show next item
    function showNextItem() {
        currentIndex = (currentIndex + 1) % filteredItems.length;
        openModal(filteredItems[currentIndex]);
    }
    
    // Initialize gallery with animation
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});