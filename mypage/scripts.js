document.addEventListener('DOMContentLoaded', function() {
    // Fetch GitHub projects and display them in the Overview section
    fetch('https://api.github.com/users/1999AZZAR/repos')
        .then(response => response.json())
        .then(data => {
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = ''; // Clear the loading message

            data
                .filter(repo => repo.description) // Filter out projects without descriptions
                .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // Sort projects by date
                .forEach(repo => {
                    const projectCard = document.createElement('div');
                    projectCard.classList.add('service-card');
                    const iconClass = 'fas fa-project-diagram'; // You can customize this icon class as needed
                    projectCard.innerHTML = `
                        <h3><a href="${repo.html_url}" target="_blank"><i class="${iconClass}"></i> ${repo.name}</a></h3>
                        <p>${repo.description}</p>
                        <ul>
                            <li><i class="fas fa-calendar-alt"></i> Updated on: ${new Date(repo.updated_at).toLocaleDateString()}</li>
                            <li><i class="fas fa-code-branch"></i> Forks: ${repo.forks_count}</li>
                            <li><i class="fas fa-star"></i> Stars: ${repo.stargazers_count}</li>
                        </ul>
                    `;
                    projectsContainer.appendChild(projectCard);
                });
        })
        .catch(error => {
            console.error('Error fetching GitHub repositories:', error);
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = '<p>Failed to load projects. Please try again later.</p>';
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

    // Calculate age in days
    const birthDate = new Date('1999-10-09');
    const today = new Date();
    const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    document.getElementById('age-in-days').textContent = ageInDays;
});
