
document.addEventListener('DOMContentLoaded', function() {
    // Get all "Apply Now" buttons
    const applyButtons = document.querySelectorAll('.btn-apply');
    
    // Add click event listener to each button
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Get the position title from the closest vacancy item
            const vacancyItem = this.closest('.vacancy-item');
            const positionTitle = vacancyItem.querySelector('h3').textContent;
            
            // Set the position in the form
            const positionInput = document.getElementById('position');
            if (positionInput) {
                positionInput.value = positionTitle;
            }
        });
    });

    // Smooth scroll to form
    document.querySelectorAll('a[href="#careerForm"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});