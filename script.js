    // Get all buttons with the class 'toggle-button'
    var buttons = document.getElementsByClassName("toggle-button");
    var i;

    for (i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function() {
        // Toggle the 'active' class on the button itself (optional for styling)
        this.classList.toggle("active");
        
        // Get the next sibling element, which is the content div
        var content = this.nextElementSibling;
        
        // Toggle the 'active' class on the content to show/hide it
        content.classList.toggle("active");
      });
    }

const recipientEmail = "support@yourdomain.com";

function getBodyTemplate() {
    const mainEmail = document.getElementById('mainEmail').value;
    const secondEmail = document.getElementById('secondEmail').value;
    const name = document.getElementById('name').value;
    const device = document.getElementById('device').value;
    const message = document.getElementById('message').value;

    return `Main Email: ${mainEmail}\n` +
           `Name: ${name}\n` +
           `Email: ${secondEmail}\n` +
           `Device: ${device}\n\n` +
           `==============================\n\n` +
           `${message}`;
}

function validateForm() {
    const form = document.getElementById('contactForm');
    if (!form || !form.checkValidity()) {
        form?.reportValidity();
        return false;
    }
    return true;
}

// Wait for the HTML document to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', () => {
    
    // Gmail Web Handler
    const sendGmailBtn = document.getElementById('sendGmail');
    if (sendGmailBtn) {
        sendGmailBtn.addEventListener('click', function() {
            if (!validateForm()) return;

            const subject = document.getElementById('subject').value;
            const body = getBodyTemplate();

            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1` +
                `&to=${encodeURIComponent(recipientEmail)}` +
                `&su=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;

            window.open(gmailUrl, '_blank');
        });
    }

    // Default Mail App (mailto:) Handler
    const sendMailtoBtn = document.getElementById('sendMailto');
    if (sendMailtoBtn) {
        sendMailtoBtn.addEventListener('click', function() {
            if (!validateForm()) return;

            const subject = document.getElementById('subject').value;
            const body = getBodyTemplate();

            const mailtoUrl = `mailto:${encodeURIComponent(recipientEmail)}` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;

            window.location.href = mailtoUrl;
        });
    }
});

// --- script.js ---

function createGlassRipple(event) {
    const button = event.currentTarget;

    // Remove any existing ripples to handle rapid clicking
    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
        existingRipple.remove();
    }

    // Create the ripple element
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    // Calculate click coordinates relative to the button
    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    // Append the ripple inside the button
    button.appendChild(circle);
}

// Automatically attach ripple effect to all glass buttons when the page loads
document.addEventListener("DOMContentLoaded", () => {
    const glassButtons = document.querySelectorAll(".glass-btn, .glass-btn-primary, .form-btn");
    
    glassButtons.forEach(button => {
        button.addEventListener("click", createGlassRipple);
    });
});
