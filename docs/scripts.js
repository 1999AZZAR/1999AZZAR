// Global variables
let sortedProjects = [];
let activeSection = null;
let fuse; // For fuzzy search

// Function to fetch and sort GitHub projects from multiple users
async function fetchAndSortProjects() {
    const usernames = ['1999AZZAR', 'lily-osp'];
    let allProjects = [];

    for (const username of usernames) {
        let page = 1;
        const perPage = 100; // Maximum number of items per page
        while (true) {
            const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
            const data = await response.json();

            // Break the loop if no more data is returned
            if (data.length === 0) {
                break;
            }

            allProjects = allProjects.concat(data);
            page++;
        }
    }

    sortedProjects = allProjects.sort((a, b) => {
        // Sort by popularity (stars + forks)
        const popularityA = a.stargazers_count + a.forks_count;
        const popularityB = b.stargazers_count + b.forks_count;
        if (popularityB !== popularityA) {
            return popularityB - popularityA;
        }
        // If popularity is the same, sort by date
        return new Date(b.updated_at) - new Date(a.updated_at);
    });

    // Initialize Fuse.js after sorting the projects
    fuse = new Fuse(sortedProjects, {
        keys: ['name', 'description', 'topics'], // Include topics as a searchable key
        threshold: 0.4,
        shouldSort: true
    });

    // Call the function to display sorted projects
    displayProjects(sortedProjects);
}

// Function to display projects
function displayProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = ''; // Clear the container

    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects to display. Please try again later.</p>';
        return;
    }

    projects.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('service-card');
        const iconClass = 'fas fa-bars-staggered';

        // Limit topics to max 3, add "..." if more
        let topics = repo.topics && repo.topics.length > 0
            ? repo.topics.slice(0, 3).join(', ') + (repo.topics.length > 3 ? ', ....' : '')
            : 'No topics available';

        projectCard.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank"><i class="${iconClass}"></i> ${repo.name}</a></h3>
            <div class="service-card">
                <p>${repo.description || 'No description available yet'}</p>
                <ul>
                    <li><i class="fas fa-calendar-alt"></i> Updated on: ${new Date(repo.updated_at).toLocaleDateString()}</li>
                    <li><i class="fas fa-code-branch"></i> Forks: ${repo.forks_count}</li>
                    <li><i class="fas fa-star"></i> Stars: ${repo.stargazers_count}</li>
                    <li><i class="fas fa-tag"></i> Topics: ${topics}</li>
                </ul>
            </div>
            ${repo.homepage ? `<div class="service-card"> <i class="fas fa-globe"></i> <a href="${repo.homepage}" target="_blank">Website</a></div>` : ''}
        `;
        projectsContainer.appendChild(projectCard);
    });
}

// Apply the stored color on page load
function applyStoredColor() {
    const storedColor = localStorage.getItem('selectedColor');
    if (storedColor) {
        document.documentElement.className = storedColor;
    }
}

function logActiveSection() {
    activeSection = document.querySelector('section.active');
    if (activeSection) {
        activeSection.classList.add('logged-active');
    }
}

function restoreActiveSection() {
    const loggedActiveSection = document.querySelector('section.logged-active');
    if (loggedActiveSection) {
        loggedActiveSection.classList.add('active');
        loggedActiveSection.classList.remove('logged-active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and sort projects when the page loads
    fetchAndSortProjects();

    applyStoredColor();

    // Navigation link click handling
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Hide all sections
                document.querySelectorAll('section').forEach(section => {
                    section.classList.remove('active');
                    section.classList.remove('fadeIn');
                });

                // Show the target section with animation
                targetSection.classList.add('active');
                targetSection.classList.add('fadeIn');

                // Add or remove fullscreen class to header based on the target section
                const header = document.querySelector('header');
                if (targetId === 'home') {
                    header.classList.add('fullscreen');
                    header.classList.remove('top');
                    document.querySelector('.social-links').style.display = 'flex';
                    document.getElementById('home-description').style.display = 'block';
                } else {
                    document.getElementById('home-description').style.display = 'none';
                    document.querySelector('.social-links').style.display = 'none';
                    header.classList.remove('fullscreen');
                    header.classList.add('top');
                }

                // If the overview section is clicked, display the projects
                if (targetId === 'overview') {
                    displayProjects(sortedProjects);
                }

                // Scroll to the top of the page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Show the home section by default
    document.getElementById('home').classList.add('active');

    // Intersection Observer for animations with delay
    const observerOptions = {
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                setTimeout(() => {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }, 100);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = document.querySelectorAll('section, header');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Modal logic
    const modal = document.getElementById('color-switcher-modal');
    const settingsButton = document.getElementById('settings-button');
    const closeButton = document.querySelector('.close-button');

    // Open modal when settings button is clicked
    settingsButton.addEventListener('click', (event) => {
        event.preventDefault();
        logActiveSection();
        modal.style.display = 'block';
        document.querySelectorAll('body > *:not(#color-switcher-modal)').forEach(element => {
            element.classList.add('blur');
        });
    });

    // Close modal only when close button is clicked
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        restoreActiveSection();
        document.querySelectorAll('.blur').forEach(element => {
            element.classList.remove('blur');
        });
        modal.style.pointerEvents = 'auto';
    });

    // Disable closing modal by clicking outside the content
    // Get all elements that close modals
    const closeButtons = document.querySelectorAll('.close');

    // Add event listeners to close modals only on clicking the close buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedColor = event.currentTarget.getAttribute('data-color');
            document.documentElement.className = selectedColor;
            localStorage.setItem('selectedColor', selectedColor);
            // Apply the selected color immediately
            document.documentElement.className = selectedColor;
        });
    });

    const birthDate = new Date('1999-10-09');
    const today = new Date();
    const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    document.getElementById('age-in-days').textContent = ageInDays;

    // Search functionality
    document.getElementById('search-input').addEventListener('input', function(e) {
        const searchQuery = e.target.value;
        if (searchQuery.length > 0) {
            const searchResults = fuse.search(searchQuery);
            displayProjects(searchResults.map(result => result.item));
        } else {
            displayProjects(sortedProjects);
        }
    });
});
