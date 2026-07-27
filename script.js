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
