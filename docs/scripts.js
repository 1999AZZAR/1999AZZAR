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

// Header Spacing Utilities - Ensures sections are not covered by fixed header
const HeaderSpacingUtils = {
    // Get current header height including any dynamic changes
    getHeaderHeight: () => {
        const header = document.querySelector('header');
        if (!header) return 0;

        // Get computed height to account for dynamic changes
        const computedStyle = window.getComputedStyle(header);
        const height = header.offsetHeight;

        // Add small buffer for visual separation
        return height + 20; // 20px buffer
    },

    // Adjust section spacing based on header height
    adjustSectionSpacing: () => {
        const headerHeight = HeaderSpacingUtils.getHeaderHeight();
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            // Skip home section if header is fullscreen
            if (section.id === 'home') {
                const header = document.querySelector('header');
                if (header && header.classList.contains('fullscreen')) {
                    // Home section gets minimal spacing when header is fullscreen
                    section.style.paddingTop = '2rem';
                    section.style.marginTop = '0';
                    return;
                }
            }

            // Apply dynamic spacing for other sections
            if (ViewportUtils.isMobile()) {
                // On mobile, use padding-top instead of margin-top for better control
                section.style.paddingTop = `${headerHeight}px`;
                section.style.marginTop = '0';
                section.style.scrollMarginTop = `${headerHeight}px`;
            } else {
                // On desktop, use margin-top for cleaner spacing
                section.style.marginTop = `${headerHeight}px`;
                section.style.paddingTop = '';
                section.style.scrollMarginTop = `${headerHeight}px`;
            }
        });
    },

    // Initialize header spacing adjustments
    init: () => {
        // Initial adjustment
        HeaderSpacingUtils.adjustSectionSpacing();

        // Adjust on header class changes (fullscreen/top toggle)
        const headerObserver = new MutationObserver(PerformanceUtils.debounce(() => {
            HeaderSpacingUtils.adjustSectionSpacing();
        }, 100));

        const header = document.querySelector('header');
        if (header) {
            headerObserver.observe(header, {
                attributes: true,
                attributeFilter: ['class']
            });
        }

        // Adjust on resize
        const handleResize = PerformanceUtils.throttle(() => {
            HeaderSpacingUtils.adjustSectionSpacing();
        }, 100);

        window.addEventListener('resize', handleResize);

        // Adjust on orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                HeaderSpacingUtils.adjustSectionSpacing();
            }, 100);
        });

        console.log('Header spacing adjustments initialized');
    }
};

// Viewport Containment Utilities - Prevents elements from rendering outside viewport on mobile
const ViewportUtils = {
    // Check if device is mobile/tablet
    isMobile: () => window.innerWidth <= 1024,

    // Get safe viewport dimensions (accounting for mobile browser UI)
    getSafeViewport: () => {
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        // Account for mobile browser UI (address bar, etc.)
        if (ViewportUtils.isMobile()) {
            // On mobile, viewport height can change when scrolling
            const visualViewport = window.visualViewport;
            if (visualViewport) {
                viewport.width = visualViewport.width;
                viewport.height = visualViewport.height;
                viewport.offsetX = visualViewport.offsetLeft;
                viewport.offsetY = visualViewport.offsetTop;
            }
        }

        return viewport;
    },

    // Constrain element position and size within viewport
    constrainToViewport: (element, options = {}) => {
        if (!element || !ViewportUtils.isMobile()) return;

        const viewport = ViewportUtils.getSafeViewport();
        const rect = element.getBoundingClientRect();

        // Default options
        const settings = {
            margin: 8, // Minimum margin from viewport edges
            maxWidth: true,
            maxHeight: true,
            centerIfNeeded: false,
            ...options
        };

        let needsAdjustment = false;
        const styles = {};

        // Check horizontal overflow
        if (settings.maxWidth && (rect.right > viewport.width - settings.margin || rect.left < settings.margin)) {
            const maxWidth = viewport.width - (settings.margin * 2);
            if (rect.width > maxWidth) {
                styles.width = `${maxWidth}px`;
                styles.maxWidth = `${maxWidth}px`;
                needsAdjustment = true;
            }

            // Center element if it's wider than viewport
            if (settings.centerIfNeeded && rect.width >= viewport.width - (settings.margin * 2)) {
                styles.left = `${settings.margin}px`;
                styles.right = `${settings.margin}px`;
                styles.marginLeft = 'auto';
                styles.marginRight = 'auto';
            }
        }

        // Check vertical overflow
        if (settings.maxHeight && (rect.bottom > viewport.height - settings.margin || rect.top < settings.margin)) {
            const maxHeight = viewport.height - (settings.margin * 2);
            if (rect.height > maxHeight) {
                styles.height = `${maxHeight}px`;
                styles.maxHeight = `${maxHeight}px`;
                styles.overflowY = 'auto';
                needsAdjustment = true;
            }
        }

        // Apply adjustments if needed
        if (needsAdjustment) {
            Object.assign(element.style, styles);
        }

        return needsAdjustment;
    },

    // Fix common problematic elements
    fixCommonElements: () => {
        if (!ViewportUtils.isMobile()) return;

        const viewport = ViewportUtils.getSafeViewport();

        // Fix navigation elements
        const navElements = document.querySelectorAll('header nav ul');
        navElements.forEach(nav => {
            ViewportUtils.constrainToViewport(nav, {
                margin: 4,
                maxWidth: true,
                centerIfNeeded: true
            });
        });

        // Fix modal elements
        const modals = document.querySelectorAll('.modal, .receipt-modal');
        modals.forEach(modal => {
            const modalContent = modal.querySelector('.modal-content, .receipt-container');
            if (modalContent) {
                ViewportUtils.constrainToViewport(modalContent, {
                    margin: 10,
                    maxWidth: true,
                    maxHeight: true
                });
            }
        });

        // Fix service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            ViewportUtils.constrainToViewport(card, {
                margin: 8,
                maxWidth: true
            });
        });

        // Fix calculator inputs
        const calculator = document.querySelector('#pricing-calculator');
        if (calculator) {
            ViewportUtils.constrainToViewport(calculator, {
                margin: 10,
                maxWidth: true
            });
        }
    },

    // Initialize viewport containment
    init: () => {
        // Initial fix
        ViewportUtils.fixCommonElements();

        // Fix on resize (throttled for performance)
        const handleResize = PerformanceUtils.throttle(() => {
            ViewportUtils.fixCommonElements();
        }, 100);

        window.addEventListener('resize', handleResize);

        // Fix on orientation change (mobile specific)
        window.addEventListener('orientationchange', () => {
            // Delay to account for mobile browser UI changes
            setTimeout(() => {
                ViewportUtils.fixCommonElements();
            }, 100);
        });

        // Fix when visual viewport changes (mobile keyboard, etc.)
        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', PerformanceUtils.throttle(() => {
                ViewportUtils.fixCommonElements();
            }, 50));
        }

        // Fix after dynamic content loads
        const observer = new MutationObserver(PerformanceUtils.debounce(() => {
            ViewportUtils.fixCommonElements();
        }, 200));

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['style', 'class']
        });

        console.log('Viewport containment initialized for mobile devices');
    }
};

// Global variables
let sortedProjects = [];
let activeSection = null;
let fuse; // For fuzzy search

// Enhanced variables for overview functionality
let currentView = 'web'; // 'web' or 'repos'
let allRepos = [];

// Remove the hardcoded customLiveSites array
let customLiveSites = [];

// Function to fetch and sort GitHub projects from multiple users
async function fetchAndSortProjects() {
    try {
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
                if (data.length === 0) {
                    break;
                }
                allProjects = allProjects.concat(data);
                page++;
                if (page > 10) break; // Limit to prevent excessive requests
            }
        }

        // Fetch and parse live_site.txt
        customLiveSites = [];
        try {
            const response = await fetch('live_site.txt');
            if (response.ok) {
                const text = await response.text();
                customLiveSites = text
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line && !line.startsWith('#'))
                    .map(line => {
                        const [homepage, nameDesc] = line.split('|').map(s => s.trim());
                        let name = homepage, description = '';
                        if (nameDesc) {
                            // Try to split name and description by the first ' - '
                            const dashIdx = nameDesc.indexOf(' - ');
                            if (dashIdx !== -1) {
                                name = nameDesc.slice(0, dashIdx).trim();
                                description = nameDesc.slice(dashIdx + 3).trim();
                            } else {
                                name = nameDesc;
                                description = '';
                            }
                        }
                        return {
                            name,
                            description,
                            homepage,
                            html_url: homepage,
                            updated_at: new Date().toISOString(),
                            stargazers_count: 0,
                            forks_count: 0,
                            language: "Web",
                            topics: [],
                            archived: false
                        };
                    });
            }
        } catch (e) {
            console.warn('Could not load live_site.txt:', e);
        }

        // Add live sites to the projects
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

        allRepos = sortedProjects;

        if (typeof Fuse !== 'undefined') {
            fuse = new Fuse(sortedProjects, {
                keys: ['name', 'description', 'topics'],
                threshold: 0.4,
                shouldSort: true
            });
        } else {
            console.warn('Fuse.js library not loaded, search functionality will be limited');
            fuse = null;
        }

        updateOverviewStats(allRepos);
        hideOverviewLoading();
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

    const currentLang = localStorage.getItem('selectedLanguage') || 'en';

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
        const formattedStars = typeof formatNumber === 'function' ? formatNumber(repo.stargazers_count, currentLang) : repo.stargazers_count;
        const formattedForks = typeof formatNumber === 'function' ? formatNumber(repo.forks_count, currentLang) : repo.forks_count;

        if (type === 'web' && repo.homepage) {
            // Web site card with dynamic screenshot preview
            projectCard.innerHTML = `
                <h3><i class="fas fa-globe"></i> ${repo.name}</h3>
                <div class="service-card">
                    <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="image-link" style="display: block; text-decoration: none; color: inherit; position: relative; width: 100%; height: 250px; margin-bottom: 1rem; border-radius: 10px; overflow: hidden; background: #f5f5f5; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <img 
                            data-homepage="${repo.homepage}"
                            alt="Screenshot of ${repo.name}" 
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px; transition: transform 0.3s ease;"
                            loading="lazy"
                        >
                        <div class="image-fallback" style="display: none; width: 100%; height: 100%; background: #eee; color: #333; align-items: center; justify-content: center; text-align: center; position: absolute; inset: 0; z-index: 2; font-size: 1rem; padding: 1rem; display: flex; flex-direction: column;">
                            <i class='fas fa-exclamation-triangle' style='font-size: 2rem; margin-bottom: 0.5rem;'></i> Unable to load preview. <br> Click to visit the site directly.
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
            // After adding to DOM, fetch the screenshot URL
            setTimeout(() => {
                const img = projectCard.querySelector('img[data-homepage]');
                if (img) {
                    fetch(`https://api.microlink.io/?url=${encodeURIComponent(repo.homepage)}&screenshot=true&meta=false`)
                        .then(res => res.json())
                        .then(data => {
                            if (data.status === 'success' && data.data && data.data.screenshot && data.data.screenshot.url) {
                                img.onload = function() {
                                    img.style.display = 'block';
                                    if (img.nextElementSibling) {
                                        img.nextElementSibling.style.display = 'none';
                                    }
                                };
                                img.onerror = function() {
                                    img.style.display = 'none';
                                    if (img.nextElementSibling) {
                                        img.nextElementSibling.style.display = 'flex';
                                    }
                                };
                                img.src = data.data.screenshot.url;
                                img.removeAttribute('hidden');
                            } else {
                                img.style.display = 'none';
                                if (img.nextElementSibling) {
                                    img.nextElementSibling.style.display = 'flex';
                                }
                            }
                        })
                        .catch((err) => {
                            img.style.display = 'none';
                            img.nextElementSibling.style.display = 'flex';
                        });
                }
            }, 0);
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
    // Initialize viewport containment for mobile devices
    ViewportUtils.init();

    // Initialize header spacing adjustments
    HeaderSpacingUtils.init();

    // Fetch and sort projects when the page loads
    fetchAndSortProjects();

    // Navigation function for consistent behavior
    function navigateToSection(targetId) {
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

            // Re-apply translations when section becomes active (for elements that might have been missed)
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            if (typeof updateLanguage === 'function') {
                updateLanguage(currentLang);
            }

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

            // Adjust header spacing for the new active section
            setTimeout(() => {
                HeaderSpacingUtils.adjustSectionSpacing();
            }, 100); // Small delay to ensure header class changes are applied

            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Navigation link click handling
    const navLinks = document.querySelectorAll('header nav ul li a:not(#language-toggle)');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateToSection(targetId);
        });
    });

    // Internal link click handling (for dynamically added links)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('internal-link') || event.target.closest('.internal-link')) {
            event.preventDefault();
            const link = event.target.classList.contains('internal-link') ? event.target : event.target.closest('.internal-link');
            const targetId = link.getAttribute('href').substring(1);
            navigateToSection(targetId);
        }
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

// Global exchange rates cache
let exchangeRates = null;
let exchangeRatesLoaded = false;

// Load exchange rates from API
async function loadExchangeRates() {
    if (exchangeRatesLoaded) return exchangeRates;

    try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/d04e488a7a2f1d8e44773078/latest/USD');
        const data = await response.json();
        if (data.result === 'success') {
            exchangeRates = data.conversion_rates;
            exchangeRatesLoaded = true;
            return exchangeRates;
        }
    } catch (error) {
        console.warn('Failed to load exchange rates:', error);
        // Fallback rates if API fails
        exchangeRates = {
            USD: 1,
            EUR: 0.85,
            GBP: 0.75,
            IDR: 15000
        };
        exchangeRatesLoaded = true;
        return exchangeRates;
    }
    return null;
}

// Format currency based on locale
function formatCurrency(amount, currency, lang) {
    const symbols = {
        USD: '$',
        EUR: '€',
        GBP: '£',
        IDR: 'Rp'
    };

    const formatted = new Intl.NumberFormat(lang === 'id' ? 'id-ID' : lang === 'ar' ? 'ar-SA' : 'en-US', {
        minimumFractionDigits: currency === 'IDR' ? 0 : 2,
        maximumFractionDigits: currency === 'IDR' ? 0 : 2
    }).format(amount);

    return `${symbols[currency]}${formatted}`;
}

// Rate Calculator Function with improved reliability
async function calcRate() {
    const hours = parseFloat(document.getElementById("hoursInput").value);
    const paymentPlan = document.getElementById("paymentPlanSelect").value;
    const currency = document.getElementById("currencySelect").value;
    const payConsultationSeparate = document.getElementById("consultationSeparateCheckbox").checked;
    const resultBox = document.getElementById("resultBox");
    const rateElem = document.getElementById("rateResult");
    const totalElem = document.getElementById("totalResult");
    const daysElem = document.getElementById("daysResult");
    const paymentBreakdown = document.getElementById("paymentBreakdown");
    const paymentSteps = document.getElementById("paymentSteps");

    // Get current language from localStorage
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';

    // Enhanced input validation
    if (isNaN(hours) || hours <= 0 || hours > 10000) {
        rateElem.innerText = "";
        totalElem.innerText = window.translations[currentLang]?.pricingInvalidHours || "Please enter valid hours (1-10000)";
        daysElem.innerText = "";
        paymentBreakdown.style.display = 'none';
        resultBox.style.display = 'none';
        return;
    }

    // Validate payment plan format
    if (!paymentPlan || !/^(\d+)-(.+)$/.test(paymentPlan)) {
        console.warn('Invalid payment plan format');
        return;
    }

    // Load exchange rates
    const rates = await loadExchangeRates();

    // Pricing parameters
    const Rmax = 35;   // Max rate ($)
    const Rmin = 20;   // Min rate ($)
    const Hmin = 8;    // Min hours for max rate
    const Hmax = 208;  // Max hours for min rate

    // Calculate consultation fees automatically (every 30 hours = 1 fee, $70-$120 each)
    const numConsultationFees = Math.floor(hours / 30);
    let totalConsultationUSD = 0;
    const consultationFees = [];

    // Use deterministic calculation based on hours for consistent pricing
    for (let i = 0; i < numConsultationFees; i++) {
        // Create consistent variation based on project size and consultation number
        // This ensures same input always gives same result (deterministic)
        const baseFee = 95; // Base consultation fee
        const variation = Math.sin(hours * 0.1 + i * 0.5) * 15; // Consistent variation based on input
        const fee = Math.max(70, Math.min(120, baseFee + variation)); // Clamp between 70-120
        consultationFees.push(Math.round(fee)); // Round to nearest dollar
        totalConsultationUSD += Math.round(fee);
    }

    // Calculate hourly rate
    let rateUSD;
    if (hours <= Hmin) rateUSD = Rmax;
    else if (hours >= Hmax) rateUSD = Rmin;
    else rateUSD = Rmax - ((Rmax - Rmin) / (Hmax - Hmin)) * (hours - Hmin);

    // Calculate totals (minimum project price $250)
    const projectTotalUSD = Math.max(rateUSD * hours, 250);
    const days = Math.ceil(hours / 8);

    // Convert to selected currency
    const rateConverted = rateUSD * (rates ? rates[currency] : 1);
    const projectTotalConverted = projectTotalUSD * (rates ? rates[currency] : 1);
    const consultationTotalConverted = totalConsultationUSD * (rates ? rates[currency] : 1);

    // Calculate payment installments with optimized logic
    let installments = [];
    let paymentDescriptions = [];

    // Pre-calculate currency conversion rate once
    const currencyRate = rates ? rates[currency] : 1;

    if (payConsultationSeparate && numConsultationFees > 0) {
        // Pay project cost in installments, consultation fees separately
        const percentages = paymentPlan.split('-').slice(1).map(p => parseInt(p) / 100);

        // Add project payments
        installments.push(...percentages.map(pct => projectTotalConverted * pct));
        paymentDescriptions.push(...installments.slice(0, percentages.length).map((amount, index) =>
            `${window.translations[currentLang].pricingPaymentProjectLabel} ${index + 1} (Project): ${formatCurrency(amount, currency, currentLang)}`
        ));

        // Add consultation fees as separate payments (convert once and cache)
        const consultationPayments = consultationFees.map(fee => fee * currencyRate);
        installments.push(...consultationPayments);
        paymentDescriptions.push(...consultationPayments.map((feeConverted, i) =>
            `${window.translations[currentLang].pricingPaymentConsultationLabel} ${i + 1}: ${formatCurrency(feeConverted, currency, currentLang)}`
        ));
    } else {
        // Pay everything together in installments (original logic)
        const totalConverted = (projectTotalUSD + totalConsultationUSD) * currencyRate;
        const percentages = paymentPlan.split('-').slice(1).map(p => parseInt(p) / 100);

        installments = percentages.map(pct => totalConverted * pct);
        paymentDescriptions = installments.map((amount, index) =>
            `Payment ${index + 1}: ${formatCurrency(amount, currency, currentLang)}`
        );
    }

    // Show result box
    resultBox.style.display = 'block';

    // Show results card
    document.getElementById("results-card").style.display = 'block';

    // Show generate receipt button
    document.getElementById("pricing-generate-receipt-btn").style.display = 'inline-block';

    // Display results
    rateElem.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px;">
            <i class="fas fa-dollar-sign" style="color:#0078ff;font-size:18px;"></i>
            <div>
                <div style="font-size:12px;color:#6c757d;margin-bottom:2px;">${window.translations[currentLang].pricingResultRate}</div>
                <div style="font-size:16px;">${formatCurrency(rateConverted, currency, currentLang)}/hour</div>
            </div>
        </div>
    `;

    // Calculate the total amount to display
    const totalAmountToDisplay = payConsultationSeparate ?
        projectTotalConverted :
        projectTotalConverted + consultationTotalConverted;

    let totalHTML = `
        <div style="display:flex;align-items:center;justify-content:center;gap:10px;">
            <i class="fas fa-calculator" style="font-size:20px;"></i>
            <div>
                <div style="font-size:14px;margin-bottom:4px;">${window.translations[currentLang].pricingResultTotal}</div>
                <div style="font-size:18px;">${formatCurrency(totalAmountToDisplay, currency, currentLang)}</div>
                <div style="font-size:12px;margin-top:2px;">for ${hours} hours</div>
    `;

    if (numConsultationFees > 0) {
        if (payConsultationSeparate) {
            totalHTML += `<div style="font-size:12px;margin-top:4px;color:#ffc107;">+ ${formatCurrency(consultationTotalConverted, currency, currentLang)} ${window.translations[currentLang].pricingConsultationFeesPaidSeparately}</div>`;
        } else {
            totalHTML += `<div style="font-size:12px;margin-top:4px;">(${formatCurrency(consultationTotalConverted, currency, currentLang)} ${window.translations[currentLang].pricingConsultationIncluded})</div>`;
        }
    }

    totalHTML += `</div></div>`;
    totalElem.innerHTML = totalHTML;

    daysElem.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px;">
            <i class="fas fa-calendar-alt" style="color:#28a745;font-size:18px;"></i>
            <div>
                <div style="font-size:12px;color:#6c757d;margin-bottom:2px;">${window.translations[currentLang].pricingResultDays}</div>
                <div style="font-size:16px;">${days} days</div>
                <div style="font-size:12px;color:#6c757d;">${hours} hours total</div>
            </div>
        </div>
    `;

    // Display payment breakdown
    if (installments.length > 0) {
        paymentBreakdown.style.display = 'block';
        paymentSteps.innerHTML = paymentDescriptions.map((desc, index) => {
            const isProjectPayment = desc.includes('(Project)');
            const isConsultation = desc.includes('Consultation Fee') || desc.includes('Biaya Konsultasi') || desc.includes('رسوم الاستشارة');
            const bgColor = isConsultation ? '#fff3cd' : '#e7f3ff';
            const borderColor = isConsultation ? '#ffc107' : '#0078ff';
            const iconClass = isConsultation ? 'fas fa-user-tie' : 'fas fa-project-diagram';

            return `
                <div style="background:${bgColor};border:1px solid ${borderColor};border-radius:8px;padding:12px;display:flex;align-items:center;gap:10px;">
                    <div style="background:${borderColor};color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;">
                        ${index + 1}
                    </div>
                    <i class="${iconClass}" style="color:${borderColor};font-size:16px;"></i>
                    <div style="flex:1;">
                        <div style="font-weight:600;color:#2c3e50;">${desc}</div>
                    </div>
                </div>
            `;
        }).join('');
    } else {
        paymentBreakdown.style.display = 'none';
    }
}

// Reset Calculator Function
function resetCalculator() {
    // Clear input fields
    document.getElementById("hoursInput").value = "";
    document.getElementById("projectDescriptionInput").value = "";

    // Reset dropdowns to default values
    document.getElementById("paymentPlanSelect").selectedIndex = 0;
    document.getElementById("currencySelect").selectedIndex = 0;

    // Uncheck consultation separate checkbox
    document.getElementById("consultationSeparateCheckbox").checked = false;

    // Clear result displays
    document.getElementById("rateResult").innerHTML = "";
    document.getElementById("totalResult").innerHTML = "";
    document.getElementById("daysResult").innerHTML = "";

    // Hide payment breakdown
    document.getElementById("paymentBreakdown").style.display = 'none';

    // Hide result box
    document.getElementById("resultBox").style.display = 'none';

    // Hide results card
    document.getElementById("results-card").style.display = 'none';

    // Hide generate receipt button
    document.getElementById("pricing-generate-receipt-btn").style.display = 'none';
}

// Generate Receipt Function
async function generateReceipt() {
    const hours = parseFloat(document.getElementById("hoursInput").value);
    const paymentPlan = document.getElementById("paymentPlanSelect").value;
    const currency = document.getElementById("currencySelect").value;
    const payConsultationSeparate = document.getElementById("consultationSeparateCheckbox").checked;
    const projectDescription = document.getElementById("projectDescriptionInput").value.trim();
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';

    if (isNaN(hours) || hours <= 0) {
        alert(window.translations[currentLang]?.pricingInvalidHours || "Please enter valid hours first");
        return;
    }

    // Calculate pricing using shared function
    const pricing = await calculatePricing(hours, currency);
    const {
        rates,
        numConsultationFees,
        totalConsultationUSD,
        consultationFees,
        rateUSD,
        projectTotalUSD,
        projectTotalConverted,
        consultationTotalConverted
    } = pricing;

    const days = Math.ceil(hours / 8);
    const rateConverted = rateUSD * (rates ? rates[currency] : 1);

    // Generate PayPal payment link
    const paypalLink = generatePayPalLink(projectTotalUSD + totalConsultationUSD, currency, `Project Development - ${hours} hours`);

    // Generate comprehensive WhatsApp message with full payment details
    let whatsappMessage = `Hi Azzar! I'm interested in your development services.\n\n`;

    if (projectDescription) {
        whatsappMessage += `Project Description:\n${projectDescription}\n\n`;
    }

    whatsappMessage += `PROJECT DETAILS:\n`;
    whatsappMessage += `- Hours: ${hours}\n`;
    whatsappMessage += `- Currency: ${currency}\n\n`;

    whatsappMessage += `PAYMENT BREAKDOWN:\n`;
    if (payConsultationSeparate) {
        whatsappMessage += `- Project Cost: ${formatCurrency(projectTotalConverted, currency, currentLang)}\n`;
        whatsappMessage += `- Consultation Fee: ${formatCurrency(consultationTotalConverted, currency, currentLang)}\n`;
        whatsappMessage += `- Total Amount: ${formatCurrency(projectTotalConverted + consultationTotalConverted, currency, currentLang)}\n\n`;
    } else {
        whatsappMessage += `- Project Cost (incl. consultation): ${formatCurrency(projectTotalConverted, currency, currentLang)}\n`;
        whatsappMessage += `- Consultation Fee: Included\n`;
        whatsappMessage += `- Total Amount: ${formatCurrency(projectTotalConverted + consultationTotalConverted, currency, currentLang)}\n\n`;
    }

    whatsappMessage += `PAYMENT PLAN: ${getPaymentPlanName(paymentPlan)}\n\n`;

    // Add payment schedule details
    const paymentBreakdown = generatePaymentBreakdownHTML(paymentPlan, projectTotalConverted + (payConsultationSeparate ? 0 : consultationTotalConverted), consultationTotalConverted, currency, payConsultationSeparate, currentLang);
    // Extract just the payment schedule from the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = paymentBreakdown;
    const paymentText = tempDiv.textContent || tempDiv.innerText || '';
    whatsappMessage += `PAYMENT SCHEDULE:\n${paymentText.replace(/Payment \d+:/g, '• Payment $&').replace(/\n/g, '\n')}\n\n`;

    whatsappMessage += `I've generated a detailed receipt. Let's discuss the project timeline and get started!`;

    const whatsappMessageEncoded = encodeURIComponent(whatsappMessage);
    const whatsappLink = `https://wa.me/+6282232529804?text=${whatsappMessageEncoded}`;

    // Generate QR codes using reliable online API
    const generateQRURL = (text) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}&ecc=M&margin=2`;
    };

    const whatsappQRDataURL = generateQRURL(whatsappLink);
    const paypalQRDataURL = paymentPlan === '1-100' ? generateQRURL(paypalLink) : '';

    // Generate receipt content
    const receiptHTML = `
        <div class="receipt-container" style="font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;max-width:800px;margin:0 auto;background:white;color:#2c3e50;">
            <!-- Professional Header -->
            <div style="background:linear-gradient(135deg,#1e3c72,#2a5298);color:white;padding:30px;text-align:center;border-radius:10px 10px 0 0;">
                <div style="display:flex;align-items:center;justify-content:center;margin-bottom:15px;">
                <img src="https://raw.githubusercontent.com/1999AZZAR/1999AZZAR/readme/resources/logo.png"
                     alt="Azzar Budiyanto Logo"
                         style="width:70px;height:70px;border-radius:50%;border:3px solid white;margin-right:15px;">
                    <div style="text-align:left;">
                        <h1 style="margin:0;font-size:28px;font-weight:300;letter-spacing:1px;">Azzar Budiyanto</h1>
                        <p style="margin:5px 0;font-size:14px;opacity:0.9;">Freelance Engineer & Full-Stack Developer</p>
                    </div>
                </div>
                <div style="border-top:1px solid rgba(255,255,255,0.3);padding-top:15px;margin-top:15px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div style="text-align:left;">
                            <p style="margin:0;font-size:12px;opacity:0.8;">RECEIPT</p>
                            <p style="margin:5px 0;font-size:16px;font-weight:500;">#${Date.now().toString().slice(-8).toUpperCase()}</p>
                        </div>
                        <div style="text-align:right;">
                            <p style="margin:0;font-size:12px;opacity:0.8;">DATE ISSUED</p>
                            <p style="margin:5px 0;font-size:14px;">${new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Professional Project Details -->
            <div style="padding:30px;background:#f8f9fa;border-left:4px solid #3498db;">
                <h2 style="color:#2c3e50;margin:0 0 25px 0;font-size:22px;border-bottom:2px solid #3498db;padding-bottom:10px;">
                    <i class="fas fa-project-diagram" style="color:#3498db;margin-right:10px;"></i>Project Details
                </h2>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:30px;margin-bottom:25px;">
                    <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e9ecef;">
                        <h4 style="margin:0 0 15px 0;color:#3498db;font-size:16px;">Project Specifications</h4>
                        <div style="line-height:1.6;">
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                                <span style="color:#7f8c8d;">Hours:</span>
                                <strong style="color:#2c3e50;">${hours}</strong>
                    </div>
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                                <span style="color:#7f8c8d;">Estimated Days:</span>
                                <strong style="color:#2c3e50;">${days}</strong>
                    </div>
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                                <span style="color:#7f8c8d;">Hourly Rate:</span>
                                <strong style="color:#2c3e50;">${formatCurrency(rateConverted, currency, currentLang)}</strong>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:#7f8c8d;">Currency:</span>
                                <strong style="color:#2c3e50;">${currency}</strong>
                            </div>
                </div>
            </div>

                    <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e9ecef;">
                        <h4 style="margin:0 0 15px 0;color:#3498db;font-size:16px;">Financial Summary</h4>
                        <div style="line-height:1.6;">
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                                <span style="color:#7f8c8d;">Project Total:</span>
                                <strong style="color:#2c3e50;">${formatCurrency(projectTotalConverted, currency, currentLang)}</strong>
                            </div>
                            ${numConsultationFees > 0 ? `
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                                <span style="color:#7f8c8d;">Consultation Fees:</span>
                                <strong style="color:#2c3e50;">${formatCurrency(consultationTotalConverted, currency, currentLang)}</strong>
                            </div>
                            ` : ''}
                            <div style="border-top:2px solid #3498db;padding-top:10px;margin-top:10px;">
                                <div style="display:flex;justify-content:space-between;">
                                    <span style="color:#2c3e50;font-weight:600;">Grand Total:</span>
                                    <strong style="color:#e74c3c;font-size:18px;">${formatCurrency(projectTotalConverted + consultationTotalConverted, currency, currentLang)}</strong>
                                </div>
                            </div>
                        </div>
                </div>
            </div>

                ${projectDescription ? `
                <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e9ecef;">
                    <h4 style="margin:0 0 15px 0;color:#3498db;font-size:16px;">
                        <i class="fas fa-file-alt" style="margin-right:8px;"></i>Project Description
                    </h4>
                    <div style="color:#2c3e50;line-height:1.6;white-space:pre-wrap;font-size:14px;">${projectDescription}</div>
                </div>
                ` : ''}
            </div>

            <!-- Professional Payment Plan -->
            <div style="padding:30px;background:#f8f9fa;border-left:4px solid #27ae60;">
                <h2 style="color:#2c3e50;margin:0 0 25px 0;font-size:22px;border-bottom:2px solid #27ae60;padding-bottom:10px;">
                    <i class="fas fa-calendar-check" style="color:#27ae60;margin-right:10px;"></i>Payment Plan
                </h2>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:25px;">
                    <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e9ecef;">
                        <h4 style="margin:0 0 15px 0;color:#27ae60;font-size:16px;">Plan Overview</h4>
                        <div style="line-height:1.6;">
                            <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
                                <span style="color:#7f8c8d;">Payment Plan:</span>
                                <strong style="color:#2c3e50;">${paymentPlan.replace('2-40-60', '2 Payments (40/60)').replace('2-60-40', '2 Payments (60/40)').replace('3-20-30-40', '3 Payments (20/30/40)').replace('3-40-30-20', '3 Payments (40/30/20)').replace('1-100', 'Full Payment')}</strong>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:#7f8c8d;">Consultation Fees:</span>
                                <strong style="color:#2c3e50;">${payConsultationSeparate ? 'Paid Separately' : 'Included'}</strong>
                            </div>
                        </div>
                    </div>

                    <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e9ecef;">
                        <h4 style="margin:0 0 15px 0;color:#27ae60;font-size:16px;">Payment Breakdown</h4>
                        <div style="max-height:120px;overflow-y:auto;">
                            ${generatePaymentBreakdownHTML(paymentPlan, projectTotalUSD + (payConsultationSeparate ? 0 : totalConsultationUSD), totalConsultationUSD, currency, payConsultationSeparate, currentLang)}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Professional Payment Options with QR Codes -->
            <div style="padding:30px;background:#f8f9fa;border-left:4px solid #e67e22;">
                <h2 style="color:#2c3e50;margin:0 0 25px 0;font-size:22px;border-bottom:2px solid #e67e22;padding-bottom:10px;">
                    <i class="fas fa-credit-card" style="color:#e67e22;margin-right:10px;"></i>Payment Options
                </h2>

                <div style="margin-bottom:30px;">
                    ${generatePaymentOptionsHTML(projectTotalUSD, totalConsultationUSD, paymentPlan, currency, payConsultationSeparate, currentLang, hours)}
                </div>

                <!-- QR Codes Section -->
                <div style="background:white;padding:25px;border-radius:10px;border:1px solid #e9ecef;margin-bottom:25px;">
                    <h3 style="margin:0 0 20px 0;color:#2c3e50;text-align:center;font-size:18px;">Scan QR Codes for Quick Access</h3>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;text-align:center;">
                        <!-- WhatsApp QR -->
                        <div style="padding:20px;border:2px solid #25d366;border-radius:10px;background:#f8fff9;">
                            <h4 style="margin:0 0 15px 0;color:#25d366;font-size:16px;">
                                <i class="fab fa-whatsapp" style="margin-right:8px;"></i>Contact via WhatsApp
                            </h4>
                            <div style="margin-bottom:10px;">
                                <img src="${whatsappQRDataURL}" style="width:150px;height:150px;border:1px solid #e9ecef;border-radius:6px;" alt="WhatsApp QR Code" />
                            </div>
                            <p style="margin:5px 0;font-size:12px;color:#7f8c8d;">Scan to discuss project details</p>
                    <a href="${whatsappLink}" target="_blank"
                               style="display:inline-block;margin-top:10px;padding:8px 16px;background:#25d366;color:white;text-decoration:none;border-radius:6px;font-size:12px;">
                                <i class="fab fa-whatsapp" style="margin-right:5px;"></i>Open WhatsApp
                            </a>
                        </div>

                        <!-- PayPal QR (only for full payment) -->
                        ${paymentPlan === '1-100' ? `
                        <div style="padding:20px;border:2px solid #0070ba;border-radius:10px;background:#f7fbff;">
                            <h4 style="margin:0 0 15px 0;color:#0070ba;font-size:16px;">
                                <i class="fab fa-paypal" style="margin-right:8px;"></i>PayPal Payment
                            </h4>
                            <div style="margin-bottom:10px;">
                                <img src="${paypalQRDataURL}" style="width:150px;height:150px;border:1px solid #e9ecef;border-radius:6px;" alt="PayPal QR Code" />
                            </div>
                            <p style="margin:5px 0;font-size:12px;color:#7f8c8d;">Scan to make payment</p>
                            <a href="${generatePayPalLink(projectTotalUSD + totalConsultationUSD, currency, `Project Development - ${hours} hours`)}" target="_blank"
                               style="display:inline-block;margin-top:10px;padding:8px 16px;background:#0070ba;color:white;text-decoration:none;border-radius:6px;font-size:12px;">
                                <i class="fab fa-paypal" style="margin-right:5px;"></i>Pay with PayPal
                    </a>
                </div>
                        ` : `
                        <div style="padding:20px;border:2px solid #95a5a6;border-radius:10px;background:#f8f9fa;text-align:center;">
                            <h4 style="margin:0 0 15px 0;color:#95a5a6;font-size:16px;">
                                <i class="fas fa-calendar-alt" style="margin-right:8px;"></i>Installment Payments
                            </h4>
                            <div style="padding:20px;background:#ecf0f1;border-radius:6px;margin-bottom:10px;">
                                <i class="fas fa-handshake" style="font-size:24px;color:#95a5a6;margin-bottom:10px;display:block;"></i>
                                <p style="margin:0;font-size:14px;color:#2c3e50;">For installment payments, please contact me directly to arrange your payment schedule.</p>
                    </div>
                            <p style="margin:5px 0;font-size:12px;color:#7f8c8d;">Use WhatsApp or Email to discuss terms</p>
                    </div>
                        `}
                </div>
            </div>

                <!-- Contact Options -->
                <div style="text-align:center;">
                    <h3 style="margin:0 0 20px 0;color:#2c3e50;font-size:18px;">Alternative Contact Methods</h3>
                    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:15px;">
                        <a href="${whatsappLink}" target="_blank"
                           style="padding:12px 25px;background:#25d366;color:white;text-decoration:none;border-radius:8px;display:inline-flex;align-items:center;gap:8px;font-weight:500;min-width:160px;justify-content:center;">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </a>
                        <a href="mailto:azzar.mr.zs@gmail.com?subject=Project%20Inquiry%20-%20${hours}%20Hours%20Development%20Project&body=Hi%20Azzar,%0A%0AI'm%20interested%20in%20your%20professional%20development%20services.%0A%0A${projectDescription ? 'PROJECT DESCRIPTION:%0A' + encodeURIComponent(projectDescription) + '%0A%0A' : ''}PROJECT DETAILS:%0A- Hours: ${hours}%0A- Currency: ${currency}%0A- Payment Plan: ${encodeURIComponent(getPaymentPlanName(paymentPlan))}%0A%0A${payConsultationSeparate ? 'PAYMENT BREAKDOWN:%0A- Project Cost: ' + encodeURIComponent(formatCurrency(projectTotalConverted, currency, currentLang)) + '%0A- Consultation Fee: ' + encodeURIComponent(formatCurrency(consultationTotalConverted, currency, currentLang)) + '%0A- Total Amount: ' + encodeURIComponent(formatCurrency(projectTotalConverted + consultationTotalConverted, currency, currentLang)) : 'PAYMENT BREAKDOWN:%0A- Project Cost (incl. consultation): ' + encodeURIComponent(formatCurrency(projectTotalConverted, currency, currentLang)) + '%0A- Consultation Fee: Included in project cost%0A- Total Amount: ' + encodeURIComponent(formatCurrency(projectTotalConverted + consultationTotalConverted, currency, currentLang))}%0A%0APAYMENT SCHEDULE:%0A${(() => { const breakdown = generatePaymentBreakdownHTML(paymentPlan, projectTotalConverted + (payConsultationSeparate ? 0 : consultationTotalConverted), consultationTotalConverted, currency, payConsultationSeparate, currentLang); const tempDiv = document.createElement('div'); tempDiv.innerHTML = breakdown; return encodeURIComponent((tempDiv.textContent || tempDiv.innerText || '').replace(/\n\s*\n/g, '\n').trim()); })()}%0A%0AI've%20generated%20a%20detailed%20receipt%20with%20QR%20codes%20for%20easy%20payment.%0A%0ALet's%20discuss%20the%20project%20timeline%20and%20next%20steps!"
                           style="padding:12px 25px;background:#ea4335;color:white;text-decoration:none;border-radius:8px;display:inline-flex;align-items:center;gap:8px;font-weight:500;min-width:160px;justify-content:center;">
                            <i class="fas fa-envelope"></i> Email
                        </a>
                    </div>
                </div>
            </div>

            <!-- Professional Terms & Conditions -->
            <div style="padding:30px;background:#f8f9fa;border-left:4px solid #9b59b6;">
                <h2 style="color:#2c3e50;margin:0 0 25px 0;font-size:22px;border-bottom:2px solid #9b59b6;padding-bottom:10px;">
                    <i class="fas fa-file-contract" style="color:#9b59b6;margin-right:10px;"></i>Terms & Conditions
                </h2>

                <div style="background:white;padding:25px;border-radius:8px;border:1px solid #e9ecef;">
                    <div style="display:grid;grid-template-columns:1fr 1fr;gap:25px;">
                        <div>
                            <h4 style="margin:0 0 15px 0;color:#9b59b6;font-size:16px;">Payment Terms</h4>
                            <ul style="margin:0;padding-left:20px;color:#2c3e50;line-height:1.6;">
                    ${generatePaymentTerms(paymentPlan)}
                            </ul>
                        </div>

                        <div>
                            <h4 style="margin:0 0 15px 0;color:#9b59b6;font-size:16px;">Project Terms</h4>
                            <ul style="margin:0;padding-left:20px;color:#2c3e50;line-height:1.6;">
                    <li>Project timeline: Approximately ${days} working days</li>
                    <li>Communication via WhatsApp/Email for updates</li>
                                <li>All rights reserved to delivered code/assets</li>
                                <li>Revisions included within agreed scope</li>
                                <li>Project commences upon payment confirmation</li>
                </ul>
                        </div>
            </div>

                    <div style="border-top:1px solid #e9ecef;padding-top:20px;margin-top:20px;">
                        <div style="background:#f8f9fa;padding:15px;border-radius:6px;border-left:4px solid #f39c12;">
                            <p style="margin:0;font-size:14px;color:#2c3e50;">
                                <strong style="color:#e74c3c;">Important:</strong> All payments are final once work has commenced.
                                Please review all details carefully before proceeding with payment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Professional Footer -->
            <div style="background:#2c3e50;color:white;padding:30px;text-align:center;border-radius:0 0 10px 10px;">
                <div style="margin-bottom:20px;">
                    <h3 style="margin:0 0 10px 0;font-size:18px;opacity:0.9;">Thank You for Your Business!</h3>
                    <p style="margin:0;font-size:14px;opacity:0.8;">We look forward to bringing your project to life</p>
                </div>

                <div style="border-top:1px solid rgba(255,255,255,0.2);padding-top:20px;">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:15px;">
                        <div>
                            <h4 style="margin:0 0 8px 0;font-size:14px;opacity:0.9;">Contact Information</h4>
                            <div style="font-size:13px;opacity:0.8;line-height:1.4;">
                                <p style="margin:0;"><i class="fas fa-map-marker-alt" style="margin-right:5px;"></i>Yogyakarta, Indonesia</p>
                                <p style="margin:0;"><i class="fas fa-phone" style="margin-right:5px;"></i>+62 82232529804</p>
                                <p style="margin:0;"><i class="fas fa-envelope" style="margin-right:5px;"></i>azzar.mr.zs@gmail.com</p>
                            </div>
                        </div>

                        <div>
                            <h4 style="margin:0 0 8px 0;font-size:14px;opacity:0.9;">Professional Services</h4>
                            <div style="font-size:13px;opacity:0.8;line-height:1.4;">
                                <p style="margin:0;">• IoT Development & Embedded Systems</p>
                                <p style="margin:0;">• Full-Stack Web Development</p>
                                <p style="margin:0;">• Python, JavaScript & C++ Programming</p>
                            </div>
                        </div>
                    </div>

                    <div style="border-top:1px solid rgba(255,255,255,0.2);padding-top:15px;">
                        <p style="margin:0;font-size:12px;opacity:0.7;">
                            Receipt generated on ${new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'})}
                        </p>
                        <p style="margin:5px 0 0 0;font-size:12px;opacity:0.7;">
                            © 2025 Azzar Budiyanto. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Set receipt content and show modal
    document.getElementById('receiptContent').innerHTML = receiptHTML;
    document.getElementById('receiptModal').style.display = 'block';
}

// Close Receipt Modal
function closeReceipt() {
    document.getElementById('receiptModal').style.display = 'none';
}

// Calculate Pricing Function (reusable for both receipt generation and printing)
async function calculatePricing(hours, currency) {
    // Load exchange rates
    const rates = await loadExchangeRates();

    // Pricing parameters
    const Rmax = 35;   // Max rate ($)
    const Rmin = 20;   // Min rate ($)
    const Hmin = 8;    // Min hours for max rate
    const Hmax = 208;  // Max hours for min rate

    // Calculate consultation fees
    const numConsultationFees = Math.floor(hours / 30);
    let totalConsultationUSD = 0;
    const consultationFees = [];

    for (let i = 0; i < numConsultationFees; i++) {
        const baseFee = 95;
        const variation = Math.sin(hours * 0.1 + i * 0.5) * 15;
        const fee = Math.max(70, Math.min(120, baseFee + variation));
        consultationFees.push(Math.round(fee));
        totalConsultationUSD += Math.round(fee);
    }

    // Calculate hourly rate
    let rateUSD;
    if (hours <= Hmin) rateUSD = Rmax;
    else if (hours >= Hmax) rateUSD = Rmin;
    else rateUSD = Rmax - ((Rmax - Rmin) / (Hmax - Hmin)) * (hours - Hmin);

    // Calculate totals (minimum project price $250)
    const projectTotalUSD = Math.max(rateUSD * hours, 250);

    // Convert to selected currency
    const projectTotalConverted = projectTotalUSD * (rates ? rates[currency] : 1);
    const consultationTotalConverted = totalConsultationUSD * (rates ? rates[currency] : 1);

    return {
        rates,
        Rmax,
        Rmin,
        Hmin,
        Hmax,
        numConsultationFees,
        totalConsultationUSD,
        consultationFees,
        rateUSD,
        projectTotalUSD,
        projectTotalConverted,
        consultationTotalConverted
    };
}

// Create clean print-optimized receipt
async function createPrintOptimizedReceipt() {
    const hours = parseFloat(document.getElementById("hoursInput").value);
    const paymentPlan = document.getElementById("paymentPlanSelect").value;
    const currency = document.getElementById("currencySelect").value;
    const payConsultationSeparate = document.getElementById("consultationSeparateCheckbox").checked;
    const projectDescription = document.getElementById("projectDescriptionInput").value.trim();
    const currentLang = localStorage.getItem('selectedLanguage') || 'en';

    // Calculate pricing using shared function
    const pricing = await calculatePricing(hours, currency);
    const {
        projectTotalConverted,
        consultationTotalConverted
    } = pricing;

    // Generate QR codes
    const generateQRURL = (text) => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(text)}&ecc=M&margin=1`;
    };

    // Generate comprehensive WhatsApp message for print version
    let printWhatsappMessage = `Hi Azzar! I'm interested in your professional development services.\n\n`;

    if (projectDescription) {
        printWhatsappMessage += `PROJECT DESCRIPTION:\n${projectDescription}\n\n`;
    }

    printWhatsappMessage += `DETAILED PROJECT INFORMATION:\n`;
    printWhatsappMessage += `- Hours Required: ${hours}\n`;
    printWhatsappMessage += `- Currency: ${currency}\n`;
    printWhatsappMessage += `- Payment Plan: ${getPaymentPlanName(paymentPlan)}\n\n`;

    printWhatsappMessage += `COMPREHENSIVE PAYMENT BREAKDOWN:\n`;
    if (payConsultationSeparate) {
        printWhatsappMessage += `- Base Project Cost: ${formatCurrency(projectTotalConverted, currency, currentLang)}\n`;
        printWhatsappMessage += `- Consultation Fee: ${formatCurrency(consultationTotalConverted, currency, currentLang)}\n`;
        printWhatsappMessage += `- Total Project Amount: ${formatCurrency(projectTotalConverted + consultationTotalConverted, currency, currentLang)}\n\n`;
    } else {
        printWhatsappMessage += `- Project Cost (including consultation): ${formatCurrency(projectTotalConverted, currency, currentLang)}\n`;
        printWhatsappMessage += `- Consultation Fee: Included in project cost\n`;
        printWhatsappMessage += `- Total Amount: ${formatCurrency(projectTotalConverted + consultationTotalConverted, currency, currentLang)}\n\n`;
    }

    printWhatsappMessage += `PAYMENT SCHEDULE:\n`;
    const paymentSchedule = generatePaymentBreakdownHTML(paymentPlan, projectTotalConverted + (payConsultationSeparate ? 0 : consultationTotalConverted), consultationTotalConverted, currency, payConsultationSeparate, currentLang);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = paymentSchedule;
    const scheduleText = (tempDiv.textContent || tempDiv.innerText || '').trim();
    printWhatsappMessage += scheduleText.split('\n').map(line => line.trim() ? `• ${line.trim()}` : '').filter(line => line).join('\n');
    printWhatsappMessage += `\n\nI've generated a professional receipt with payment QR codes. Ready to discuss project timeline and begin development!`;

    const whatsappLink = `https://wa.me/6282232529804?text=${encodeURIComponent(printWhatsappMessage)}`;
    const paypalLink = generatePayPalLink(projectTotalConverted + (payConsultationSeparate ? 0 : consultationTotalConverted), currency, `Project Development - ${hours} hours`);

    const whatsappQR = generateQRURL(whatsappLink);
    const paypalQR = paymentPlan === '1-100' ? generateQRURL(paypalLink) : null;

    // Build clean HTML
    const currentYear = new Date().getFullYear();

    let html = `
        <div class="print-receipt">

            <!-- Header -->
            <div class="print-header">
                <div class="logo-section">
                    <h1 class="company-name">AZZAR BUDIYANTO</h1>
                    <p class="company-tagline">Crafting Digital Solutions</p>
                </div>
                <div class="contact-section">
                    <p class="contact-info">azzar.mr.zs@gmail.com</p>
                    <p class="contact-info">+62 822 3252 9804</p>
                </div>
                <div class="branding-section">
                    <p class="branding-text">Freelance Engineer & Full-Stack Developer</p>
                    <p class="branding-text">Since 2023</p>
                </div>
            </div>

            <!-- Project Details -->
            <div class="print-section">
                <h2>Project Details</h2>
                <table class="financial-table">
                    <tr><td class="label">Hours:</td><td class="value">${hours}</td></tr>
                    <tr><td class="label">Currency:</td><td class="value">${currency}</td></tr>
                    <tr><td class="label">Payment Plan:</td><td class="value">${getPaymentPlanName(paymentPlan)}</td></tr>
                </table>
                ${projectDescription ? `<p><strong>Description:</strong> ${projectDescription}</p>` : ''}
            </div>

            <!-- Pricing Breakdown -->
            <div class="print-section">
                <h2>Pricing Breakdown</h2>
                <table class="financial-table">
                    <tr><td class="label">Project Cost:</td><td class="value">${formatCurrency(projectTotalConverted, currency, currentLang)}</td></tr>
                    ${payConsultationSeparate ?
                        `<tr><td class="label">Consultation Fee:</td><td class="value">${formatCurrency(consultationTotalConverted, currency, currentLang)}</td></tr>` :
                        `<tr><td class="label">Including Consultation:</td><td class="value">${formatCurrency(consultationTotalConverted, currency, currentLang)}</td></tr>`
                    }
                    <tr style="border-top: 2px solid #3498db;"><td class="label"><strong>Total Amount:</strong></td><td class="value"><strong>${formatCurrency(projectTotalConverted + (payConsultationSeparate ? 0 : consultationTotalConverted), currency, currentLang)}</strong></td></tr>
                </table>
            </div>

            <!-- Payment Schedule -->
            <div class="print-section">
                <h2>Payment Schedule</h2>
                ${generatePaymentBreakdownHTML(paymentPlan, projectTotalConverted + (payConsultationSeparate ? consultationTotalConverted : 0), consultationTotalConverted, currency, payConsultationSeparate, currentLang)}
            </div>

            <!-- QR Codes -->
            <div class="qr-section">
                <h2>Payment & Contact</h2>
                <div class="qr-container">
                    <div class="qr-item">
                        <h4>📱 WhatsApp Contact</h4>
                        <img src="${whatsappQR}" alt="WhatsApp QR" class="qr-code" />
                        <p class="qr-caption">Scan to contact via WhatsApp</p>
                    </div>
                    ${paypalQR ? `
                    <div class="qr-item">
                        <h4>💳 PayPal Payment</h4>
                        <img src="${paypalQR}" alt="PayPal QR" class="qr-code" />
                        <p class="qr-caption">Scan to make payment</p>
                    </div>
                    ` : `
                    <div class="qr-item">
                        <h4>💳 Payment Options</h4>
                        <p style="text-align: center; margin: 20px 0;">For installment payments,<br>please contact via WhatsApp<br>or email to arrange terms</p>
                    </div>
                    `}
                </div>
            </div>

            <!-- Terms & Conditions -->
            <div class="print-section">
                <h2>Terms & Conditions</h2>
                <ul>
                    <li>50% advance payment required to start the project</li>
                    <li>Remaining balance due upon project completion</li>
                    <li>All payments are non-refundable once work has commenced</li>
                    <li>Project timeline will be agreed upon before starting</li>
                    <li>Source code remains property of developer unless otherwise agreed</li>
                    <li>Client responsible for providing clear project requirements</li>
                </ul>
            </div>

            <!-- Footer -->
            <div class="print-footer">
                <h3>Thank You for Your Business!</h3>
                <p>Ready to bring your ideas to life with professional development</p>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
                <p>© ${currentYear} Azzar Budiyanto - Professional Developer</p>
            </div>

        </div>
    `;

    return html;
}

// Print Receipt
async function printReceipt() {
    const printContent = await createPrintOptimizedReceipt();
    const printWindow = window.open('', '_blank', 'width=800,height=600');

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Professional Receipt - Azzar Budiyanto</title>
            <style>
                @page {
                    size: A4;
                    margin: 15mm;
                }

                body {
                    font-family: 'Times New Roman', serif;
                    margin: 0;
                    padding: 0;
                    color: #2c3e50;
                    background: white;
                    line-height: 1.4;
                    font-size: 11px;
                }

                * {
                    box-sizing: border-box;
                }

                .print-receipt {
                    max-width: none;
                    margin: 0;
                }

                /* Header */
                .print-header {
                    background: #1e3c72;
                    color: white;
                    padding: 20px;
                    margin-bottom: 20px;
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                    display: table;
                    width: 100%;
                }

                .logo-section {
                    display: table-cell;
                    vertical-align: top;
                    width: 40%;
                    text-align: left;
                }

                .contact-section {
                    display: table-cell;
                    vertical-align: top;
                    width: 30%;
                    text-align: center;
                }

                .branding-section {
                    display: table-cell;
                    vertical-align: top;
                    width: 30%;
                    text-align: right;
                }

                .company-name {
                    font-size: 28px;
                    font-weight: bold;
                    margin: 0 0 3px 0;
                    letter-spacing: 2px;
                    color: #ffffff;
                }

                .company-tagline {
                    font-size: 12px;
                    margin: 0;
                    font-style: italic;
                    color: #e8f4f8;
                }

                .contact-info {
                    margin: 2px 0;
                    font-size: 10px;
                    line-height: 1.3;
                }

                .branding-text {
                    margin: 2px 0;
                    font-size: 10px;
                    text-align: right;
                }

                /* Section headers */
                .print-section h2 {
                    font-size: 14px;
                    font-weight: bold;
                    color: #2c3e50;
                    margin: 20px 0 10px 0;
                    padding-bottom: 3px;
                    border-bottom: 2px solid #3498db;
                    page-break-after: avoid;
                }

                .print-section h3 {
                    font-size: 12px;
                    font-weight: bold;
                    color: #2c3e50;
                    margin: 15px 0 8px 0;
                }

                /* Content sections */
                .print-section {
                    margin-bottom: 15px;
                    page-break-inside: avoid;
                }

                /* Financial data tables */
                .financial-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 10px 0;
                }

                .financial-table td {
                    padding: 4px 8px;
                    border-bottom: 1px solid #e9ecef;
                }

                .financial-table .label {
                    font-weight: normal;
                    width: 60%;
                }

                .financial-table .value {
                    text-align: right;
                    font-weight: bold;
                    width: 40%;
                }

                /* QR Code section */
                .qr-section {
                    margin: 20px 0;
                    page-break-inside: avoid;
                }

                .qr-container {
                    display: table;
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 10px 0;
                }

                .qr-item {
                    display: table-cell;
                    width: 50%;
                    vertical-align: top;
                    padding: 15px;
                    border: 1px solid #e9ecef;
                    background: #f8f9fa;
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }

                .qr-item h4 {
                    font-size: 11px;
                    margin: 0 0 10px 0;
                    text-align: center;
                }

                .qr-code {
                    display: block;
                    width: 100px;
                    height: 100px;
                    margin: 0 auto 8px auto;
                    border: 1px solid #ddd;
                    background: white;
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }

                .qr-caption {
                    font-size: 9px;
                    text-align: center;
                    color: #666;
                    margin: 0;
                }

                /* Contact section */
                .contact-section {
                    margin: 15px 0;
                }

                .contact-item {
                    margin-bottom: 8px;
                    padding: 8px;
                    border: 1px solid #e9ecef;
                    background: #f9f9f9;
                }

                .contact-item strong {
                    display: block;
                    font-size: 11px;
                    margin-bottom: 3px;
                }

                .contact-item span {
                    font-size: 10px;
                    color: #666;
                }

                /* Footer */
                .print-footer {
                    background: #2c3e50;
                    color: white;
                    padding: 15px;
                    margin-top: 20px;
                    text-align: center;
                    -webkit-print-color-adjust: exact;
                    color-adjust: exact;
                }

                .print-footer h3 {
                    font-size: 13px;
                    margin: 0 0 10px 0;
                }

                .print-footer p {
                    margin: 3px 0;
                    font-size: 9px;
                }

                /* Lists */
                ul {
                    padding-left: 15px;
                    margin: 5px 0;
                }

                li {
                    margin-bottom: 2px;
                    line-height: 1.3;
                    font-size: 10px;
                }

                /* General text */
                p {
                    margin: 3px 0;
                    line-height: 1.3;
                }

                /* Images */
                img {
                    max-width: 100%;
                    height: auto;
                    -webkit-print-color-adjust: exact !important;
                    color-adjust: exact !important;
                }

                /* Force QR codes to load */
                img[alt*="QR"] {
                    display: block !important;
                    image-rendering: pixelated !important;
                }

                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                        color-adjust: exact;
                        print-color-adjust: exact;
                    }

                    .print-receipt {
                        box-shadow: none;
                    }

                    /* Ensure all sections stay together */
                    .print-section,
                    .qr-section,
                    .contact-section {
                        page-break-inside: avoid;
                    }
                }
            </style>
        </head>
        <body>
            ${printContent}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    // Wait for images to load before printing (increased delay for QR code API)
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 1500);
}

// Generate PayPal Payment Link
function generatePayPalLink(amount, currency, description) {
    // PayPal payment link structure
    const paypalBase = 'https://www.paypal.com/cgi-bin/webscr';
    const params = new URLSearchParams({
        cmd: '_xclick',
        business: 'azzar.mr.zs@gmail.com', // Replace with your PayPal email
        item_name: description,
        amount: amount.toFixed(2),
        currency_code: currency,
        return: window.location.origin + '/porto',
        cancel_return: window.location.origin + '/porto'
    });

    return `${paypalBase}?${params.toString()}`;
}

// Generate Payment Options HTML
function generatePaymentOptionsHTML(projectTotalUSD, consultationTotalUSD, paymentPlan, currency, payConsultationSeparate, currentLang, hours) {
    const rates = exchangeRates || { USD: 1, EUR: 0.85, GBP: 0.75, IDR: 15000 };
    const currencyRate = rates[currency] || 1;
    const percentages = paymentPlan.split('-').slice(1).map(p => parseInt(p) / 100);
    const numPayments = parseInt(paymentPlan.split('-')[0]);

    let html = '';

    if (numPayments === 1) {
        // Single payment - show PayPal link
        const totalAmount = (projectTotalUSD + consultationTotalUSD) * currencyRate;
        const paypalLink = generatePayPalLink(projectTotalUSD + consultationTotalUSD, currency, `Project Development - ${hours} hours`);
        html += `
            <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:10px;">
                <h4 style="margin:0 0 10px 0;color:#2c3e50;">Full Payment</h4>
                <p style="margin:5px 0;font-size:14px;">Total: <strong>${formatCurrency(totalAmount, currency, currentLang)}</strong></p>
                <a href="${paypalLink}" target="_blank"
                   style="background:#0070ba;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;font-size:14px;">
                    <i class="fab fa-paypal"></i> Pay Full Amount
                </a>
            </div>
        `;
    } else {
        // Installment payments - show breakdown with contact instruction
        html += `
            <div style="background:#f8f9fa;padding:15px;border-radius:8px;margin-bottom:10px;">
                <h4 style="margin:0 0 10px 0;color:#2c3e50;">${numPayments} Payment Installments</h4>
                <p style="margin:5px 0;font-size:14px;color:#6c757d;">Please contact me via WhatsApp or Email to arrange installment payments</p>
                <div style="margin-top:10px;padding:10px;background:#fff;border-radius:4px;">
        `;

        if (payConsultationSeparate && Math.floor(hours / 30) > 0) {
        // Separate payments
            const numConsultationFees = Math.floor(hours / 30);
            html += '<strong>Project Payments:</strong><br>';
        percentages.forEach((pct, index) => {
            const amount = (projectTotalUSD * pct) * currencyRate;
                html += `Payment ${index + 1}: ${formatCurrency(amount, currency, currentLang)}<br>`;
        });

            html += '<br><strong>Consultation Fees:</strong><br>';
        for (let i = 0; i < numConsultationFees; i++) {
            const baseFee = 95;
            const variation = Math.sin(hours * 0.1 + i * 0.5) * 15;
            const fee = Math.max(70, Math.min(120, baseFee + variation));
            const amount = Math.round(fee) * currencyRate;
                html += `Consultation Fee ${i + 1}: ${formatCurrency(amount, currency, currentLang)}<br>`;
        }
    } else {
        // Combined payments
        const totalUSD = projectTotalUSD + consultationTotalUSD;
            html += '<strong>Combined Payments:</strong><br>';
        percentages.forEach((pct, index) => {
            const amount = (totalUSD * pct) * currencyRate;
                html += `Payment ${index + 1}: ${formatCurrency(amount, currency, currentLang)}<br>`;
            });
        }

        html += `
                </div>
            </div>
        `;
    }

    return html;
}


// Generate Payment Terms based on Payment Plan
function generatePaymentTerms(paymentPlan) {
    const percentages = paymentPlan.split('-').slice(1).map(p => parseInt(p));
    const numPayments = parseInt(paymentPlan.split('-')[0]);

    let termsHTML = '';

    if (numPayments === 1) {
        termsHTML += `<li>100% payment required to start the project</li>`;
        termsHTML += `<li>Project begins immediately after payment confirmation</li>`;
    } else if (numPayments === 2) {
        termsHTML += `<li>${percentages[0]}% advance payment required to start the project</li>`;
        termsHTML += `<li>${percentages[1]}% payment due upon project completion</li>`;
    } else if (numPayments === 3) {
        termsHTML += `<li>${percentages[0]}% advance payment required to start the project</li>`;
        termsHTML += `<li>${percentages[1]}% payment due at project midpoint</li>`;
        termsHTML += `<li>${percentages[2]}% final payment due upon project completion</li>`;
    }

    return termsHTML;
}

// Helper functions for print receipt
function getPaymentPlanName(plan) {
    const plans = {
        '1-100': 'Full Payment',
        '2-40-60': '50/50 Split',
        '2-60-40': '60/40 Split',
        '3-20-30-40': '20/30/50 Split',
        '3-40-30-20': '40/30/30 Split'
    };
    return plans[plan] || 'Custom Plan';
}

function generatePaymentBreakdownHTML(plan, totalAmount, consultationAmount, currency, paySeparate, currentLang) {
    const rates = exchangeRates || { USD: 1, EUR: 0.85, GBP: 0.75, IDR: 15000 };
    const currencyRate = rates[currency] || 1;
    const percentages = plan.split('-').slice(1).map(p => parseInt(p) / 100);

    let html = '<table class="financial-table">';

    if (paySeparate && consultationAmount > 0) {
        // Separate payments
        html += '<tr><td colspan="2"><strong>Project Payments:</strong></td></tr>';
        percentages.forEach((pct, index) => {
            const amount = totalAmount * pct;
            html += `<tr><td class="label">Payment ${index + 1} (${(pct * 100).toFixed(0)}%):</td><td class="value">${formatCurrency(amount, currency, currentLang)}</td></tr>`;
        });
        html += '<tr><td colspan="2"><strong>Consultation Fee:</strong></td></tr>';
        html += `<tr><td class="label">Separate Payment:</td><td class="value">${formatCurrency(consultationAmount, currency, currentLang)}</td></tr>`;
    } else {
        // Combined payments
        percentages.forEach((pct, index) => {
            const amount = totalAmount * pct;
            html += `<tr><td class="label">Payment ${index + 1} (${(pct * 100).toFixed(0)}%):</td><td class="value">${formatCurrency(amount, currency, currentLang)}</td></tr>`;
        });
    }

    html += '</table>';
    return html;
}

// QR codes are now generated using online API - no local generation functions needed
