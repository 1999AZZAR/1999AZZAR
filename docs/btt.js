// Get the button
var mybutton = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document or modal, show the button
window.onscroll = function() {
    scrollFunction();
};

// Function to show/hide the button based on scroll position
function scrollFunction() {
    // Check if the user has scrolled down on the main page
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.classList.add("show");
        mybutton.classList.remove("hide");
    } else {
        mybutton.classList.add("hide");
        mybutton.classList.remove("show");
    }

    // Check each modal for scroll position
    const modals = document.querySelectorAll('.modal-content');
    modals.forEach(modal => {
        if (modal.scrollTop > 20) {
            mybutton.classList.add("show");
            mybutton.classList.remove("hide");
        }
    });
}

// When the user clicks on the button, scroll to the top of the document or modal
mybutton.onclick = function() {
    // Check if any modal is currently displayed
    const openModal = document.querySelector('.modal[style*="display: block"]');
    if (openModal) {
        // Scroll to the top of the modal content
        openModal.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Scroll to the top of the main document
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
};
