// Array of skills
const skills = [
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

class SkillsRotator {
    constructor(containerId, skills) {
        this.container = document.getElementById(containerId);
        this.skills = skills;
        this.currentElement = null;
        this.nextElement = null;
    }

    getRandomSkills(count = 3) {
        const shuffled = [...this.skills].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    createSkillElement(skills) {
        const div = document.createElement('div');
        div.className = 'skill-text';
        div.textContent = skills.join(' • ');
        return div;
    }

    async rotate() {
        // Remove old inactive element
        if (this.currentElement?.classList.contains('inactive')) {
            this.container.removeChild(this.currentElement);
        }

        // Move current to inactive
        if (this.nextElement) {
            this.currentElement = this.nextElement;
            this.currentElement.classList.remove('active');
            this.currentElement.classList.add('inactive');
        }

        // Create and show new element
        const randomSkills = this.getRandomSkills();
        this.nextElement = this.createSkillElement(randomSkills);
        this.container.appendChild(this.nextElement);

        // Trigger reflow
        void this.nextElement.offsetWidth;

        // Activate new element
        this.nextElement.classList.add('active');
    }

    start(interval = 3000) {
        this.rotate();
        setInterval(() => this.rotate(), interval);
    }
}

// Initialize and start the rotator
const rotator = new SkillsRotator('skills-wrapper', skills);
rotator.start(2500);
