// details page js

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

// Add event listeners to close modals only on clicking the close buttons
closeButtons.forEach(button => {
    button.addEventListener('click', function() {
        const modal = this.closest('.modal');
        modal.style.display = 'none';
    });
});

// Function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// Function to toggle between theme one and two
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
document.getElementById('theme-toggle').addEventListener('change', function() {
    toggleTheme();
});
