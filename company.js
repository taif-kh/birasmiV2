document.addEventListener('DOMContentLoaded', function() {
    // Document Upload Functionality
    const uploadArea = document.getElementById('documentUploadArea');
    const fileInput = document.getElementById('companyDocUpload');
    const removeBtn = document.getElementById('removeDocumentBtn');
    const documentsContainer = document.querySelector('.documents-container');
    
    if (uploadArea && fileInput && documentsContainer) {
        // Handle click on upload area
        uploadArea.addEventListener('click', function(e) {
            fileInput.click();
        });
        
        // Display file name when selected
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const fileName = this.files[0].name;
                const textElement = uploadArea.querySelector('.document-upload-text');
                if (textElement) {
                    textElement.textContent = 'Selected file: ' + fileName;
                }
                uploadArea.classList.add('file-selected');
                documentsContainer.classList.add('has-file');
                
                // Show the remove button
                if (removeBtn) {
                    removeBtn.style.display = 'flex';
                }
            }
        });
        
        // Handle remove button click
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                // Clear the file input
                fileInput.value = '';
                
                // Reset the text
                const textElement = uploadArea.querySelector('.document-upload-text');
                if (textElement) {
                    textElement.textContent = 'Click to upload or drag and drop company profile';
                }
                
                // Reset styles
                uploadArea.classList.remove('file-selected');
                documentsContainer.classList.remove('has-file');
                removeBtn.style.display = 'none'; // Hide the remove button
            });
        }
        
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
                    const textElement = uploadArea.querySelector('.document-upload-text');
                    if (textElement) {
                        textElement.textContent = 'Selected file: ' + files[0].name;
                    }
                    uploadArea.classList.add('file-selected');
                    documentsContainer.classList.add('has-file');
                    
                    // Show the remove button
                    if (removeBtn) {
                        removeBtn.style.display = 'flex';
                    }
                } else {
                    // Alert for wrong file type
                    alert('Please upload a PDF file');
                    unhighlight();
                }
            }
        }
    }

    // Company Logo Upload Functionality
    const logoUpload = document.getElementById('logoUpload');
    const profilePhoto = document.getElementById('profilePhoto');
    const photoPreview = document.getElementById('photoPreview');
    const initialLetter = profilePhoto ? profilePhoto.querySelector('span') : null;
    
    if (logoUpload && profilePhoto && photoPreview) {
        // Handle photo selection
        logoUpload.addEventListener('change', function() {
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
    }

    // Save Changes Button Functionality
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', function() {
            // Add your save functionality here
            alert('Changes saved successfully!');
            
            // You can replace the alert with actual code to save the data
            // For example, collect form data and send to server
            /*
            const formData = {
                companyName: document.getElementById('companyName').value,
                websiteUrl: document.getElementById('websiteUrl').value,
                companyType: document.getElementById('companyType').value,
                // Add other fields as needed
            };
            
            // Example of sending data to server
            fetch('/api/save-company-profile', {
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
    }
});