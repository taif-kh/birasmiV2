// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the notifications button and panel
    const notificationsBtn = document.getElementById('notificationsBtn');
    const notificationsPanel = document.getElementById('notificationsPanel');
    
    // Toggle the notifications panel when the button is clicked
    notificationsBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent the click from propagating to document
        if (notificationsPanel.style.display === 'block') {
            notificationsPanel.style.display = 'none';
        } else {
            notificationsPanel.style.display = 'block';
        }
    });
    
    // Close the panel when clicking anywhere else on the document
    document.addEventListener('click', function(e) {
        if (!notificationsPanel.contains(e.target) && e.target !== notificationsBtn) {
            notificationsPanel.style.display = 'none';
        }
    });
    
    // Handle "Mark all as read" button
    const markAllReadBtn = document.querySelector('.mark-all-read');
    markAllReadBtn.addEventListener('click', function() {
        const unreadNotifications = document.querySelectorAll('.notification-item.unread');
        unreadNotifications.forEach(notification => {
            notification.classList.remove('unread');
        });
        
        // Update notification count
        const countElement = document.querySelector('.notification-count');
        countElement.textContent = '0';
    });
});