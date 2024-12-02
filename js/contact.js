// Contact form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('formMessage');
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    // Collect form data
    const formData = new FormData(form);
    
    // Submit form using fetch
    fetch(form.action, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            formMessage.textContent = 'Thank you! Your message has been sent.';
            formMessage.className = 'form-message success';
            form.reset();
        } else {
            throw new Error(data.message || 'Error sending message');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        formMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
        formMessage.className = 'form-message error';
    })
    .finally(() => {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    });
});
