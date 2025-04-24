// Search Bar
$(document).ready(function () {
    $('#find-jobs').click(function () {
        const searchTerm = $('#search-bar').val().toLowerCase().trim();

        
        $('.card').each(function () {
            const jobTitle = $(this).find('.card-detail').text().toLowerCase();
            const companyName = $(this).find('h3').text().toLowerCase();

            if (jobTitle.includes(searchTerm) || companyName.includes(searchTerm)) {
                $(this).show(); 
            } else {
                $(this).hide(); 
            }
        });
    });

    
    $('#search-bar').on('keypress', function (e) {
        if (e.key === 'Enter') {
            $('#find-jobs').click(); 
        }
    });
});






// Recommendation buttons
$(document).ready(function () {
    // Original filtering functionality
    $('.btn-filter').click(function () {
        // First, update active class
        $('.btn-filter').removeClass('active');
        $(this).addClass('active');
        
        const filterText = $(this).text().trim().toLowerCase();

        if (filterText === "all") {
            $('.card').show();
        } else {
            $('.card').each(function () {
                const jobDetail = $(this).find('.card-detail').text().toLowerCase();

                if (jobDetail.includes(filterText)) {
                    $(this).show(); 
                } else {
                    $(this).hide(); 
                }
            });
        }
    });
    
    // New scrolling functionality for filter buttons
    const filterButtons = $('.filter');
    const leftArrow = $('.left-arrow');
    const rightArrow = $('.right-arrow');
    
    let scrollPosition = 0;
    const scrollAmount = 200; // Adjust this value as needed
    
    // Function to update arrow visibility based on scroll position
    function updateArrowVisibility() {
        if (scrollPosition <= 0) {
            leftArrow.css('opacity', '0.5').css('pointer-events', 'none');
        } else {
            leftArrow.css('opacity', '1').css('pointer-events', 'auto');
        }
        
        const maxScroll = filterButtons[0].scrollWidth - filterButtons.parent().width();
        if (scrollPosition >= maxScroll) {
            rightArrow.css('opacity', '0.5').css('pointer-events', 'none');
        } else {
            rightArrow.css('opacity', '1').css('pointer-events', 'auto');
        }
    }
    
    // Initialize arrow visibility
    updateArrowVisibility();
    
    // Left arrow click event
    leftArrow.click(function() {
        scrollPosition = Math.max(0, scrollPosition - scrollAmount);
        filterButtons.css('transform', `translateX(-${scrollPosition}px)`);
        updateArrowVisibility();
    });
    
    // Right arrow click event
    rightArrow.click(function() {
        const maxScroll = filterButtons[0].scrollWidth - filterButtons.parent().width();
        scrollPosition = Math.min(maxScroll, scrollPosition + scrollAmount);
        filterButtons.css('transform', `translateX(-${scrollPosition}px)`);
        updateArrowVisibility();
    });
    
    // Handle window resize
    $(window).resize(function() {
        updateArrowVisibility();
    });
});







// Details cards
document.addEventListener("DOMContentLoaded", () => {
    const jobCards = document.querySelectorAll(".card"); 
    const details = document.querySelectorAll(".detail"); 
    const closeButtons = document.querySelectorAll(".close-btn"); 

    
    details.forEach((detail) => detail.classList.add("hidden"));

    
    jobCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            
            details.forEach((detail) => detail.classList.add("hidden"));
            
            if (details[index]) {
                details[index].classList.remove("hidden");
            }
        });
    });

    
    closeButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            if (details[index]) {
                details[index].classList.add("hidden");
            }
        });
    });
});







// Apply now button
document.addEventListener("DOMContentLoaded", () => {
    const applyButtons = document.querySelectorAll(".btn-apply"); 
    const successMessage = document.getElementById("success-message");
    const closeMessageButton = document.getElementById("close-message");

    successMessage.classList.add("hidden");
    
    applyButtons.forEach((button) => {
        button.addEventListener("click", () => {
            successMessage.classList.remove("hidden"); 
        });
    });

    
    closeMessageButton.addEventListener("click", () => {
        successMessage.classList.add("hidden"); 
    });
});



//profile navbar
// Get the user profile and dropdown menu elements
const userProfile = document.getElementById('userProfile');
const dropdownMenu = document.getElementById('dropdownMenu');

// Toggle dropdown menu when clicking on the user profile
userProfile.addEventListener('click', function(event) {
    dropdownMenu.classList.toggle('active');
    event.stopPropagation();
});

// Close dropdown when clicking elsewhere
document.addEventListener('click', function() {
    if (dropdownMenu.classList.contains('active')) {
        dropdownMenu.classList.remove('active');
    }
});

// Prevent dropdown from closing when clicking on it
dropdownMenu.addEventListener('click', function(event) {
    event.stopPropagation();
});

/**
 * Updates the user profile with information from registration
 * @param {string} userName - The user's name
 * @param {string} userTitle - The user's title or position
 * @param {string} userLocation - The user's location
 * @param {string} profileImageUrl - URL to the user's profile image
 */
function updateUserProfile(userName, userTitle, userLocation, profileImageUrl) {
    const userNameElement = document.querySelector('.user-name');
    const userTitleElement = document.querySelector('.user-title');
    const userLocationElement = document.querySelector('.user-location');
    const profileImage = document.querySelector('.profile-image');

    // Update text information
    if (userName) userNameElement.textContent = userName;
    if (userTitle) userTitleElement.textContent = userTitle;
    if (userLocation) userLocationElement.textContent = userLocation;

    // Update profile image if URL is provided
    if (profileImageUrl) {
        profileImage.innerHTML = `<img src="${profileImageUrl}" alt="${userName}">`;
    }
}


window.onload = async () => {
    try {
        const response = await fetch('http://localhost:3001/internships');
        const internships = await response.json();

        const container = document.querySelector('.wrapper'); // Assuming this is where you want to display them

        internships.forEach(internship => {
            const div = document.createElement('div');
            div.classList.add('card'); // You can style this in your CSS
            div.innerHTML = `
                <h2>${internship.title}</h2>
                <p><i class='bx bx-map'></i> ${internship.location} — ${internship.duration}</p>
                <p><strong>Description:</strong> ${internship.description}</p>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error('Failed to fetch internships:', error);
    }
};
