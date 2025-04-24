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
        education: [
            { degree: "B.S. Computer Science", school: "ESSTHS", year: "2022-2026" }
        ],
        skills: ["JavaScript", "React", "Node.js", "Python", "Git"],
        jobTitle: "Junior Software Engineer Intern",
        applyDate: "April 5, 2025"
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
        education: [
            { degree: "B.S. Data Science", school: "Esprit", year: "2023-2027" }
        ],
        skills: ["Python", "SQL", "R", "Tableau", "Excel"],
        jobTitle: "Data Analytics Intern",
        applyDate: "April 7, 2025"
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
        education: [
            { degree: "B.F.A. Design", school: "FST", year: "2022-2026" }
        ],
        skills: ["Figma", "Adobe XD", "Sketch", "User Research", "UI Design"],
        jobTitle: "UX/UI Design Intern",
        applyDate: "April 2, 2025"
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
        education: [
            { degree: "Software Engineering", school: "Iset Djerba", year: "2023-2027" }
        ],
        skills: ["Social Media", "Content Creation", "SEO", "Analytics", "Copywriting"],
        jobTitle: "Software Engineer Intern",
        applyDate: "March 28, 2025"
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
        education: [
            { degree: "B.S. Computer Engineering", school: "FSS", year: "2022-2026" }
        ],
        skills: ["Java", "C++", "Spring Boot", "MySQL", "Docker"],
        jobTitle: "Backend Developer Intern",
        applyDate: "April 3, 2025"
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
        education: [
            { degree: "B.S. Statistics", school: "FSS", year: "2022-2026" }
        ],
        skills: ["Python", "R", "SPSS", "Machine Learning", "Data Visualization"],
        jobTitle: "Data Science Intern",
        applyDate: "April 8, 2025"
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
        education: [
            { degree: "B.A. Interaction Design", school: "FSM", year: "2023-2027" }
        ],
        skills: ["Figma", "InVision", "Prototyping", "User Testing", "Visual Design"],
        jobTitle: "Product Design Intern",
        applyDate: "April 6, 2025"
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
        education: [
            { degree: "B.S. Business Administration", school: "FSG", year: "2022-2026" }
        ],
        skills: ["Content Strategy", "Email Marketing", "Google Analytics", "Social Media Management", "Brand Development"],
        jobTitle: "Marketing Communications Intern",
        applyDate: "April 4, 2025"
    }
];

// Initialize the application when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Render the initial list of applicants
    renderApplicantsList(applicantsData);
    
    // Set up event listeners
    setupEventListeners();
});

// Function to render the list of applicants
function renderApplicantsList(applicants) {
    const applicantsList = document.querySelector('.applicants-list');
    applicantsList.innerHTML = '';
    
    if (applicants.length === 0) {
        applicantsList.innerHTML = '<div class="no-results">No applicants found matching your criteria.</div>';
        return;
    }
    
    applicants.forEach(applicant => {
        const applicantCard = createApplicantCard(applicant);
        applicantsList.appendChild(applicantCard);
    });
}

// Function to create an applicant card
function createApplicantCard(applicant) {
    const card = document.createElement('div');
    card.className = 'applicant-card';
    card.setAttribute('data-id', applicant.id);
    
    card.innerHTML = `
        <div class="card-header">
            <div class="applicant-avatar">
                <img src="${applicant.avatar}" alt="${applicant.name}">
            </div>
            <div class="applicant-info">
                <div class="applicant-name">${applicant.name}</div>
                <div class="applicant-position">${applicant.position}</div>
            </div>
            <div class="status-badge status-${applicant.status}">${capitalizeFirstLetter(applicant.status)}</div>
        </div>
        <div class="card-body">
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${applicant.email}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Location:</span>
                <span class="info-value">${applicant.location}</span>
            </div>
        </div>
        <div class="card-footer">
            <span class="apply-date">Applied: ${applicant.applyDate}</span>
            <a href="#" class="view-profile">View Profile</a>
        </div>
    `;
    
    // Add click event to open the modal with applicant details
    card.addEventListener('click', () => openApplicantModal(applicant));
    
    return card;
}

// Function to open the applicant modal with details
function openApplicantModal(applicant) {
    const modal = document.getElementById('applicant-modal');
    
    // Set the modal content with applicant details
    document.getElementById('modal-avatar').src = applicant.avatar;
    document.getElementById('modal-name').textContent = applicant.name;
    document.getElementById('modal-position').textContent = applicant.position;
    
    const statusBadge = document.getElementById('modal-status');
    statusBadge.className = `status-badge status-${applicant.status}`;
    statusBadge.textContent = capitalizeFirstLetter(applicant.status);
    
    document.getElementById('modal-email').textContent = applicant.email;
    document.getElementById('modal-phone').textContent = applicant.phone;
    document.getElementById('modal-location').textContent = applicant.location;
    
    // Set education information
    const educationContainer = document.getElementById('modal-education');
    educationContainer.innerHTML = '';
    applicant.education.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.className = 'education-item';
        eduItem.innerHTML = `
            <p class="education-degree">${edu.degree}</p>
            <p class="education-school">${edu.school}, ${edu.year}</p>
        `;
        educationContainer.appendChild(eduItem);
    });
    
    // Set skills information
    const skillsContainer = document.getElementById('modal-skills');
    skillsContainer.innerHTML = '';
    applicant.skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
    
    document.getElementById('modal-job-title').textContent = applicant.jobTitle;
    document.getElementById('modal-apply-date').textContent = `Applied on: ${applicant.applyDate}`;
    
    // Set current status in the dropdown
    document.getElementById('change-status').value = applicant.status;
    
    // Display the modal
    modal.style.display = 'block';
    
    // Set data attribute for the update button
    document.getElementById('update-status').setAttribute('data-id', applicant.id);
}

// Function to close the applicant modal
function closeApplicantModal() {
    const modal = document.getElementById('applicant-modal');
    modal.style.display = 'none';
}

// Function to filter applicants based on search and filters
function filterApplicants() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const statusFilter = document.getElementById('filter-status').value;
    const positionFilter = document.getElementById('filter-position').value;
    
    let filteredApplicants = applicantsData.filter(applicant => {
        // Search filter
        const matchesSearch = applicant.name.toLowerCase().includes(searchInput) ||
                              applicant.email.toLowerCase().includes(searchInput) ||
                              applicant.position.toLowerCase().includes(searchInput);
        
        // Status filter
        const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
        
        // Position filter (simplified for demo)
        const matchesPosition = positionFilter === 'all' || 
                               (positionFilter === 'software-engineer' && applicant.position.includes('Software Engineer')) ||
                               (positionFilter === 'data-analyst' && applicant.position.includes('Data Analyst')) ||
                               (positionFilter === 'ux-designer' && applicant.position.includes('UX Designer')) ||
                               (positionFilter === 'marketing' && applicant.position.includes('Marketing'));
        
        return matchesSearch && matchesStatus && matchesPosition;
    });
    
    renderApplicantsList(filteredApplicants);
}

// Setup all event listeners
function setupEventListeners() {
    // Search and filter events
    document.getElementById('search-button').addEventListener('click', filterApplicants);
    document.getElementById('search-input').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterApplicants();
        }
    });
    
    document.getElementById('filter-status').addEventListener('change', filterApplicants);
    document.getElementById('filter-position').addEventListener('change', filterApplicants);
    
    // Modal close button
    document.querySelector('.close-btn').addEventListener('click', closeApplicantModal);
    
    // Close modal when clicking outside the content
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('applicant-modal');
        if (event.target === modal) {
            closeApplicantModal();
        }
    });
    
    // Update applicant status
    document.getElementById('update-status').addEventListener('click', function() {
        const applicantId = parseInt(this.getAttribute('data-id'));
        const newStatus = document.getElementById('change-status').value;
        
        // Find the applicant and update status
        const applicant = applicantsData.find(app => app.id === applicantId);
        if (applicant) {
            applicant.status = newStatus;
            
            // Update the UI
            filterApplicants();
            closeApplicantModal();
            
            // Show a notification (in a real app)
            alert(`Status updated for ${applicant.name} to ${capitalizeFirstLetter(newStatus)}`);
        }
    });
    
    // Pagination buttons (simplified for demo)
    document.getElementById('prev-page').addEventListener('click', function() {
        alert('Previous page functionality would be implemented here');
    });
    
    document.getElementById('next-page').addEventListener('click', function() {
        alert('Next page functionality would be implemented here');
    });
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}