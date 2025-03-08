// Video Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const videoModal = document.getElementById('videoModal');
    const playBtn = document.getElementById('playVideo');
    const closeBtn = document.getElementById('closeModal');
    const videoThumbnail = document.querySelector('.video-thumbnail');
    const modalContent = document.querySelector('.modal-content');
    const iframe = document.querySelector('.video-wrapper iframe');

    // Function to handle modal open
    const openModal = () => {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Add animation classes
        modalContent.style.transform = 'scale(0.7)';
        modalContent.style.opacity = '0';
        setTimeout(() => {
            modalContent.style.transform = 'scale(1)';
            modalContent.style.opacity = '1';
        }, 50);
    };

    // Function to handle modal close
    const closeModal = () => {
        modalContent.style.transform = 'scale(0.7)';
        modalContent.style.opacity = '0';
        setTimeout(() => {
            videoModal.classList.remove('active');
            document.body.style.overflow = '';
            // Reset iframe src to stop video
            const src = iframe.src;
            iframe.src = '';
            iframe.src = src;
        }, 300);
    };

    // Event Listeners
    playBtn.addEventListener('click', openModal);
    videoThumbnail.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });

    // Close modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });

    // Smooth reveal animation for video section
    const videoSection = document.querySelector('.video-section');
    const videoText = document.querySelector('.video-text');
    const videoPreview = document.querySelector('.video-preview');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                videoText.style.opacity = '1';
                videoText.style.transform = 'translateX(0)';
                videoPreview.style.opacity = '1';
                videoPreview.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.3
    });

    if (videoSection) {
        observer.observe(videoSection);
    }

    // Initialize animation states
    videoText.style.opacity = '0';
    videoText.style.transform = 'translateX(-50px)';
    videoPreview.style.opacity = '0';
    videoPreview.style.transform = 'translateX(50px)';
    videoText.style.transition = 'all 0.8s ease';
    videoPreview.style.transition = 'all 0.8s ease 0.2s';
});
