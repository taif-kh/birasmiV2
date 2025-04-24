document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('cvUploadArea');
    const fileInput = document.getElementById('cvUpload');
    const modifyBtn = document.getElementById('modifyResumeBtn');
    const resumeContainer = document.querySelector('.resume-container');
    
    if (!uploadArea || !fileInput || !modifyBtn || !resumeContainer) {
        console.error('Resume elements not found');
        return;
    }
    
    // Handle click on upload area
    uploadArea.addEventListener('click', function(e) {
        fileInput.click();
    });
    
    // Display file name when selected
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const fileName = this.files[0].name;
            const textElement = uploadArea.querySelector('.cv-upload-text');
            if (textElement) {
                textElement.textContent = 'Selected file: ' + fileName;
            }
            uploadArea.classList.add('file-selected');
            resumeContainer.classList.add('has-file');
            modifyBtn.style.display = 'flex'; // Show the modify button
        }
    });
    
    // Handle modify button click
    modifyBtn.addEventListener('click', function() {
        // Clear the file input
        fileInput.value = '';
        
        // Reset the text
        const textElement = uploadArea.querySelector('.cv-upload-text');
        if (textElement) {
            textElement.textContent = 'Click to upload or drag and drop your CV here';
        }
        
        // Reset styles
        uploadArea.classList.remove('file-selected');
        resumeContainer.classList.remove('has-file');
        modifyBtn.style.display = 'none'; // Hide the modify button
    });
    
    // Handle drag and drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    // Highlight drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        uploadArea.classList.add('highlight');
    }
    
    function unhighlight() {
        uploadArea.classList.remove('highlight');
    }
    
    // Handle dropped files
    uploadArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files && files[0]) {
            // Check if the file is a PDF
            if (files[0].type === 'application/pdf') {
                fileInput.files = files;
                const textElement = uploadArea.querySelector('.cv-upload-text');
                if (textElement) {
                    textElement.textContent = 'Selected file: ' + files[0].name;
                }
                uploadArea.classList.add('file-selected');
                resumeContainer.classList.add('has-file');
                modifyBtn.style.display = 'flex'; // Show the modify button
            } else {
                // Alert for wrong file type
                alert('Please upload a PDF file');
                unhighlight();
            }
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const photoUpload = document.getElementById('photoUpload');
    const profilePhoto = document.getElementById('profilePhoto');
    const photoPreview = document.getElementById('photoPreview');
    const initialLetter = profilePhoto.querySelector('span');
    
    // Handle photo selection
    photoUpload.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Set the image source to the selected file
                photoPreview.src = e.target.result;
                
                // Show the image and hide the initial letter
                photoPreview.style.display = 'block';
                if (initialLetter) {
                    initialLetter.style.display = 'none';
                }
            };
            
            // Read the selected file as a data URL
            reader.readAsDataURL(this.files[0]);
        }
    });
});


document.getElementById('saveChangesBtn').addEventListener('click', function() {
    // Add your save functionality here
    alert('Changes saved successfully!');
    
    // You can replace the alert with actual code to save the data
    // For example, collect form data and send to server
    /*
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        // Add other fields as needed
    };
    
    // Example of sending data to server
    fetch('/api/save-profile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Changes saved successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error saving changes. Please try again.');
    });
    */
});