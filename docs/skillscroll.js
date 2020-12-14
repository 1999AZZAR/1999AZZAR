// Skills Rotator with Translation Support
// Integrates with the translation system to show skills in the current language

class SkillsRotator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentElement = null;
        this.nextElement = null;
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.isRunning = false;
        this.intervalId = null;
        this.animationQueue = [];
        this.isAnimating = false;
        
        // Performance optimization: Pre-create elements pool
        this.elementPool = [];
        this.poolSize = 3;
        this.initElementPool();
    }

    // Initialize element pool for better performance
    initElementPool() {
        for (let i = 0; i < this.poolSize; i++) {
            const element = document.createElement('div');
            element.className = 'skill-text';
            element.style.textAlign = 'center';
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            this.elementPool.push(element);
        }
    }

    // Get element from pool
    getElementFromPool() {
        return this.elementPool.find(el => !el.parentNode) || this.createElement();
    }

    // Return element to pool
    returnElementToPool(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.textContent = '';
        }
    }

    // Get skills array for the current language from translations
    getSkillsArray() {
        if (typeof translations !== 'undefined' && translations[this.currentLanguage] && translations[this.currentLanguage].skillsArray) {
            return translations[this.currentLanguage].skillsArray;
        }
        
        // Fallback to English skills if translation not available
        return [
            // Core Software Development
            "Programming", "Python", "C++", "C#", "Rust", "TypeScript", "JavaScript",
            "HTML", "CSS", "Git", "Version Control", "Shell Scripting", "Perl",
            "Ruby", "Go", "MATLAB", "Scala",

            // Web Technologies
            "Web", "Full-stack", "Backend", "Frontend", "React.js", "Vue.js",
            "Angular", "Svelte", "Tailwind CSS", "Bootstrap", "Flask", "Django",
            "GraphQL", "REST APIs", "Next.js", "Nuxt.js", "Express.js", "WebSockets",
            "WordPress Development",

            // Infrastructure & DevOps
            "DevOps", "Docker", "Kubernetes", "Linux", "Unix", "Cloud Computing",
            "AWS", "Azure", "Google Cloud Platform (GCP)", "Firebase", "Cloud Services",
            "Terraform", "CI/CD", "Ansible", "Jenkins", "NGINX", "Apache", "Flask",

            // Data & AI
            "Machine Learning", "AI", "Data Science", "Deep Learning", "Data Analysis",
            "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
            "Computer Vision", "Natural Language Processing", "Big Data",
            "Hadoop", "Spark", "Voice Recognition", "Data Visualization",
            "Tableau", "Power BI", "MATLAB Data Analysis", "Data Warehousing",

            // Business Systems & ERP
            "ERP", "Odoo", "SAP", "Business Process Management",
            "Customer Relationship Management (CRM)", "Inventory Management",
            "Financial Accounting", "Human Resource Management (HRM)",
            "Enterprise Integration", "Workflow Automation",

            // IoT & Embedded
            "IoT", "Microcontrollers", "Embedded Systems", "Arduino", "Raspberry Pi",
            "ESP32", "FPGA", "VHDL", "Verilog", "Electronics", "Computer Hardware",
            "PCB Design", "Sensor Integration", "Wireless Communication", "Custom Library",
            "Wokwi", "Tinkercad", "Adafruit IO",

            // Database & Security
            "Database Management", "SQL", "NoSQL", "MongoDB", "PostgreSQL",
            "MySQL", "Redis", "Elasticsearch", "Firebase Realtime Database",
            "Cybersecurity", "Networking", "API Design", "Penetration Testing",
            "Ethical Hacking", "Cryptography", "Identity Management",

            // Engineering & Design
            "Robotics", "Control Systems", "UI/UX Design", "3D Printing", "CAD Design",
            "SolidWorks", "AutoCAD", "Figma", "Prototyping", "Photography",
            "Animation", "Blender",

            // Project Management & Soft Skills
            "Project Management", "Technical Writing", "Agile Methodologies", "SCRUM",
            "Kanban", "Leadership", "Team Management", "Creative Thinking",
            "Problem Solving", "Critical Thinking", "Negotiation", "Conflict Resolution",
            "Time Management", "Public Speaking", "Stakeholder Management",

            // Sustainable Tech
            "Sustainability", "Renewable Energy", "Solar Panels", "Wind Energy",
            "Power Management", "HVAC Systems", "Electric Vehicles", "Battery Storage",
            "Energy Efficiency", "Smart Cities", "Green Building Technologies",

            // Miscellaneous
            "Blockchain", "Cryptocurrency", "Smart Contracts", "Quantum Computing",
            "Game Development", "React Native",
            "Chatbot Development", "Content Creation",
            "SEO Optimization", "Digital Marketing"
        ];
    }

    getRandomSkills(count = 3) {
        const skills = this.getSkillsArray();
        const shuffled = [...skills].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    createElement() {
        const div = document.createElement('div');
        div.className = 'skill-text';
        div.style.textAlign = 'center';
        div.style.opacity = '0';
        div.style.transform = 'translateY(20px)';
        div.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        return div;
    }

    createSkillElement(skills) {
        const element = this.getElementFromPool();
        element.textContent = skills.join(' • ');
        return element;
    }

    // Optimized animation using requestAnimationFrame
    async animateTransition(element) {
        return new Promise((resolve) => {
            // Use requestAnimationFrame for smooth animation
            requestAnimationFrame(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Resolve after transition completes
                setTimeout(resolve, 500);
            });
        });
    }

    async rotate() {
        // Prevent multiple simultaneous animations
        if (this.isAnimating) return;
        this.isAnimating = true;

        try {
            // Clean up old inactive element
            if (this.currentElement?.classList.contains('inactive')) {
                this.returnElementToPool(this.currentElement);
            }

            // Move current to inactive (if exists)
            if (this.nextElement) {
                this.currentElement = this.nextElement;
                if (this.currentElement) {
                    this.currentElement.classList.remove('active');
                    this.currentElement.classList.add('inactive');
                    // Fade out current element
                    this.currentElement.style.opacity = '0';
                    this.currentElement.style.transform = 'translateY(-20px)';
                }
            }

            // Create and show new element
            const randomSkills = this.getRandomSkills();
            this.nextElement = this.createSkillElement(randomSkills);
            this.container.appendChild(this.nextElement);

            // Animate in the new element
            await this.animateTransition(this.nextElement);
            this.nextElement.classList.add('active');

            // Clean up old element after animation
            if (this.currentElement && this.currentElement !== this.nextElement) {
                setTimeout(() => {
                    this.returnElementToPool(this.currentElement);
                }, 100);
            }
        } catch (error) {
            console.warn('Animation error:', error);
        } finally {
            this.isAnimating = false;
        }
    }

    // Update the language and refresh the display
    updateLanguage(lang) {
        this.currentLanguage = lang;
        if (this.isRunning && !this.isAnimating) {
            this.rotate(); // Immediate update when language changes
        }
    }

    start(interval = 2500) {
        if (this.isRunning) return; // Prevent multiple instances
        
        this.isRunning = true;
        this.rotate();
        
        // Use optimized interval management
        this.intervalId = setInterval(() => {
            // Only animate if page is visible (performance optimization)
            if (!document.hidden) {
                this.rotate();
            }
        }, interval);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
        this.isAnimating = false;
    }

    restart(interval = 2500) {
        this.stop();
        // Small delay to ensure clean restart
        setTimeout(() => {
            this.start(interval);
        }, 50);
    }

    // Clean up resources
    destroy() {
        this.stop();
        this.elementPool.forEach(el => {
            if (el.parentNode) {
                el.parentNode.removeChild(el);
            }
        });
        this.elementPool = [];
    }
}

// Initialize and start the rotator
const rotator = new SkillsRotator('skills-wrapper');

// Performance optimization: Only start when page is visible
const startRotator = () => {
    if (document.visibilityState === 'visible') {
        rotator.start(2500);
    }
};

// Handle page visibility changes for better performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        rotator.stop();
    } else {
        rotator.start(2500);
    }
});

// Start the rotator once DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startRotator);
} else {
    startRotator();
}

// Export for use in other scripts (language switching)
if (typeof window !== 'undefined') {
    window.skillsRotator = rotator;
}
