// Sample data for applicants with status history
const applicantsData = [
    {
        id: 1,
        name: "Yasmine Ben Aissa",
        avatar: "/photos/closeup-young-female-professional-making-eye-contact-against-colored-background.jpg",
        position: "Software Engineer Intern",
        status: "reviewing",
        email: "YasmineBenAissa@gmail.com",
        phone: "+216 55 123 567",
        location: "Soussa",
        jobTitle: "Junior Software Engineer Intern",
        applyDate: "April 5, 2025",
        notes: "Excellent React skills, strong problem-solving abilities.",
        statusHistory: [
            { status: "pending", date: "April 5, 2025" },
            { status: "reviewing", date: "April 8, 2025" }
        ]
    },
    {
        id: 2,
        name: "Ahmed Jelassi",
        avatar: "/photos/handsome-business-man-posing-close-up.jpg",
        position: "Data Analyst Intern",
        status: "pending",
        email: "AhmedJelassi@gmail.com",
        phone: "+216 95 987 655",
        location: "Tunis",
        jobTitle: "Data Analytics Intern",
        applyDate: "April 7, 2025",
        notes: "",
        statusHistory: [
            { status: "pending", date: "April 7, 2025" }
        ]
    },
    {
        id: 3,
        name: "Sarra Trabelsi",
        avatar: "/photos/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair.jpg",
        position: "UX Designer Intern",
        status: "interviewed",
        email: "SarraTrabelsi@gmail.com",
        phone: "+216 21 415 805",
        location: "Tunis",
        jobTitle: "UX/UI Design Intern",
        applyDate: "April 2, 2025",
        notes: "Great portfolio. Scheduled for second interview next week.",
        statusHistory: [
            { status: "pending", date: "April 2, 2025" },
            { status: "reviewing", date: "April 4, 2025" },
            { status: "interviewed", date: "April 10, 2025" }
        ]
    },
    {
        id: 4,
        name: "Mehdi Mbarek",
        avatar: "/photos/handsome-unshaven-european-man-has-serious-self-confident-expression-wears-glasses.jpg",
        position: "Software Engineer",
        status: "accepted",
        email: "MehdiMbarek@gmail.com",
        phone: "+216 58 765 432",
        location: "Djerba",
        jobTitle: "Digital Marketing Intern",
        applyDate: "March 28, 2025",
        notes: "Outstanding candidate with previous internship experience. Start date: May 15.",
        statusHistory: [
            { status: "pending", date: "March 28, 2025" },
            { status: "reviewing", date: "March 30, 2025" },
            { status: "interviewed", date: "April 3, 2025" },
            { status: "accepted", date: "April 8, 2025" }
        ]
    },
    {
        id: 5,
        name: "Nour Mhiri",
        avatar: "/photos/smiling-young-pretty-caucasian-girl-isolated-purple-wall-with-copy-space.jpg",
        position: "Software Engineer Intern",
        status: "rejected",
        email: "NourMhiri@gmail.com",
        phone: "+216 23 409 546",
        location: "Sfax",
        jobTitle: "Backend Developer Intern",
        applyDate: "April 3, 2025",
        notes: "Skills don't match our current requirements. Consider for future openings.",
        statusHistory: [
            { status: "pending", date: "April 3, 2025" },
            { status: "reviewing", date: "April 5, 2025" },
            { status: "rejected", date: "April 9, 2025" }
        ]
    },
    {
        id: 6,
        name: "Omar Gharbi",
        avatar: "/photos/young-bearded-man-with-striped-shirt.jpg",
        position: "Data Analyst Intern",
        status: "pending",
        email: "OmarGharbi@gmail.com",
        phone: "+216 25 346 789",
        location: "Sfax",
        jobTitle: "Data Science Intern",
        applyDate: "April 8, 2025",
        notes: "",
        statusHistory: [
            { status: "pending", date: "April 8, 2025" }
        ]
    },
    {
        id: 7,
        name: "Hanen kalai",
        avatar: "/photos/IMG_5542.jpeg",
        position: "UX Designer Intern",
        status: "reviewing",
        email: "Hanenkalai@gmail.com",
        phone: "+216 94 829 900",
        location: "Monastir",
        jobTitle: "Product Design Intern",
        applyDate: "April 6, 2025",
        notes: "Strong visual design skills. Schedule for interview.",
        statusHistory: [
            { status: "pending", date: "April 6, 2025" },
            { status: "reviewing", date: "April 9, 2025" }
        ]
    },
    {
        id: 8,
        name: "Khalil Saidi",
        avatar: "/photos/portrait-man-laughing.jpg",
        position: "Marketing Intern",
        status: "interviewed",
        email: "KhalilSaidi@gmail.com",
        phone: "+216 98 345 198",
        location: "Gabes",
        jobTitle: "Marketing Communications Intern",
        applyDate: "April 4, 2025",
        notes: "Good interview, waiting for references.",
        statusHistory: [
            { status: "pending", date: "April 4, 2025" },
            { status: "reviewing", date: "April 6, 2025" },
            { status: "interviewed", date: "April 11, 2025" }
        ]
    }
];

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render the initial board with applicants in their respective columns
    renderApplicantsBoard();
    
    // Set up event listeners
    setupEventListeners();
    
    // Set up drag and drop functionality
    setupDragAndDrop();
});

// Function to render the applicants board
function renderApplicantsBoard() {
    // Clear all columns first
    document.getElementById('pending-container').innerHTML = '';
    document.getElementById('reviewing-container').innerHTML = '';
    document.getElementById('interviewed-container').innerHTML = '';
    document.getElementById('accepted-container').innerHTML = '';
    document.getElementById('rejected-container').innerHTML = '';
    
    // Reset counters
    let pendingCount = 0;
    let reviewingCount = 0;
    let interviewedCount = 0;
    let acceptedCount = 0;
    let rejectedCount = 0;
    
    // Filter and sort applicants based on current filters
    const filteredApplicants = filterApplicants();
    
    // Sort applicants by application date (newest first)
    filteredApplicants.sort((a, b) => {
        return new Date(b.applyDate) - new Date(a.applyDate);
    });
    
    // Add applicants to their respective columns
    filteredApplicants.forEach(applicant => {
        const applicantCard = createApplicantCard(applicant);
        
        switch(applicant.status) {
            case 'pending':
                document.getElementById('pending-container').appendChild(applicantCard);
                pendingCount++;
                break;
            case 'reviewing':
                document.getElementById('reviewing-container').appendChild(applicantCard);
                reviewingCount++;
                break;
            case 'interviewed':
                document.getElementById('interviewed-container').appendChild(applicantCard);
                interviewedCount++;
                break;
            case 'accepted':
                document.getElementById('accepted-container').appendChild(applicantCard);
                acceptedCount++;
                break;
            case 'rejected':
                document.getElementById('rejected-container').appendChild(applicantCard);
                rejectedCount++;
                break;
        }
    });
    
    // Update counters
    document.getElementById('pending-count').textContent = pendingCount;
    document.getElementById('reviewing-count').textContent = reviewingCount;
    document.getElementById('interviewed-count').textContent = interviewedCount;
    document.getElementById('accepted-count').textContent = acceptedCount;
    document.getElementById('rejected-count').textContent = rejectedCount;
}

// Function to create an applicant card
function createApplicantCard(applicant) {
    const card = document.createElement('div');
    card.className = 'applicant-card';
    card.setAttribute('data-id', applicant.id);
    card.setAttribute('draggable', 'true');
    
    card.innerHTML = `
        <div class="card-header">
            <div class="mini-avatar">
                <img src="${applicant.avatar}" alt="${applicant.name}">
            </div>
            <div class="applicant-name">${applicant.name}</div>
        </div>
        <div class="card-body">
            <div class="position-label">Position</div>
            <div class="position-name">${applicant.position}</div>
            <div class="apply-date">
                <i class="fas fa-calendar-alt"></i> Applied: ${applicant.applyDate}
            </div>
        </div>
    `;
    
    // Add click event to open the modal with applicant details
    card.addEventListener('click', () => openApplicantModal(applicant));
    
    // Add drag events
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    
    return card;
}

// Function to filter applicants based on search and dropdown filters
function filterApplicants() {
    const searchQuery = document.getElementById('search-input').value.toLowerCase();
    const positionFilter = document.getElementById('filter-position').value;
    const dateFilter = document.getElementById('filter-date').value;
    
    // Get current date for date filtering
    const currentDate = new Date();
    let dateThreshold = new Date();
    
    // Set date threshold based on selected filter
    if (dateFilter === 'last-week') {
        dateThreshold.setDate(currentDate.getDate() - 7);
    } else if (dateFilter === 'last-month') {
        dateThreshold.setMonth(currentDate.getMonth() - 1);
    } else if (dateFilter === 'last-3-months') {
        dateThreshold.setMonth(currentDate.getMonth() - 3);
    }
    
    return applicantsData.filter(applicant => {
        // Apply search filter
        const matchesSearch = applicant.name.toLowerCase().includes(searchQuery) || 
                             applicant.position.toLowerCase().includes(searchQuery);
        
        // Apply position filter
        const matchesPosition = positionFilter === 'all' || 
                               (positionFilter === 'software-engineer' && applicant.position.toLowerCase().includes('software')) ||
                               (positionFilter === 'data-analyst' && applicant.position.toLowerCase().includes('data')) ||
                               (positionFilter === 'ux-designer' && applicant.position.toLowerCase().includes('ux')) ||
                               (positionFilter === 'marketing' && applicant.position.toLowerCase().includes('marketing'));
        
        // Apply date filter
        const applyDate = new Date(applicant.applyDate);
        const matchesDate = dateFilter === 'all' || applyDate >= dateThreshold;
        
        return matchesSearch && matchesPosition && matchesDate;
    });
}

// Function to set up event listeners
function setupEventListeners() {
    // Search input event
    document.getElementById('search-input').addEventListener('input', renderApplicantsBoard);
    
    // Filter dropdowns
    document.getElementById('filter-position').addEventListener('change', renderApplicantsBoard);
    document.getElementById('filter-date').addEventListener('change', renderApplicantsBoard);
    
    // Search button click
    document.getElementById('search-button').addEventListener('click', renderApplicantsBoard);
    
    // Modal close button
    document.querySelector('.close-btn').addEventListener('click', closeApplicantModal);
    
    // Update status button
    document.getElementById('update-status').addEventListener('click', updateApplicantStatus);
    
    // Save notes button
    document.getElementById('save-notes').addEventListener('click', saveApplicantNotes);
    
    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('applicant-modal');
        if (e.target === modal) {
            closeApplicantModal();
        }
    });
}

// Function to set up drag and drop functionality
function setupDragAndDrop() {
    const columns = document.querySelectorAll('.column-body');
    
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('dragenter', handleDragEnter);
        column.addEventListener('dragleave', handleDragLeave);
        column.addEventListener('drop', handleDrop);
    });
}

// Drag and drop event handlers
function handleDragStart(e) {
    this.classList.add('dragging');
    e.dataTransfer.setData('text/plain', this.getAttribute('data-id'));
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd() {
    this.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    return false;
}

function handleDragEnter(e) {
    e.preventDefault();
    this.classList.add('drop-highlight');
}

function handleDragLeave() {
    this.classList.remove('drop-highlight');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drop-highlight');
    
    const applicantId = parseInt(e.dataTransfer.getData('text/plain'));
    const targetColumn = this.id.replace('-container', '');
    
    // Find the applicant in the data
    const applicant = applicantsData.find(a => a.id === applicantId);
    
    if (applicant && applicant.status !== targetColumn) {
        // Update the applicant's status
        applicant.status = targetColumn;
        
        // Add new status entry to history
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        applicant.statusHistory.push({
            status: targetColumn,
            date: formattedDate
        });
        
        // Re-render the board
        renderApplicantsBoard();
    }
    
    return false;
}

// Function to open the applicant modal
function openApplicantModal(applicant) {
    // Fill in modal data
    document.getElementById('modal-avatar').src = applicant.avatar;
    document.getElementById('modal-name').textContent = applicant.name;
    document.getElementById('modal-position').textContent = applicant.position;
    
    // Set status badge
    const statusBadge = document.getElementById('modal-status');
    statusBadge.textContent = applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1);
    statusBadge.className = 'status-badge status-' + applicant.status;
    
    // Fill in details
    document.getElementById('modal-email').textContent = applicant.email;
    document.getElementById('modal-phone').textContent = applicant.phone;
    document.getElementById('modal-location').textContent = applicant.location;
    document.getElementById('modal-job-title').textContent = applicant.jobTitle;
    document.getElementById('modal-apply-date').textContent = applicant.applyDate;
    
    // Set notes
    document.getElementById('applicant-notes').value = applicant.notes;
    
    // Set status dropdown
    document.getElementById('change-status').value = applicant.status;
    
    // Render status history timeline
    renderStatusTimeline(applicant.statusHistory);
    
    // Store current applicant ID on the modal for reference
    document.getElementById('applicant-modal').setAttribute('data-applicant-id', applicant.id);
    
    // Show modal
    document.getElementById('applicant-modal').style.display = 'block';
}

// Function to render the status timeline
function renderStatusTimeline(statusHistory) {
    const timelineContainer = document.getElementById('status-timeline');
    timelineContainer.innerHTML = '';
    
    statusHistory.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-marker"></div>
            <div class="timeline-content">
                <div class="timeline-status">${item.status.charAt(0).toUpperCase() + item.status.slice(1)}</div>
                <div class="timeline-date">${item.date}</div>
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Function to close the applicant modal
function closeApplicantModal() {
    document.getElementById('applicant-modal').style.display = 'none';
}

// Function to update applicant status
function updateApplicantStatus() {
    const modal = document.getElementById('applicant-modal');
    const applicantId = parseInt(modal.getAttribute('data-applicant-id'));
    const newStatus = document.getElementById('change-status').value;
    
    // Find the applicant in the data
    const applicant = applicantsData.find(a => a.id === applicantId);
    
    if (applicant && applicant.status !== newStatus) {
        // Update the applicant's status
        applicant.status = newStatus;
        
        // Add new status entry to history
        const today = new Date();
        const formattedDate = today.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        applicant.statusHistory.push({
            status: newStatus,
            date: formattedDate
        });
        
        // Show confirmation message
        alert(`Status updated to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}.`);
        
        // Re-render the board and close modal
        renderApplicantsBoard();
        closeApplicantModal();
    }
}

// Function to save applicant notes
function saveApplicantNotes() {
    const modal = document.getElementById('applicant-modal');
    const applicantId = parseInt(modal.getAttribute('data-applicant-id'));
    const notes = document.getElementById('applicant-notes').value;
    
    // Find the applicant in the data
    const applicant = applicantsData.find(a => a.id === applicantId);
    
    if (applicant) {
        // Update the applicant's notes
        applicant.notes = notes;
        
        // Show confirmation message
        alert('Notes saved successfully.');
        
        // No need to re-render the board since notes aren't displayed there
    }
}

// Function to handle CV and cover letter downloads
document.getElementById('download-cv').addEventListener('click', function(e) {
    e.preventDefault();
    alert('CV download functionality would be implemented here.');
});

document.getElementById('download-cover').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Cover letter download functionality would be implemented here.');
});

// Toggle sidebar on smaller screens
if (window.innerWidth <= 968) {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.transform = 'translateX(-250px)';
    
    // Add event listener to toggle sidebar
    document.querySelector('.header').addEventListener('click', function() {
        if (sidebar.style.transform === 'translateX(0px)') {
            sidebar.style.transform = 'translateX(-250px)';
        } else {
            sidebar.style.transform = 'translateX(0px)';
        }
    });
}