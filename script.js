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
// 🔴 DUPLICATE FUNCTION DEFINITION HERE
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

// Store the original native alert function (optional, in case you need it later)
window.nativeAlert = window.alert;

// Override window.alert
window.alert = function (message) {
  // Prevent duplicate modals if multiple alerts trigger quickly
  if (document.getElementById('custom-alert-modal')) return;

  // 1. Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'custom-alert-modal';
  overlay.className = 'custom-alert-overlay';

  // 2. Create modal box markup
  overlay.innerHTML = `
    <div class="custom-alert-box">
      <div class="custom-alert-header">
        <span class="custom-alert-title">Notice</span>
      </div>
      <div class="custom-alert-body">
        <p>${String(message).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      </div>
      <div class="custom-alert-footer">
        <button id="custom-alert-ok-btn" class="custom-alert-btn">OK</button>
      </div>
    </div>
  `;

  // 3. Append to body
  document.body.appendChild(overlay);

  // 4. Handle close action
  const okBtn = overlay.querySelector('#custom-alert-ok-btn');
  okBtn.focus();

  const closeModal = () => {
    overlay.classList.add('custom-alert-fade-out');
    overlay.addEventListener('animationend', () => overlay.remove());
  };

  okBtn.addEventListener('click', closeModal);
};

// Preserve original native functions (good practice)
// Preserve native functions
window.nativeConfirm = window.confirm;
window.nativePrompt = window.prompt;

// Helper to escape HTML tags for security
const escapeHtml = (str) =>
  String(str ?? '').replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

async function handleDeleteAccount() {
  // 1. Trigger custom confirm dialog
  const userConfirmed = await confirm("Are you sure you want to delete your account?");
  
  if (!userConfirmed) {
    console.log("Deletion cancelled.");
    return;
  }

  // 2. Trigger custom prompt dialog
  const userFeedback = await prompt("Please type 'DELETE' to confirm:", "");

  if (userFeedback === "DELETE") {
    console.log("Account deleted!");
  } else {
    console.log("Confirmation word did not match.");
  }
}

/**
 * Shared modal builder with WCAG focus trapping & accessibility
 */
function createModal({ bodyHtml, setup, onCancel }) {
  return new Promise((resolve) => {
    // 1. Remember element focused prior to modal opening
    const previouslyFocused = document.activeElement;

    // 2. Create backdrop overlay
    const overlay = document.createElement('div');
    overlay.className = 'custom-modal-overlay';

    // 3. Render modal dialog container
    overlay.innerHTML = `
      <div class="custom-modal-box" role="dialog" aria-modal="true">
        ${bodyHtml}
      </div>
    `;

    document.body.appendChild(overlay);

    const modalBox = overlay.querySelector('.custom-modal-box');

    // 4. Close and cleanup handler
    const close = (value) => {
      overlay.classList.add('fade-out');
      overlay.addEventListener('animationend', () => {
        overlay.remove();
        // Restore focus to original element
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
          previouslyFocused.focus();
        }
        resolve(value);
      });
    };

    // Run specific element listeners (OK/Cancel buttons, input fields)
    setup(overlay, close);

    // 5. Query all focusable elements inside the modal box
    const focusableSelectors = 'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(modalBox.querySelectorAll(focusableSelectors));
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    // 6. Focus Trapping & Keyboard Navigation Listener
    overlay.addEventListener('keydown', (e) => {
      // Escape Key
      if (e.key === 'Escape') {
        e.preventDefault();
        close(onCancel());
        return;
      }

      // Tab Key Focus Trapping
      if (e.key === 'Tab') {
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        // Shift + Tab (Backward)
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } 
        // Tab (Forward)
        else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });
  });
}

// ==========================================
// 1. OVERRIDE WINDOW.CONFIRM
// Returns: Promise<boolean> (true or false)
// ==========================================
// OVERRIDE WINDOW.CONFIRM
// ==========================================
window.confirm = function (message) {
  return createModal({
    bodyHtml: `
      <div class="custom-modal-body">
        <p>${escapeHtml(message)}</p>
      </div>
      <div class="custom-modal-footer">
        <button class="custom-btn cancel-btn">Cancel</button>
        <button class="custom-btn ok-btn">OK</button>
      </div>
    `,
    onCancel: () => false,
    setup: (overlay, close) => {
      const okBtn = overlay.querySelector('.ok-btn');
      const cancelBtn = overlay.querySelector('.cancel-btn');

      okBtn.focus();

      okBtn.addEventListener('click', () => close(true));
      cancelBtn.addEventListener('click', () => close(false));
    }
  });
};

// ==========================================
// 2. OVERRIDE WINDOW.PROMPT
// Returns: Promise<string | null>
// ==========================================
// OVERRIDE WINDOW.PROMPT
// ==========================================
window.prompt = function (message, defaultValue = "") {
  return createModal({
    bodyHtml: `
      <div class="custom-modal-body">
        <p>${escapeHtml(message)}</p>
        <input type="text" class="custom-modal-input" value="${escapeHtml(defaultValue)}" />
      </div>
      <div class="custom-modal-footer">
        <button class="custom-btn cancel-btn">Cancel</button>
        <button class="custom-btn ok-btn">OK</button>
      </div>
    `,
    onCancel: () => null,
    setup: (overlay, close) => {
      const input = overlay.querySelector('.custom-modal-input');
      const okBtn = overlay.querySelector('.ok-btn');
      const cancelBtn = overlay.querySelector('.cancel-btn');

      input.focus();
      input.select();

      okBtn.addEventListener('click', () => close(input.value));
      cancelBtn.addEventListener('click', () => close(null));

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') close(input.value);
      });
    }
  });
};
