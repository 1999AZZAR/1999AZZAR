// Modal stack to track opened modals
const modalStack = [];

// Function to open a modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Show the modal
        modal.style.display = 'block';

        // Add the modal to the stack
        modalStack.push(modal);

        // Ensure the modal is on top
        modal.style.zIndex = 1000 + modalStack.length;

        // Add event listener for closing this modal by its close button
        const closeButton = modal.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => closeModal(modal));
        }
    }
}

// Function to close a specific modal
function closeModal(modal) {
    if (!modal) return;

    // Hide the modal
    modal.style.display = 'none';

    // Remove the modal from the stack
    const index = modalStack.indexOf(modal);
    if (index > -1) {
        modalStack.splice(index, 1);
    }
}

// Add global event listeners to open modals
document.addEventListener('click', function (e) {
    if (e.target.matches('.openModal')) {
        const modalId = e.target.getAttribute('data-modal');
        openModal(modalId);
    }
});

// Add global event listener to close modals by clicking outside
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal') && e.target === modalStack[modalStack.length - 1]) {
        closeModal(e.target);
    }
});

// Theme functionality remains unchanged
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem('theme') === 'two') {
        setTheme('one');
    } else {
        setTheme('two');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'two') {
        setTheme('two');
        document.getElementById('theme-toggle').checked = true;
    } else {
        setTheme('one');
        document.getElementById('theme-toggle').checked = false;
    }
})();

// Event listener for the theme toggle
document.getElementById('theme-toggle').addEventListener('change', toggleTheme);
