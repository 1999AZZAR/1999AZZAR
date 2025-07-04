// Ultra-Smooth Skills Rotator with Translation Support
// Optimized for 60fps smooth animations

class SkillsRotator {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.isRunning = false;
        this.intervalId = null;
        this.isAnimating = false;
        
        // Single element approach for smoother performance
        this.skillElement = null;
        this.nextSkillText = '';
        this.animationId = null;
        
        this.init();
    }

    init() {
        // Create a single, permanent skill element
        this.skillElement = document.createElement('div');
        this.skillElement.className = 'skill-text';
        this.skillElement.style.cssText = `
            text-align: center;
            opacity: 1;
            transform: translateZ(0);
            will-change: opacity, transform;
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            backface-visibility: hidden;
            perspective: 1000px;
            position: relative;
            font-weight: 500;
        `;
        this.container.appendChild(this.skillElement);
        
        // Initial content
        const initialSkills = this.getRandomSkills();
        this.skillElement.textContent = initialSkills.join(' • ');
    }

    getSkillsArray() {
        if (typeof translations !== 'undefined' && translations[this.currentLanguage] && translations[this.currentLanguage].skillsArray) {
            return translations[this.currentLanguage].skillsArray;
        }
        
        // Fallback skills array
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

    // Ultra-smooth animation using optimized approach
    async animateToNewSkills() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        try {
            const newSkills = this.getRandomSkills();
            const newText = newSkills.join(' • ');
            
            // If same text, skip animation
            if (this.skillElement.textContent === newText) {
                this.isAnimating = false;
                return;
            }

            // Phase 1: Smooth fade out with slight upward movement
            await this.animatePhase({
                opacity: '0',
                transform: 'translateY(-8px) translateZ(0)'
            }, 400);

            // Phase 2: Update content and reset position
            this.skillElement.textContent = newText;
            this.skillElement.style.transform = 'translateY(8px) translateZ(0)';

            // Small delay to ensure content is updated
            await this.delay(20);

            // Phase 3: Smooth fade in with upward movement
            await this.animatePhase({
                opacity: '1',
                transform: 'translateY(0) translateZ(0)'
            }, 400);

        } catch (error) {
            console.warn('Animation error:', error);
        } finally {
            this.isAnimating = false;
        }
    }

    // Optimized animation phase using requestAnimationFrame
    animatePhase(styles, duration) {
        return new Promise((resolve) => {
            // Apply styles using requestAnimationFrame for smooth rendering
            this.animationId = requestAnimationFrame(() => {
                Object.assign(this.skillElement.style, styles);
                
                // Resolve after transition duration
                setTimeout(resolve, duration);
            });
        });
    }

    // Utility delay function
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateLanguage(lang) {
        this.currentLanguage = lang;
        if (this.isRunning && !this.isAnimating) {
            // Immediate smooth update when language changes
            this.animateToNewSkills();
        }
    }

    start(interval = 3000) {
        if (this.isRunning) return;
        
        this.isRunning = true;
        
        // Start the smooth rotation cycle
        this.intervalId = setInterval(() => {
            // Only animate if page is visible (performance optimization)
            if (!document.hidden && !this.isAnimating) {
                this.animateToNewSkills();
            }
        }, interval);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        this.isRunning = false;
        this.isAnimating = false;
    }

    restart(interval = 3000) {
        this.stop();
        // Small delay to ensure clean restart
        setTimeout(() => {
            this.start(interval);
        }, 50);
    }

    destroy() {
        this.stop();
        if (this.skillElement && this.skillElement.parentNode) {
            this.skillElement.parentNode.removeChild(this.skillElement);
        }
        this.skillElement = null;
    }
}

// Initialize the ultra-smooth rotator
const rotator = new SkillsRotator('skills-wrapper');

// Performance-optimized startup
const startRotator = () => {
    if (document.visibilityState === 'visible') {
        rotator.start(3000); // Slightly longer interval for better UX
    }
};

// Handle page visibility changes for optimal performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        rotator.stop();
    } else {
        rotator.start(3000);
    }
});

// Smooth startup when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startRotator);
} else {
    startRotator();
}

// Export for global access
if (typeof window !== 'undefined') {
    window.skillsRotator = rotator;
}
