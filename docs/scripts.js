// Performance Utilities
const PerformanceUtils = {
    // Debounce function to limit function calls
    debounce: (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(null, args), delay);
        };
    },
    
    // Throttle function for performance-critical operations
    throttle: (func, limit) => {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                func.apply(null, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Check if animations should be reduced (respects user preference)
    reduceMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Optimize animation frame scheduling
    scheduleAnimation: (callback) => {
        if (!document.hidden && !PerformanceUtils.reduceMotion()) {
            requestAnimationFrame(callback);
        } else {
            // Fallback for reduced motion or hidden tab
            setTimeout(callback, 16); // ~60fps fallback
        }
    }
};

// Global variables
let sortedProjects = [];
let activeSection = null;
let fuse; // For fuzzy search

// Enhanced variables for overview functionality
let currentView = 'web'; // 'web' or 'repos'
let allRepos = [];

// Custom live sites from live_site.txt
const customLiveSites = [
    {
        name: "Syaz Travel",
        description: "Travel haji dan umroh - professional travel services for pilgrimage",
        homepage: "https://syaztravel.com/beranda",
        html_url: "https://syaztravel.com/",
        updated_at: "2024-01-01",
        stargazers_count: 0,
        forks_count: 0,
        language: "Web",
        topics: ["travel", "haji", "umroh", "pilgrimage"],
        archived: false
    },
    {
        name: "Beranda Wirson",
        description: "Berita ekonomi dan UMKM - economic news and small business updates",
        homepage: "https://berandawirson.com/beranda",
        html_url: "https://berandawirson.com/",
        updated_at: "2024-01-01",
        stargazers_count: 0,
        forks_count: 0,
        language: "Web",
        topics: ["news", "ekonomi", "umkm", "business"],
        archived: false
    },
    {
        name: "Top Global Farming",
        description: "TGF - domba berkualitas, quality sheep farming services",
        homepage: "https://topglobalfarming.com/beranda",
        html_url: "https://topglobalfarming.com/",
        updated_at: "2024-01-01",
        stargazers_count: 0,
        forks_count: 0,
        language: "Web",
        topics: ["farming", "livestock", "agriculture", "sheep"],
        archived: false
    },
    {
        name: "Sewa Mobil Murah Palu",
        description: "Rental mobil palu - affordable car rental services in Palu",
        homepage: "https://sewamobilmurahpalu.com/",
        html_url: "https://sewamobilmurahpalu.com/",
        updated_at: "2024-01-01",
        stargazers_count: 0,
        forks_count: 0,
        language: "Web",
        topics: ["rental", "mobil", "palu", "transportation"],
        archived: false
    }
];

// Function to fetch and sort GitHub projects from multiple users
async function fetchAndSortProjects() {
    try {
        // Show loading state
        showOverviewLoading();
        
        const usernames = ['1999AZZAR', 'lily-osp'];
        let allProjects = [];

        for (const username of usernames) {
            let page = 1;
            const perPage = 100; // Maximum number of items per page
            while (true) {
                const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`);
                
                if (response.status === 403) {
                    console.warn('Rate limited or forbidden. Using available repos.');
                    break;
                }
                
                if (!response.ok) {
                    if (page === 1) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    } else {
                        console.warn(`Failed to fetch page ${page}, using available repos`);
                        break;
                    }
                }
                
                const data = await response.json();

                // Break the loop if no more data is returned
                if (data.length === 0) {
                    break;
                }

                allProjects = allProjects.concat(data);
                page++;
                
                if (page > 10) break; // Limit to prevent excessive requests
            }
        }

        // Add custom live sites to the projects
        allProjects = allProjects.concat(customLiveSites);

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

        // Store all repos for overview functionality
        allRepos = sortedProjects;

        // Initialize Fuse.js after sorting the projects (with safety check)
        if (typeof Fuse !== 'undefined') {
            fuse = new Fuse(sortedProjects, {
                keys: ['name', 'description', 'topics'], // Include topics as a searchable key
                threshold: 0.4,
                shouldSort: true
            });
        } else {
            console.warn('Fuse.js library not loaded, search functionality will be limited');
            fuse = null;
        }

        // Update stats
        updateOverviewStats(allRepos);
        
        // Hide loading state
        hideOverviewLoading();

        // Call the function to display sorted projects based on current view
        switchOverviewView(currentView);
        
    } catch (error) {
        console.error('Error loading portfolio:', error);
        showOverviewError();
    }
}

// Function to update overview stats
function updateOverviewStats(repos) {
    const totalRepos = repos.length;
    const deployedSites = repos.filter(repo => 
        repo.homepage && 
        repo.homepage.startsWith('http') && 
        !repo.archived &&
        !repo.name.includes('.wiki') &&
        !repo.homepage.toLowerCase().includes('wikipedia')
    ).length;
    const languages = new Set(repos.map(repo => repo.language).filter(lang => lang)).size;

    const totalReposEl = document.getElementById('total-repos');
    const deployedSitesEl = document.getElementById('deployed-sites');
    const languagesUsedEl = document.getElementById('languages-used');

    if (totalReposEl) {
        totalReposEl.textContent = totalRepos;
        totalReposEl.setAttribute('data-original', totalRepos);
    }
    if (deployedSitesEl) {
        deployedSitesEl.textContent = deployedSites;
        deployedSitesEl.setAttribute('data-original', deployedSites);
    }
    if (languagesUsedEl) {
        languagesUsedEl.textContent = languages;
        languagesUsedEl.setAttribute('data-original', languages);
    }

    // Update numbers for current language if translation is loaded
    if (typeof updateOverviewNumbers === 'function') {
        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        updateOverviewNumbers(currentLang);
    }
}

// Function to show loading state
function showOverviewLoading() {
    document.getElementById('overview-loading').style.display = 'flex';
    document.getElementById('overview-error').style.display = 'none';
    document.getElementById('projects-container').style.display = 'none';
}

// Function to hide loading state
function hideOverviewLoading() {
    document.getElementById('overview-loading').style.display = 'none';
    document.getElementById('projects-container').style.display = 'grid';
}

// Function to show error state
function showOverviewError() {
    document.getElementById('overview-loading').style.display = 'none';
    document.getElementById('overview-error').style.display = 'block';
    document.getElementById('projects-container').style.display = 'none';
}

// Function to switch between web sites and all repositories view
function switchOverviewView(view) {
    currentView = view;
    const webBtn = document.getElementById('web-btn');
    const repoBtn = document.getElementById('repo-btn');
    
    if (webBtn && repoBtn) {
        webBtn.classList.toggle('active', view === 'web');
        repoBtn.classList.toggle('active', view === 'repos');
    }

    if (view === 'web') {
        const sitesWithHomepage = allRepos.filter(repo => 
            repo.homepage && 
            repo.homepage.startsWith('http') && 
            !repo.archived &&
            !repo.name.includes('.wiki') &&
            !repo.homepage.toLowerCase().includes('wikipedia')
        );
        displayProjects(sitesWithHomepage, 'web');
    } else {
        const filteredRepos = allRepos.filter(repo => !repo.archived);
        displayProjects(filteredRepos, 'repos');
    }
}

// Enhanced function to display projects with modern design
function displayProjects(projects, type = 'repos') {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = ''; // Clear the container

    if (projects.length === 0) {
        projectsContainer.innerHTML = `
            <div class="overview-error-message">
                <h3>No ${type === 'web' ? 'live sites' : 'repositories'} found</h3>
                <p>It looks like there are no ${type === 'web' ? 'live sites' : 'repositories'} available yet.</p>
            </div>
        `;
        return;
    }

    projects.forEach((repo, index) => {
        const projectCard = document.createElement('div');
        projectCard.classList.add('service-card');
        
        const description = repo.description || 'No description available';
        const truncatedDescription = description.length > 100 ? 
            description.substring(0, 100) + '...' : description;

        // Limit topics to max 3, add "..." if more
        let topics = repo.topics && repo.topics.length > 0
            ? repo.topics.slice(0, 3).join(', ') + (repo.topics.length > 3 ? ', ....' : '')
            : 'No topics available';

        const languageColor = getLanguageColor(repo.language);

        // Format stars and forks based on current language
        const currentLang = localStorage.getItem('selectedLanguage') || 'en';
        const formattedStars = typeof formatNumber === 'function' ? formatNumber(repo.stargazers_count, currentLang) : repo.stargazers_count;
        const formattedForks = typeof formatNumber === 'function' ? formatNumber(repo.forks_count, currentLang) : repo.forks_count;

        if (type === 'web' && repo.homepage) {
            // Web site card with clickable iframe preview
            projectCard.innerHTML = `
                <h3><i class="fas fa-globe"></i> ${repo.name}</h3>
                <div class="service-card">
                    <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="iframe-link" style="display: block; text-decoration: none; color: inherit; position: relative; width: 100%; height: 250px; margin-bottom: 1rem; border-radius: 10px; overflow: hidden; background: #f5f5f5; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <iframe 
                            src="${repo.homepage}" 
                            style="width: 100%; height: 100%; border: none; border-radius: 10px; pointer-events: none;"
                            loading="lazy"
                            sandbox="allow-same-origin allow-scripts allow-forms"
                            title="Preview of ${repo.name}">
                        </iframe>
                        <div class="iframe-overlay" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.8rem; transition: all 0.3s ease;">
                            <i class="fas fa-external-link-alt"></i> Click to Visit
                        </div>
                        <div class="hover-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.1); opacity: 0; transition: opacity 0.3s ease; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; backdrop-filter: blur(2px);">
                            <i class="fas fa-external-link-alt"></i> Visit Website
                        </div>
                    </a>
                    <p>${truncatedDescription}</p>
                    <ul>
                        <li><i class="fas fa-calendar-alt"></i> Updated: ${new Date(repo.updated_at).toLocaleDateString()}</li>
                        <li><i class="fas fa-star"></i> Stars: ${formattedStars}</li>
                        <li><i class="fas fa-code-branch"></i> Forks: ${formattedForks}</li>
                        ${repo.language ? `<li><i class="fas fa-code"></i> <span style="color: ${languageColor};">●</span> ${repo.language}</li>` : ''}
                        <li><i class="fas fa-tag"></i> Topics: ${topics}</li>
                    </ul>
                </div>
            `;
        } else {
            // Repository card with clickable OpenGraph preview
            const opengraphUrl = `https://opengraph.githubassets.com/1/1999AZZAR/${repo.name}`;
            projectCard.innerHTML = `
                <h3><i class="fas fa-bars-staggered"></i> ${repo.name}</h3>
                <div class="service-card">
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="opengraph-link" style="display: block; text-decoration: none; color: inherit; position: relative; width: 100%; height: 200px; margin-bottom: 1rem; border-radius: 10px; overflow: hidden; background: #f5f5f5; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <img 
                            src="${opengraphUrl}" 
                            alt="${repo.name} OpenGraph Preview" 
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px; transition: transform 0.3s ease;"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                        <div class="fallback-preview" style="display: none; width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 1rem;">
                            <i class="fab fa-github" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                            <h4 style="margin: 0; font-size: 1.1rem;">${repo.name}</h4>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">${truncatedDescription}</p>
                        </div>
                        <div class="opengraph-overlay" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.8rem; transition: all 0.3s ease;">
                            <i class="fab fa-github"></i> Click to View
                        </div>
                        <div class="hover-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.1); opacity: 0; transition: opacity 0.3s ease; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem; backdrop-filter: blur(2px);">
                            <i class="fab fa-github"></i> View Repository
                        </div>
                    </a>
                    <p>${truncatedDescription}</p>
                    <ul>
                        <li><i class="fas fa-calendar-alt"></i> Updated: ${new Date(repo.updated_at).toLocaleDateString()}</li>
                        <li><i class="fas fa-star"></i> Stars: ${formattedStars}</li>
                        <li><i class="fas fa-code-branch"></i> Forks: ${formattedForks}</li>
                        ${repo.language ? `<li><i class="fas fa-code"></i> <span style="color: ${languageColor};">●</span> ${repo.language}</li>` : ''}
                        <li><i class="fas fa-tag"></i> Topics: ${topics}</li>
                    </ul>
                    ${repo.homepage && repo.homepage.startsWith('http') ? `
                        <div style="margin-top: 1rem;">
                            <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                                🔗 Live Demo
                            </a>
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Optimized staggered animation using requestAnimationFrame
        projectCard.style.opacity = '0';
        projectCard.style.transform = 'translateY(20px)';
        projectCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        projectsContainer.appendChild(projectCard);
        
        // Use requestAnimationFrame for better performance
        const animateCard = () => {
            requestAnimationFrame(() => {
                projectCard.style.opacity = '1';
                projectCard.style.transform = 'translateY(0)';
            });
        };
        
        // Staggered timing with optimized scheduling
        if (index === 0) {
            animateCard();
        } else {
            setTimeout(animateCard, Math.min(index * 50, 300)); // Cap maximum delay
        }
    });

    // Update project numbers for current language with optimized timing
    if (typeof updateProjectNumbers === 'function') {
        const delay = Math.min(projects.length * 50 + 100, 500); // Cap at 500ms
        setTimeout(() => {
            updateProjectNumbers(currentLang);
        }, delay);
    }
}

// Function to get language color (similar to overview.html)
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'TypeScript': '#2b7489',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'C': '#555555',
        'C#': '#239120',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33',
        'Dart': '#00B4AB',
        'Shell': '#89e051',
        'Vue': '#2c3e50',
        'Arduino': '#bd79d1'
    };
    return colors[language] || '#586069';
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

    // Navigation link click handling
    const navLinks = document.querySelectorAll('header nav ul li a:not(#language-toggle)');
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
                    switchOverviewView(currentView);
                }

                // Scroll to the top of the page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Show the home section by default (header has id="home")
    const headerElement = document.getElementById('home');
    if (headerElement) {
        headerElement.classList.add('fullscreen');
        headerElement.classList.remove('top');
    }

    // Hide all sections initially to ensure they start hidden
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });

    // Optimized Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px' // Start animation slightly before element enters viewport
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smooth animation timing
                requestAnimationFrame(() => {
                    entry.target.classList.add('animated');
                });
                // Unobserve immediately after animation starts to improve performance
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Only observe elements that aren't already animated
    const sections = document.querySelectorAll('section:not(.animated), header:not(.animated)');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Calculate and set age first before language update
    const birthDate = new Date('1999-10-09');
    const today = new Date();
    const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    document.getElementById('age-in-days').textContent = ageInDays;

    // Language toggle logic - three language switcher (EN → ID → AR → EN)
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        const storedLang = localStorage.getItem('selectedLanguage') || 'en';
        if (typeof updateLanguageIndicator === 'function') {
            updateLanguageIndicator(storedLang);
        }
        if (typeof updateLanguage === 'function') {
            updateLanguage(storedLang); // update on load
        }
        
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            let newLang;
            
            // Cycle through languages: en → id → ar → en
            if (currentLang === 'en') {
                newLang = 'id';
            } else if (currentLang === 'id') {
                newLang = 'ar';
            } else {
                newLang = 'en';
            }
            
            localStorage.setItem('selectedLanguage', newLang);
            if (typeof updateLanguage === 'function') {
                updateLanguage(newLang);
            }
            if (typeof updateLanguageIndicator === 'function') {
                updateLanguageIndicator(newLang);
            }
        });
    }

    // Enhanced Overview section functionality
    // Toggle buttons event listeners
    const webBtn = document.getElementById('web-btn');
    const repoBtn = document.getElementById('repo-btn');
    
    if (webBtn && repoBtn) {
        webBtn.addEventListener('click', () => switchOverviewView('web'));
        repoBtn.addEventListener('click', () => switchOverviewView('repos'));
    }

    // Enhanced search functionality with debouncing
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        const performSearch = PerformanceUtils.debounce(function(searchTerm) {
            if (searchTerm === '') {
                // Show all projects for current view
                switchOverviewView(currentView);
            } else if (fuse && allRepos.length > 0 && typeof Fuse !== 'undefined') {
                // Use Fuse.js for fuzzy search
                const searchResults = fuse.search(searchTerm).map(result => result.item);
                
                // Filter based on current view
                let filteredResults;
                if (currentView === 'web') {
                    filteredResults = searchResults.filter(repo => 
                        repo.homepage && 
                        repo.homepage.startsWith('http') && 
                        !repo.archived &&
                        !repo.name.includes('.wiki') &&
                        !repo.homepage.toLowerCase().includes('wikipedia')
                    );
                } else {
                    filteredResults = searchResults.filter(repo => !repo.archived);
                }
                
                displayProjects(filteredResults, currentView);
            } else if (allRepos.length > 0) {
                // Fallback to basic text search if Fuse.js is not available
                const searchResults = allRepos.filter(repo => {
                    const searchLower = searchTerm.toLowerCase();
                    return repo.name.toLowerCase().includes(searchLower) ||
                           (repo.description && repo.description.toLowerCase().includes(searchLower)) ||
                           (repo.topics && repo.topics.some(topic => topic.toLowerCase().includes(searchLower)));
                });
                
                // Filter based on current view
                let filteredResults;
                if (currentView === 'web') {
                    filteredResults = searchResults.filter(repo => 
                        repo.homepage && 
                        repo.homepage.startsWith('http') && 
                        !repo.archived &&
                        !repo.name.includes('.wiki') &&
                        !repo.homepage.toLowerCase().includes('wikipedia')
                    );
                } else {
                    filteredResults = searchResults.filter(repo => !repo.archived);
                }
                
                displayProjects(filteredResults, currentView);
            }
        }, 150); // 150ms debounce for optimal UX
        
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            performSearch(searchTerm);
        });
    }
});
