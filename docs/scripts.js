// Global variable to store the sorted projects
let sortedProjects = [];

// Function to fetch and sort GitHub projects
function fetchAndSortProjects() {
    return fetch('https://api.github.com/users/1999AZZAR/repos')
        .then(response => response.json())
        .then(data => {
            sortedProjects = data.sort((a, b) => {
                // Sort by popularity (stars + forks)
                const popularityA = a.stargazers_count + a.forks_count;
                const popularityB = b.stargazers_count + b.forks_count;
                if (popularityB !== popularityA) {
                    return popularityB - popularityA;
                }
                // If popularity is the same, sort by date
                return new Date(b.updated_at) - new Date(a.updated_at);
            });
        })
        .catch(error => {
            console.error('Error fetching GitHub repositories:', error);
        });
});

// Function to display projects
function displayProjects() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = ''; // Clear the container

    if (sortedProjects.length === 0) {
        projectsContainer.innerHTML = '<p>No projects to display. Please try again later.</p>';
        return;
    }

    sortedProjects.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('service-card');
        const iconClass = 'fas fa-bars-staggered';
        projectCard.innerHTML = `
            <h3><a href="${repo.html_url}" target="_blank"><i class="${iconClass}"></i> ${repo.name}</a></h3>
            <p>${repo.description || 'No description available'}</p>
            <ul>
                <li><i class="fas fa-calendar-alt"></i> Updated on: ${new Date(repo.updated_at).toLocaleDateString()}</li>
                <li><i class="fas fa-code-branch"></i> Forks: ${repo.forks_count}</li>
                <li><i class="fas fa-star"></i> Stars: ${repo.stargazers_count}</li>
            </ul>
        `;
        projectsContainer.appendChild(projectCard);
        document.querySelectorAll('body > *:not(#color-switcher-modal)').forEach(element => {
            element.classList.add('blur');
        });
        document.querySelectorAll('body > *:not(#color-switcher-modal)').forEach(element => {
            element.classList.add('blur');
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.querySelectorAll('.blur').forEach(element => {
            element.classList.remove('blur');
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.querySelectorAll('.blur').forEach(element => {
                element.classList.remove('blur');
            });
        }
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.querySelectorAll('.blur').forEach(element => {
            element.classList.remove('blur');
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.querySelectorAll('.blur').forEach(element => {
                element.classList.remove('blur');
            });
        }
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and sort projects when the page loads
    fetchAndSortProjects().then(() => {
        console.log('Projects data is ready to be displayed.');
        // If the overview section is visible by default, uncomment the next line
        // displayProjects();
    });

    // Navigation link click handling
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Hide all sections with animation
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
                displayProjects();
            }

            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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

    settingsButton.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const selectedColor = event.currentTarget.getAttribute('data-color');
            document.documentElement.className = selectedColor;
        });
    });
    const birthDate = new Date('1999-10-09');
    const today = new Date();
    const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    document.getElementById('age-in-days').textContent = ageInDays;
});
