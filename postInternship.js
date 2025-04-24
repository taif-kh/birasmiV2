$(document).ready(function() {
    $("#postInternshipBtn").click(function(e) {
        e.preventDefault();
        
        const formData = {
            title: $("#internshipTitle").val(),
            type: $("#internshipType").val(),
            location: $("#location").val(),
            remote_option: $("#remoteOption").val(),
            duration: $("#duration").val(),
            deadline: $("#deadline").val(),
            positions: $("#positions").val(),
            description: $("#description").val(),
            education_level: $("#educationLevel").val(),
            field_of_study: $("#fieldOfStudy").val(),
            required_skills: $("#requiredSkills").val(),
            additional_requirements: $("#additionalRequirements").val(),
            application_method: $("#applicationMethod").val(),
            application_email: "", // Add these fields even if empty
            application_instructions: ""  // Add these fields even if empty
        };

        console.log("Form data being sent:", formData);

        $.ajax({
            url: 'http://localhost:3001/internships',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert("Internship posted successfully!");
                $("#internshipForm")[0].reset();
            },
            error: function(xhr, status, error) {
                console.error("Error details:", xhr, status, error);
                alert("Error posting internship: " + xhr.responseText);
            }
        });
    });
});