document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.querySelector('.feedback-form');
    
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const feedback = this.querySelector('textarea').value;
        
        // Validate inputs
        if (!name || !email || !feedback) {
            alert('Please fill in all fields');
            return;
        }
        
        // Create feedback object
        const feedbackData = {
            name: name,
            email: email,
            feedback: feedback,
            timestamp: new Date().toISOString()
        };
        
        // Store feedback in localStorage
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
        feedbacks.push(feedbackData);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        
        // Show success message
        alert('Thank you for your feedback!');
        
        // Reset form
        this.reset();
    });
});