// Tab functionality for the Get in Touch section
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Set current time for the hours tab
    const updateCurrentTime = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        
        const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
        document.getElementById('current-time').textContent = timeString;
        
        // Update open/closed status
        const statusIndicator = document.querySelector('.status-indicator');
        const statusText = document.querySelector('.status-text');
        
        const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
        const isSaturday = now.getDay() === 6;
        const currentHour = now.getHours();
        
        let isOpen = false;
        
        if (isWeekday && currentHour >= 9 && currentHour < 18) {
            isOpen = true;
        } else if (isSaturday && currentHour >= 9 && currentHour < 13) {
            isOpen = true;
        }
        
        if (isOpen) {
            statusIndicator.classList.add('open');
            statusIndicator.classList.remove('closed');
            statusText.textContent = "We're Currently Open";
        } else {
            statusIndicator.classList.add('closed');
            statusIndicator.classList.remove('open');
            statusText.textContent = "We're Currently Closed";
        }
    };
    
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
});