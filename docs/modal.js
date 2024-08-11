// Get all buttons that open modals
const openModalButtons = document.querySelectorAll('.openModal');

// Add event listeners to open modals
openModalButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
    });
});

// Get all elements that close modals
const closeButtons = document.querySelectorAll('.close');

// Add event listeners to close modals
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
    });
});

// Close modal if user clicks outside of modal content
window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

document.getElementById('theme-toggle').addEventListener('change', function () {
    if (this.checked) {
        switchTheme(true);
    } else {
        switchTheme(false);
    }
});

function switchTheme(isLightTheme) {
    if (isLightTheme) {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}


