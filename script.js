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
