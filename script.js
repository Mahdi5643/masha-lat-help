// Comment from Mahdi5643: BELOW IS THE OLD BUTTON RIPPLE CODE WHICH MESSED WITH THE ACCORDION BARS AND MADE THEM NOT WORK. THEY'RE NOT USED ANYMORE AND NOW THERE IS NEW BUTTONS RIPPLE SCRIPTS.
// --- script.js ---

//function createGlassRipple(event) {
    // Ignore accordions explicitly if passed
    //if (event.currentTarget.classList.contains('toggle-button')) return;

    //const button = event.currentTarget;

    // Remove existing ripple // Remove any existing ripples to handle rapid clicking
    //const existingRipple = button.querySelector(".ripple");
    //if (existingRipple) {
        //existingRipple.remove();
    //}

    // Create ripple circle // Create the ripple element
    //const circle = document.createElement("span");
    //const diameter = Math.max(button.clientWidth, button.clientHeight);
    //const radius = diameter / 2;

    // Calculate click coordinates relative to the button
    //const rect = button.getBoundingClientRect();
	//circle.style.width = circle.style.height = `${diameter}px`;
    //circle.style.left = `${event.clientX - rect.left - radius}px`;
    //circle.style.top = `${event.clientY - rect.top - radius}px`;
    //circle.classList.add("ripple");

    // Append the ripple inside the button
    //button.appendChild(circle);
//}

// Attach ripple ONLY to action buttons, NOT .toggle-button // Automatically attach ripple effect to all glass buttons when the page loads
//document.addEventListener("DOMContentLoaded", () => {
    //const actionButtons = document.querySelectorAll(
        //".glass-btn, .glass-btn-primary, .form-btn, .dialog-action-btn"
    //);
    
    //actionButtons.forEach(button => {
        //button.addEventListener("click", createGlassRipple);
    //});
//});










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

const recipientEmail = "mshltspprt@gmail.com";

function getBodyTemplate() {
function getBodyTemplate() {
    const mainEmail = document.getElementById('mainEmail').value;
    const secondEmail = document.getElementById('secondEmail').value;
    const name = document.getElementById('name').value;
    const device = document.getElementById('device').value;
    const message = document.getElementById('message').value;

    // Only include secondEmail line if the user provided one
    const secondEmailFormatted = secondEmail ? `ایمیل مشَ لات: ${secondEmail}\n` : '';
	const nameFormatted = name ? `اسم مشَ لات: ${name}\n` : '';
	const deviceFormatted = device ? `دستگاه: ${name}\n` : ''; 

    return `ایمیل: ${mainEmail}\n` +
           nameFormatted +
           secondEmailFormatted +
           deviceFormatted +
           `====================================\n\n` +
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
// ==========================================
// 1. ACCORDION / COLLAPSIBLE FUNCTION
// ==========================================
function toggleAccordion(button) {
    // Toggle active state on the button
    button.classList.toggle('active');
    
    // Find the adjacent content container
    const content = button.nextElementSibling;
    if (content && content.classList.contains('collapsible-content')) {
        content.classList.toggle('active');
    }
}

// ==========================================
// 2. GLASS RIPPLE EFFECT FUNCTION
// ==========================================
function createGlassRipple(event) {
    const button = event.currentTarget;

    // Remove old ripples to keep DOM clean
    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
        existingRipple.remove();
    }

    // Create ripple element
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    button.appendChild(circle);
}

// ==========================================
// 3. SAFE INITIALIZATION ON PAGE LOAD
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // A. Attach Click Handler to Accordion Bars
    const accordions = document.querySelectorAll(".toggle-button");
    accordions.forEach(acc => {
        acc.addEventListener("click", function() {
            toggleAccordion(this);
        });
    });

    // B. Attach Ripple ONLY to Action Buttons (STRICTLY EXCLUDES ACCORDIONS)
    const actionButtons = document.querySelectorAll(
        ".glass-btn, .glass-btn-primary, .glass-btn-custom, .form-btn, .dialog-action-btn"
    );
    
    actionButtons.forEach(btn => {
        btn.addEventListener("click", createGlassRipple);
    });
});

const btn = document.getElementById('contact-us');

function firstFunction() {
  createGlassRipple(event);
}

function secondFunction() {
  document.getElementById('siteModal').showModal();
}

// Attach both functions to the same button
btn.addEventListener('click', firstFunction);
btn.addEventListener('click', secondFunction);
