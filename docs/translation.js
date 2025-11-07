// Translation system for the portfolio website
// Global translations object containing all text content in multiple languages

const translations = {
  en: {
    mainTitle: "azzar budiyanto",
    homeDescriptionText: "Freelance engineer from Yogyakarta, ID.",
    navHome: "Home",
    navAbout: "About",
    navServices: "Services",
    navContact: "Contact",
    navPortfolio: "Portfolio",
    about: "About",
    summary: "Summary",
    summaryText: "A seasoned programmer with over 5 years of experience, specializing in IoT, web development, and embedded systems. Proficient in Python, JavaScript (including TypeScript & Node.js), C/C++, and Arduino, with expertise across modern web frameworks (React, Flask, Django) and microcontroller platforms (ESP32, STM32). Skilled in DevOps, cloud technologies (AWS), AI/Machine Learning, and advanced control systems (PID, Fuzzy Logic). My diverse technical toolkit, combined with fluency in English, Indonesian, Javanese, and Arabic, enables effective problem-solving and collaboration in dynamic environments.",
    resumeLink: "General Resume (PDF)",
    photoPortfolioLink: "Photographs portfolio (PDF)",
    ageLabel: "Age:",
    daysText: "days",
    freelanceText: "Freelance:",
    freelanceStatus: "Available",
    skillsTitle: "Skills",
    // Skills array for the rotating skills display
    skillsArray: [
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
      "SEO", "SEO Optimization", "Search Engine Optimization", "Digital Marketing",
      "SEO Optimization", "Comprehensive SEO services to improve your website's visibility, ranking, and organic traffic through on-page, off-page, and technical optimization."
    ],
    progLanguagesTitle: "Programming Languages",
    progLanguagesDesc: "Proficient in Python, JavaScript, TypeScript, and C/C++ for diverse application development across various platforms.",
    webdevStackTitle: "Web Development Stack",
    webdevStackDesc: "Strong command of HTML, CSS, and JavaScript. Experienced with frontend frameworks like React, and robust backend development using Node.js (Express), Flask, and Django.",
    embeddedIotTitle: "Embedded Systems & IoT",
    embeddedIotDesc: "Skilled in programming microcontrollers (Arduino, ESP32, STM32, ESP8266), including sensor/actuator integration (Thermistors, SHT20, MQ-137, Relays, OLEDs, RFID). Expertise in IoT technologies and platforms like Adafruit IO, Blynk, Telegram integration, and web-based device control.",
    controlSystemsTitle: "Control Systems",
    controlSystemsDesc: "Proficient in implementing advanced control algorithms including PID (Proportional, Integral, Derivative), Fuzzy Logic Control, and Linear Quadratic Regulator (LQR). Experience with auto-tuning methods (Ziegler-Nichols, Cohen-Coon) and optimization techniques like genetic algorithms.",
    devopsCloudTitle: "DevOps & Cloud Technologies",
    devopsCloudDesc: "Experienced with Docker for containerization, fundamental Kubernetes concepts, AWS cloud services, and implementing CI/CD pipelines for automated deployments.",
    aiMlTitle: "AI & Machine Learning",
    aiMlDesc: "Capabilities include developing Generative AI applications, performing data analysis (Pandas, Matplotlib, NumPy), and implementing machine learning algorithms (e.g., Naive Bayes, Logistic Regression, Scikit-learn).",
    guiDevTitle: "GUI Application Development",
    guiDevDesc: "Experience in creating user-friendly Graphical User Interface (GUI) applications, including cross-platform tools for enhanced user interaction and productivity.",
    databaseMgmtTitle: "Database Management",
    databaseMgmtDesc: "Proficient in designing and managing databases, including relational databases like SQLite, PostgreSQL, and MySQL for web and application backends.",
    osToolsTitle: "Operating Systems & System Tools",
    osToolsDesc: "Adept with Windows and Linux (Ubuntu/Debian-based systems), including command-line operations, basic system administration, file system management, and version control using Git.",
    experienceTitle: "Professional Experience",
    expFreelancerTitle: "freelancer, none",
    expFreelancerDate: "2018/10 - Present",
    expFreelancerLocation: "Yogyakarta, ID",
    expFreelancer1: "Enhanced production of a Product or Service to exceed goals.",
    expFreelancer2: "Developed effective improvement plans in alignment with goals and specifications.",
    expFreelancer3: "Developed and updated tracking spreadsheets for process monitoring and reporting.",
    expFreelancer4: "Generated reports detailing findings and recommendations.",
    expFreelancer5: "Planned website development, converting mockups into usable web presence with HTML, JavaScript, and CSS coding.",
    expFreelancer6: "Collaborated with marketing, representing web team to establish project goals, projections and milestones.",
    expFreelancer7: "Designed, implemented and monitored web pages, plugins and functionality for continuous improvement.",
    expFreelancer8: "Develop an idea to actual object especially when using a microcontroller.",
    expFreelancer9: "Develop an idea to actual product framework using python, flask and Sqlite for the database.",
    expFreelancer10: "Do what my client ask me to do.",
    expPhotographerTitle: "photographer, lembaran kasih",
    expPhotographerDate: "2020/09 -- 2021/09",
    expPhotographerLocation: "Tuban, ID",
    expPhotographer1: "Photographed high-quality images for various print and digital projects.",
    expPhotographer2: "Digitally edited photos to enhance appearance.",
    expPhotographer3: "Determined and adjusted subject position, props and lighting equipment while selecting camera angles to optimize final product.",
    expPhotographer4: "Edited, toned, captioned and uploaded photographs for publication.",
    expAmbassadorTitle: "Student ambassador, cicil.co.id",
    expAmbassadorDate: "2020/01 -- 2021/04",
    expAmbassadorLocation: "Yogyakarta, ID",
    expAmbassador1: "Smoothed registration processes, offered technical support and organized paperwork.",
    expAmbassador2: "Deal directly with clients regarding administrative issues.",
    expTrainerTitle: "trainer, indobot academy",
    expTrainerDate: "2022/01 -- 2023/01",
    expTrainerLocation: "Yogyakarta, ID",
    expTrainer1: "teaches material about several types of microcontrollers and how to program them.",
    expTrainer2: "teach and introduce material about iot technology.",
    expTrainer3: "provide material support to participants if participants feel they are experiencing difficulties.",
    expTrainer4: "write and make reports on the learning progress of trainees regarding the material being taught and delivered.",
    interestsTitle: "Interests",
    interestPython: "Python",
    interestMcu: "Microcontroller",
    interestUiux: "UI/UX",
    interestAutomation: "Automation",
    interestPhoto: "Photography",
    interestComputer: "Computer",
    interestRobot: "Robotic",
    interestMusic: "Music (dangdut koplo, Jpop, Slow rock)",
    interestFilms: "Films (sci-fi and action)",
    interestAnime: "Anime (Robotic, Isekai, and Magic)",
    interestReading: "Reading (news and novels)",
    interestTravel: "Traveling",
    servicesTitle: "Our Services",
    serviceArduinoTitle: "Arduino Programming and IoT Solutions",
    serviceArduinoDesc: "Specializing in creating and deploying embedded software for Arduino platforms, this service develops IoT solutions from concept to execution and designs user-friendly interfaces for seamless interaction with embedded systems and IoT devices.",
    serviceApiTitle: "API Development and Integration",
    serviceApiDesc: "Robust APIs are crafted to enable smooth communication between software systems and applications. This includes designing secure and efficient endpoints and integrating APIs with existing systems to enhance data exchange and interoperability.",
    serviceAutomationTitle: "Automation Solutions",
    serviceAutomationDesc: "Automation systems are designed and implemented to improve efficiency and reduce manual efforts. Services include developing custom scripts, configuring tools, and integrating automation solutions with existing systems to enhance operational workflows.",
    serviceConsultingTitle: "Consulting Services",
    serviceConsultingDesc: "Expert advice is provided on IoT project feasibility and design, assisting with implementation strategies to achieve project goals, and offering insights and recommendations to support successful outcomes.",
    serviceDataTitle: "Data Analysis and Visualization",
    serviceDataDesc: "Data is analyzed using Python and libraries like Matplotlib and Pandas, compelling visualizations are created with tools such as Plotly, and insights are generated to support strategic decision-making.",
    serviceEmbeddedTitle: "Embedded Systems Development",
    serviceEmbeddedDesc: "Embedded systems are developed and integrated with IoT devices, ensuring efficient and reliable performance for custom applications. Expertise includes microcontroller programming and interfacing.",
    serviceSecurityTitle: "IoT Security Solutions",
    serviceSecurityDesc: "Security measures are implemented to protect IoT devices and networks from potential threats. Services include conducting vulnerability assessments, identifying and addressing security risks, and providing recommendations to enhance the overall security of IoT systems.",
    serviceTrainingTitle: "Microcontroller Training",
    serviceTrainingDesc: "Comprehensive training programs on microcontrollers are designed and delivered for various audiences. Training includes developing engaging curriculum, providing hands-on support, and ensuring effective learning experiences for participants.",
    servicePhotoTitle: "Photography Services",
    servicePhotoDesc: "High-quality photographs are captured for diverse applications, including marketing materials and events. Services include editing and enhancing images, with close collaboration to realize client visions and ensure satisfaction with the final product.",
    serviceProjectTitle: "Project Management",
    serviceProjectDesc: "Projects are managed from initiation to completion, ensuring adherence to timelines and budgets. This involves coordinating with team members and stakeholders, monitoring project progress, and making necessary adjustments for successful delivery.",
    serviceWritingTitle: "Technical Writing and Documentation",
    serviceWritingDesc: "Detailed technical documentation is created for software projects, user guides are developed for hardware projects, and clear communication is ensured to enhance usability for end-users.",
    serviceUiuxTitle: "UI/UX Design",
    serviceUiuxDesc: "Visually appealing and user-friendly interfaces are designed for digital products. Services include conducting user research and testing, and collaborating with developers to ensure seamless integration of design concepts into functional products.",
    serviceWebTitle: "Web Development",
    serviceWebDesc: "Innovative web applications are designed, developed, and implemented to meet specific business needs. This includes creating and deploying responsive frameworks, ensuring seamless user interaction through intuitive and engaging interface design.",
    serviceAiGenTitle: "Generative AI Application Development",
    serviceAiGenDesc: "Intelligent applications are crafted using cutting-edge generative AI models for creative content generation, intelligent chatbots, and advanced automation.",
    serviceMlSolTitle: "Machine Learning Solutions",
    serviceMlSolDesc: "Custom machine learning models are developed and integrated for data analysis, predictive modeling, classification tasks, and more.",
    serviceDevopsCloudTitle2: "DevOps and Cloud Infrastructure",
    serviceDevopsCloudDesc2: "Robust CI/CD pipelines are set up, containerization is implemented with Docker and Kubernetes, and scalable cloud deployments are managed on platforms like AWS.",
    serviceLinuxSysTitle: "Linux System & Driver Solutions",
    serviceLinuxSysDesc: "Expertise is provided in custom Linux system configurations, device driver installation, and optimization for various hardware and specialized environments.",
    serviceBackendWebTitle: "Backend Web Development",
    serviceBackendWebDesc: "Scalable and secure server-side applications are built using modern frameworks like Node.js, Express.js, and Django for powerful web solutions.",
    serviceCustomSoftwareTitle: "Custom Software Development",
    serviceCustomSoftwareDesc: "Bespoke software solutions are crafted in Python, JavaScript, and C/C++ for desktop applications, specialized utilities, and custom programming needs.",
    serviceCliToolTitle: "Terminal/CLI Tool Development",
    serviceCliToolDesc: "Efficient and interactive command-line interface tools are developed for automation, data processing, system management, and productivity enhancements.",
    contactTitle: "Contact",
    contactAddressTitle: "My Address",
    contactAddressValue: "Sleman, Yogyakarta, ID",
    contactProfilesTitle: "Profiles",
    contactSocialTitle: "Social",
    contactDevTitle: "Dev",
    contactEmailTitle: "Email Me",
    contactEmailValue: "azzar.mr.zs@gmail.com",
    contactPhoneTitle: "Call Me",
    contactPhoneValue: "+62 82232529804",
    contactRateTitle: "Rate Calculator",
    contactRateNegotiable: "Rates start at $35/hr (negotiable)",
    contactRateCalculatorTitle: "Hourly Rate & Total Cost Estimator",
    contactRateHoursLabel: "Enter your estimated project hours:",
    contactRateHoursPlaceholder: "e.g. 80",
    contactRateCalculateBtn: "Calculate",
    contactRateResetBtn: "Reset",
    contactRateResultRate: "Estimated Rate:",
    contactRateResultTotal: "Estimated Total:",
    contactRateResultDays: "Estimated Days:",
    contactRatePaymentLabel: "Payment Plan:",
    contactRatePayment2Steps: "2 Payments",
    contactRatePayment3Steps: "3 Payments",
    contactRatePaymentOption1: "40% - 60%",
    contactRatePaymentOption2: "60% - 40%",
    contactRatePaymentOption3: "20% - 30% - 40%",
    contactRatePaymentOption4: "40% - 30% - 20%",
    contactRatePaymentConsultationSeparate: "Pay consultation fee separately",
    contactRateConsultationFeesPaidSeparately: "consultation fees (paid separately)",
    contactRateCurrencyLabel: "Currency:",
    contactRateCurrencyUSD: "USD ($)",
    contactRateCurrencyEUR: "EUR (€)",
    contactRateCurrencyGBP: "GBP (£)",
    contactRateCurrencyIDR: "IDR (Rp)",
    contactRatePaymentBreakdown: "Payment Breakdown:",
    contactRatePaymentOption1: "40% - 60%",
    contactRatePaymentOption2: "60% - 40%",
    contactRatePaymentOption3: "20% - 30% - 40%",
    contactRatePaymentOption4: "40% - 30% - 20%",
    contactRateCurrencyOptionUSD: "USD ($)",
    contactRateCurrencyOptionEUR: "EUR (€)",
    contactRateCurrencyOptionGBP: "GBP (£)",
    contactRateCurrencyOptionIDR: "IDR (Rp)",
    contactRateConsultationIncluded: "consultation fee included",
    contactRatePaymentProjectLabel: "Payment",
    contactRatePaymentConsultationLabel: "Consultation Fee",
    contactRateInvalidHours: "⚠️ Please enter a valid number of hours.",
    overviewTitle: "Project Overview",
    overviewSubtitle: "Exploring the digital frontier, one project at a time",
    totalReposLabel: "Total Repos",
    deployedSitesLabel: "Live Sites",
    languagesUsedLabel: "Languages",
    webBtnText: "🌐 Live Sites",
    repoBtnText: "📂 All Repositories",
    overviewSearchPlaceholder: "Search projects...",
    loadingText: "Loading amazing projects...",
    errorTitle: "Oops! Something went wrong",
    errorDesc: "Unable to fetch repositories. Please check your internet connection and try again.",
    serviceSeoTitle: "SEO Optimization",
    serviceSeoDesc: "Comprehensive SEO services to improve your website's visibility, ranking, and organic traffic through on-page, off-page, and technical optimization."
  },
  id: {
    mainTitle: "azzar budiyanto",
    homeDescriptionText: "Engineer freelance dari Yogyakarta, ID.",
    navHome: "Beranda",
    navAbout: "Tentang",
    navServices: "Layanan",
    navContact: "Kontak",
    navPortfolio: "Portofolio",
    about: "Tentang",
    summary: "Ringkasan",
    summaryText: "Seorang programmer berpengalaman dengan lebih dari 5 tahun pengalaman, mengkhususkan diri dalam IoT, pengembangan web, dan sistem tertanam. Mahir dalam Python, JavaScript (termasuk TypeScript & Node.js), C/C++, dan Arduino, dengan keahlian di berbagai framework web modern (React, Flask, Django) dan platform mikrokontroler (ESP32, STM32). Terampil dalam DevOps, teknologi cloud (AWS), AI/Machine Learning, dan sistem kontrol lanjutan (PID, Fuzzy Logic). Toolkit teknis yang beragam, dikombinasikan dengan kemahiran dalam bahasa Inggris, Indonesia, Jawa, dan Arab, memungkinkan pemecahan masalah yang efektif dan kolaborasi dalam lingkungan yang dinamis.",
    resumeLink: "Resume Umum (PDF)",
    photoPortfolioLink: "Portofolio Foto (PDF)",
    ageLabel: "Usia:",
    daysText: "hari",
    freelanceText: "Freelance:",
    freelanceStatus: "Tersedia",
    skillsTitle: "Keahlian",
    // Skills array for the rotating skills display
    skillsArray: [
      // Core Software Development
      "Pemrograman", "Python", "C++", "C#", "Rust", "TypeScript", "JavaScript",
      "HTML", "CSS", "Git", "Version Control", "Shell Scripting", "Perl",
      "Ruby", "Go", "MATLAB", "Scala",

      // Web Technologies
      "Web", "Full-stack", "Backend", "Frontend", "React.js", "Vue.js",
      "Angular", "Svelte", "Tailwind CSS", "Bootstrap", "Flask", "Django",
      "GraphQL", "REST APIs", "Next.js", "Nuxt.js", "Express.js", "WebSockets",
      "Pengembangan WordPress",

      // Infrastructure & DevOps
      "DevOps", "Docker", "Kubernetes", "Linux", "Unix", "Cloud Computing",
      "AWS", "Azure", "Google Cloud Platform (GCP)", "Firebase", "Layanan Cloud",
      "Terraform", "CI/CD", "Ansible", "Jenkins", "NGINX", "Apache", "Flask",

      // Data & AI
      "Machine Learning", "AI", "Data Science", "Deep Learning", "Analisis Data",
      "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
      "Computer Vision", "Natural Language Processing", "Big Data",
      "Hadoop", "Spark", "Voice Recognition", "Visualisasi Data",
      "Tableau", "Power BI", "Analisis Data MATLAB", "Data Warehousing",

      // Business Systems & ERP
      "ERP", "Odoo", "SAP", "Manajemen Proses Bisnis",
      "Customer Relationship Management (CRM)", "Manajemen Inventori",
      "Akuntansi Keuangan", "Manajemen Sumber Daya Manusia (HRM)",
      "Integrasi Perusahaan", "Otomasi Alur Kerja",

      // IoT & Embedded
      "IoT", "Mikrokontroler", "Sistem Tertanam", "Arduino", "Raspberry Pi",
      "ESP32", "FPGA", "VHDL", "Verilog", "Elektronik", "Perangkat Keras Komputer",
      "Desain PCB", "Integrasi Sensor", "Komunikasi Nirkabel", "Pustaka Kustom",
      "Wokwi", "Tinkercad", "Adafruit IO",

      // Database & Security
      "Manajemen Database", "SQL", "NoSQL", "MongoDB", "PostgreSQL",
      "MySQL", "Redis", "Elasticsearch", "Firebase Realtime Database",
      "Keamanan Siber", "Jaringan", "Desain API", "Penetration Testing",
      "Ethical Hacking", "Kriptografi", "Manajemen Identitas",

      // Engineering & Design
      "Robotika", "Sistem Kontrol", "Desain UI/UX", "Pencetakan 3D", "Desain CAD",
      "SolidWorks", "AutoCAD", "Figma", "Prototyping", "Fotografi",
      "Animasi", "Blender",

      // Project Management & Soft Skills
      "Manajemen Proyek", "Penulisan Teknis", "Metodologi Agile", "SCRUM",
      "Kanban", "Kepemimpinan", "Manajemen Tim", "Pemikiran Kreatif",
      "Pemecahan Masalah", "Pemikiran Kritis", "Negosiasi", "Resolusi Konflik",
      "Manajemen Waktu", "Berbicara di Depan Umum", "Manajemen Stakeholder",

      // Sustainable Tech
      "Keberlanjutan", "Energi Terbarukan", "Panel Surya", "Energi Angin",
      "Manajemen Daya", "Sistem HVAC", "Kendaraan Listrik", "Penyimpanan Baterai",
      "Efisiensi Energi", "Kota Pintar", "Teknologi Bangunan Hijau",

      // Miscellaneous
      "Blockchain", "Cryptocurrency", "Smart Contracts", "Quantum Computing",
      "Pengembangan Game", "React Native",
      "Pengembangan Chatbot", "Pembuatan Konten",
      "SEO", "Optimasi SEO", "Search Engine Optimization", "Pemasaran Digital",
      "Layanan SEO komprehensif untuk meningkatkan visibilitas, peringkat, dan trafik organik situs web Anda melalui optimasi on-page, off-page, dan teknis."
    ],
    progLanguagesTitle: "Bahasa Pemrograman",
    progLanguagesDesc: "Mahir dalam Python, JavaScript, TypeScript, dan C/C++ untuk pengembangan aplikasi yang beragam di berbagai platform.",
    webdevStackTitle: "Stack Pengembangan Web",
    webdevStackDesc: "Menguasai HTML, CSS, dan JavaScript dengan baik. Berpengalaman dengan framework frontend seperti React, dan pengembangan backend yang kuat menggunakan Node.js (Express), Flask, dan Django.",
    embeddedIotTitle: "Sistem Tertanam & IoT",
    embeddedIotDesc: "Terampil dalam pemrograman mikrokontroler (Arduino, ESP32, STM32, ESP8266), termasuk integrasi sensor/aktuator (Thermistors, SHT20, MQ-137, Relay, OLED, RFID). Keahlian dalam teknologi IoT dan platform seperti Adafruit IO, Blynk, integrasi Telegram, dan kontrol perangkat berbasis web.",
    controlSystemsTitle: "Sistem Kontrol",
    controlSystemsDesc: "Mahir dalam mengimplementasikan algoritma kontrol lanjutan termasuk PID (Proportional, Integral, Derivative), Kontrol Logika Fuzzy, dan Linear Quadratic Regulator (LQR). Pengalaman dengan metode auto-tuning (Ziegler-Nichols, Cohen-Coon) dan teknik optimisasi seperti algoritma genetika.",
    devopsCloudTitle: "DevOps & Teknologi Cloud",
    devopsCloudDesc: "Berpengalaman dengan Docker untuk kontainerisasi, konsep fundamental Kubernetes, layanan cloud AWS, dan mengimplementasikan pipeline CI/CD untuk deployment otomatis.",
    aiMlTitle: "AI & Machine Learning",
    aiMlDesc: "Kemampuan meliputi pengembangan aplikasi Generative AI, melakukan analisis data (Pandas, Matplotlib, NumPy), dan mengimplementasikan algoritma machine learning (misalnya Naive Bayes, Logistic Regression, Scikit-learn).",
    guiDevTitle: "Pengembangan Aplikasi GUI",
    guiDevDesc: "Pengalaman dalam membuat aplikasi Graphical User Interface (GUI) yang user-friendly, termasuk tools lintas platform untuk meningkatkan interaksi pengguna dan produktivitas.",
    databaseMgmtTitle: "Manajemen Database",
    databaseMgmtDesc: "Mahir dalam merancang dan mengelola database, termasuk database relasional seperti SQLite, PostgreSQL, dan MySQL untuk backend web dan aplikasi.",
    osToolsTitle: "Sistem Operasi & System Tools",
    osToolsDesc: "Mahir dengan Windows dan Linux (sistem berbasis Ubuntu/Debian), termasuk operasi command-line, administrasi sistem dasar, manajemen file system, dan kontrol versi menggunakan Git.",
    experienceTitle: "Pengalaman Profesional",
    expFreelancerTitle: "freelancer, none",
    expFreelancerDate: "2018/10 - Sekarang",
    expFreelancerLocation: "Yogyakarta, ID",
    expFreelancer1: "Meningkatkan produksi Produk atau Layanan untuk melampaui target.",
    expFreelancer2: "Mengembangkan rencana perbaikan yang efektif sesuai tujuan dan spesifikasi.",
    expFreelancer3: "Membuat dan memperbarui spreadsheet pemantauan proses dan pelaporan.",
    expFreelancer4: "Menyusun laporan temuan dan rekomendasi.",
    expFreelancer5: "Merencanakan pengembangan website, mengubah mockup menjadi web dengan HTML, JavaScript, dan CSS.",
    expFreelancer6: "Berkolaborasi dengan pemasaran, mewakili tim web untuk menetapkan tujuan proyek, proyeksi, dan tonggak.",
    expFreelancer7: "Merancang, mengimplementasikan, dan memantau halaman web, plugin, dan fungsionalitas untuk perbaikan berkelanjutan.",
    expFreelancer8: "Mengembangkan ide menjadi objek nyata terutama dengan mikrokontroler.",
    expFreelancer9: "Mengembangkan ide menjadi kerangka produk menggunakan python, flask, dan Sqlite untuk database.",
    expFreelancer10: "Melakukan apa yang diminta klien.",
    expPhotographerTitle: "fotografer, lembaran kasih",
    expPhotographerDate: "2020/09 -- 2021/09",
    expPhotographerLocation: "Tuban, ID",
    expPhotographer1: "Memotret gambar berkualitas tinggi untuk berbagai proyek cetak dan digital.",
    expPhotographer2: "Mengedit foto secara digital untuk meningkatkan tampilan.",
    expPhotographer3: "Menentukan dan menyesuaikan posisi subjek, properti, dan pencahayaan saat memilih sudut kamera untuk hasil optimal.",
    expPhotographer4: "Mengedit, memberi keterangan, dan mengunggah foto untuk publikasi.",
    expAmbassadorTitle: "Student ambassador, cicil.co.id",
    expAmbassadorDate: "2020/01 -- 2021/04",
    expAmbassadorLocation: "Yogyakarta, ID",
    expAmbassador1: "Memperlancar proses pendaftaran, memberikan dukungan teknis, dan mengatur dokumen.",
    expAmbassador2: "Berurusan langsung dengan klien terkait masalah administrasi.",
    expTrainerTitle: "trainer, indobot academy",
    expTrainerDate: "2022/01 -- 2023/01",
    expTrainerLocation: "Yogyakarta, ID",
    expTrainer1: "Mengajar materi tentang berbagai jenis mikrokontroler dan cara memprogramnya.",
    expTrainer2: "Mengajarkan dan memperkenalkan materi tentang teknologi IoT.",
    expTrainer3: "Memberikan dukungan materi kepada peserta jika mengalami kesulitan.",
    expTrainer4: "Membuat dan menulis laporan perkembangan pembelajaran peserta terkait materi yang diajarkan.",
    interestsTitle: "Minat",
    interestPython: "Python",
    interestMcu: "Mikrokontroler",
    interestUiux: "UI/UX",
    interestAutomation: "Otomasi",
    interestPhoto: "Fotografi",
    interestComputer: "Komputer",
    interestRobot: "Robotik",
    interestMusic: "Musik (dangdut koplo, Jpop, Slow rock)",
    interestFilms: "Film (sci-fi dan aksi)",
    interestAnime: "Anime (Robotik, Isekai, dan Magic)",
    interestReading: "Membaca (berita dan novel)",
    interestTravel: "Bepergian",
    servicesTitle: "Layanan Kami",
    serviceArduinoTitle: "Pemrograman Arduino dan Solusi IoT",
    serviceArduinoDesc: "Mengkhususkan diri dalam membuat dan menerapkan perangkat lunak tertanam untuk platform Arduino, layanan ini mengembangkan solusi IoT dari konsep hingga eksekusi dan merancang antarmuka yang ramah pengguna untuk interaksi yang mulus dengan sistem tertanam dan perangkat IoT.",
    serviceApiTitle: "Pengembangan dan Integrasi API",
    serviceApiDesc: "API yang kuat dibuat untuk memungkinkan komunikasi yang lancar antara sistem perangkat lunak dan aplikasi. Ini termasuk merancang endpoint yang aman dan efisien serta mengintegrasikan API dengan sistem yang ada untuk meningkatkan pertukaran data dan interoperabilitas.",
    serviceAutomationTitle: "Solusi Otomasi",
    serviceAutomationDesc: "Sistem otomasi dirancang dan diimplementasikan untuk meningkatkan efisiensi dan mengurangi upaya manual. Layanan termasuk mengembangkan skrip khusus, mengkonfigurasi tools, dan mengintegrasikan solusi otomasi dengan sistem yang ada untuk meningkatkan alur kerja operasional.",
    serviceConsultingTitle: "Layanan Konsultasi",
    serviceConsultingDesc: "Saran ahli diberikan mengenai kelayakan dan desain proyek IoT, membantu dengan strategi implementasi untuk mencapai tujuan proyek, dan menawarkan wawasan dan rekomendasi untuk mendukung hasil yang sukses.",
    serviceDataTitle: "Analisis Data dan Visualisasi",
    serviceDataDesc: "Data dianalisis menggunakan Python dan pustaka seperti Matplotlib dan Pandas, visualisasi yang menarik dibuat dengan tools seperti Plotly, dan wawasan dihasilkan untuk mendukung pengambilan keputusan strategis.",
    serviceEmbeddedTitle: "Pengembangan Sistem Tertanam",
    serviceEmbeddedDesc: "Sistem tertanam dikembangkan dan diintegrasikan dengan perangkat IoT, memastikan kinerja yang efisien dan andal untuk aplikasi khusus. Keahlian termasuk pemrograman mikrokontroler dan interfacing.",
    serviceSecurityTitle: "Solusi Keamanan IoT",
    serviceSecurityDesc: "Langkah-langkah keamanan diimplementasikan untuk melindungi perangkat dan jaringan IoT dari potensi ancaman. Layanan termasuk melakukan penilaian kerentanan, mengidentifikasi dan mengatasi risiko keamanan, dan memberikan rekomendasi untuk meningkatkan keamanan keseluruhan sistem IoT.",
    serviceTrainingTitle: "Pelatihan Mikrokontroler",
    serviceTrainingDesc: "Program pelatihan komprehensif tentang mikrokontroler dirancang dan disampaikan untuk berbagai audiens. Pelatihan termasuk mengembangkan kurikulum yang menarik, memberikan dukungan langsung, dan memastikan pengalaman belajar yang efektif bagi peserta.",
    servicePhotoTitle: "Layanan Fotografi",
    servicePhotoDesc: "Foto berkualitas tinggi diambil untuk berbagai aplikasi, termasuk materi pemasaran dan acara. Layanan termasuk mengedit dan meningkatkan gambar, dengan kolaborasi erat untuk mewujudkan visi klien dan memastikan kepuasan dengan produk akhir.",
    serviceProjectTitle: "Manajemen Proyek",
    serviceProjectDesc: "Proyek dikelola dari inisiasi hingga penyelesaian, memastikan kepatuhan terhadap jadwal dan anggaran. Ini melibatkan koordinasi dengan anggota tim dan pemangku kepentingan, memantau kemajuan proyek, dan membuat penyesuaian yang diperlukan untuk pengiriman yang sukses.",
    serviceWritingTitle: "Penulisan Teknis dan Dokumentasi",
    serviceWritingDesc: "Dokumentasi teknis yang terperinci dibuat untuk proyek perangkat lunak, panduan pengguna dikembangkan untuk proyek perangkat keras, dan komunikasi yang jelas dipastikan untuk meningkatkan kegunaan bagi pengguna akhir.",
    serviceUiuxTitle: "Desain UI/UX",
    serviceUiuxDesc: "Antarmuka yang menarik secara visual dan ramah pengguna dirancang untuk produk digital. Layanan termasuk melakukan riset dan pengujian pengguna, dan berkolaborasi dengan developer untuk memastikan integrasi konsep desain yang mulus ke dalam produk fungsional.",
    serviceWebTitle: "Pengembangan Web",
    serviceWebDesc: "Aplikasi web yang inovatif dirancang, dikembangkan, dan diimplementasikan untuk memenuhi kebutuhan bisnis yang spesifik. Ini termasuk membuat dan menerapkan framework responsif, memastikan interaksi pengguna yang mulus melalui desain antarmuka yang intuitif dan menarik.",
    serviceAiGenTitle: "Pengembangan Aplikasi AI Generatif",
    serviceAiGenDesc: "Aplikasi cerdas dibuat menggunakan model AI generatif terdepan untuk pembuatan konten kreatif, chatbot cerdas, dan otomasi lanjutan.",
    serviceMlSolTitle: "Solusi Machine Learning",
    serviceMlSolDesc: "Model machine learning khusus dikembangkan dan diintegrasikan untuk analisis data, pemodelan prediktif, tugas klasifikasi, dan banyak lagi.",
    serviceDevopsCloudTitle2: "Infrastruktur DevOps dan Cloud",
    serviceDevopsCloudDesc2: "Pipeline CI/CD yang kuat disiapkan, kontainerisasi diimplementasikan dengan Docker dan Kubernetes, dan deployment cloud yang skalabel dikelola di platform seperti AWS.",
    serviceLinuxSysTitle: "Solusi Sistem & Driver Linux",
    serviceLinuxSysDesc: "Keahlian diberikan dalam konfigurasi sistem Linux khusus, instalasi driver perangkat, dan optimisasi untuk berbagai perangkat keras dan lingkungan khusus.",
    serviceBackendWebTitle: "Pengembangan Web Backend",
    serviceBackendWebDesc: "Aplikasi sisi server yang skalabel dan aman dibangun menggunakan framework modern seperti Node.js, Express.js, dan Django untuk solusi web yang kuat.",
    serviceCustomSoftwareTitle: "Pengembangan Perangkat Lunak Khusus",
    serviceCustomSoftwareDesc: "Solusi perangkat lunak khusus dibuat dalam Python, JavaScript, dan C/C++ untuk aplikasi desktop, utilitas khusus, dan kebutuhan pemrograman khusus.",
    serviceCliToolTitle: "Pengembangan Tool Terminal/CLI",
    serviceCliToolDesc: "Tool antarmuka baris perintah yang efisien dan interaktif dikembangkan untuk otomasi, pemrosesan data, manajemen sistem, dan peningkatan produktivitas.",
    contactTitle: "Kontak",
    contactAddressTitle: "Alamat Saya",
    contactAddressValue: "Sleman, Yogyakarta, ID",
    contactProfilesTitle: "Profil",
    contactSocialTitle: "Sosial",
    contactDevTitle: "Dev",
    contactEmailTitle: "Email Saya",
    contactEmailValue: "azzar.mr.zs@gmail.com",
    contactPhoneTitle: "Telepon Saya",
    contactPhoneValue: "+62 82232529804",
    contactRateTitle: "Kalkulator Tarif",
    contactRateNegotiable: "Tarif mulai dari $35/jam (dapat dinegosiasikan)",
    contactRateCalculatorTitle: "Estimasi Tarif Per Jam & Total Biaya",
    contactRateHoursLabel: "Masukkan estimasi jam proyek Anda:",
    contactRateHoursPlaceholder: "mis. 80",
    contactRateCalculateBtn: "Hitung",
    contactRateResetBtn: "Reset",
    contactRateResultRate: "Estimasi Tarif:",
    contactRateResultTotal: "Estimasi Total:",
    contactRateResultDays: "Estimasi Hari:",
    contactRatePaymentLabel: "Rencana Pembayaran:",
    contactRatePayment2Steps: "2 Pembayaran",
    contactRatePayment3Steps: "3 Pembayaran",
    contactRatePaymentOption1: "40% - 60%",
    contactRatePaymentOption2: "60% - 40%",
    contactRatePaymentOption3: "20% - 30% - 40%",
    contactRatePaymentOption4: "40% - 30% - 20%",
    contactRatePaymentConsultationSeparate: "Bayar biaya konsultasi secara terpisah",
    contactRateConsultationFeesPaidSeparately: "biaya konsultasi (dibayar secara terpisah)",
    contactRateCurrencyLabel: "Mata Uang:",
    contactRateCurrencyUSD: "USD ($)",
    contactRateCurrencyEUR: "EUR (€)",
    contactRateCurrencyGBP: "GBP (£)",
    contactRateCurrencyIDR: "IDR (Rp)",
    contactRatePaymentBreakdown: "Rincian Pembayaran:",
    contactRatePaymentOption1: "40% - 60%",
    contactRatePaymentOption2: "60% - 40%",
    contactRatePaymentOption3: "20% - 30% - 40%",
    contactRatePaymentOption4: "40% - 30% - 20%",
    contactRateCurrencyOptionUSD: "USD ($)",
    contactRateCurrencyOptionEUR: "EUR (€)",
    contactRateCurrencyOptionGBP: "GBP (£)",
    contactRateCurrencyOptionIDR: "IDR (Rp)",
    contactRateConsultationIncluded: "biaya konsultasi termasuk",
    contactRatePaymentProjectLabel: "Pembayaran",
    contactRatePaymentConsultationLabel: "Biaya Konsultasi",
    contactRateInvalidHours: "⚠️ Silakan masukkan jumlah jam yang valid.",
    overviewTitle: "Ringkasan Proyek",
    overviewSubtitle: "Menjelajahi batas digital, satu proyek pada satu waktu",
    totalReposLabel: "Total Repo",
    deployedSitesLabel: "Situs Live",
    languagesUsedLabel: "Bahasa",
    webBtnText: "🌐 Situs Live",
    repoBtnText: "📂 Semua Repository",
    overviewSearchPlaceholder: "Cari proyek...",
    loadingText: "Memuat proyek luar biasa...",
    errorTitle: "Ups! Ada yang salah",
    errorDesc: "Tidak dapat mengambil repository. Silakan periksa koneksi internet Anda dan coba lagi.",
    serviceSeoTitle: "Optimasi SEO",
    serviceSeoDesc: "Layanan SEO komprehensif untuk meningkatkan visibilitas, peringkat, dan trafik organik situs web Anda melalui optimasi on-page, off-page, dan teknis."
  },
  ar: {
    mainTitle: "عزار بودييانتو",
    homeDescriptionText: "مهندس مستقل من يوجياكارتا، إندونيسيا.",
    navHome: "الرئيسية",
    navAbout: "حول",
    navServices: "الخدمات",
    navContact: "اتصل",
    navPortfolio: "المحفظة",
    about: "حول",
    summary: "ملخص",
    summaryText: "مبرمج متمرس مع أكثر من ٥ سنوات من الخبرة، متخصص في إنترنت الأشياء وتطوير الويب والأنظمة المدمجة. ماهر في بايثون وجافا سكريبت (بما في ذلك TypeScript و Node.js) و C/C++ و Arduino، مع خبرة عبر أطر عمل الويب الحديثة (React، Flask، Django) ومنصات الميكروكنترولر (ESP32، STM32). ماهر في DevOps وتقنيات السحابة (AWS) والذكاء الاصطناعي/التعلم الآلي وأنظمة التحكم المتقدمة (PID، Fuzzy Logic). مجموعة أدواتي التقنية المتنوعة، جنبًا إلى جنب مع الطلاقة في الإنجليزية والإندونيسية والجاوية والعربية، تمكن من حل المشاكل بفعالية والتعاون في البيئات الديناميكية.",
    resumeLink: "السيرة الذاتية العامة (PDF)",
    photoPortfolioLink: "ملف الصور الشخصية (PDF)",
    ageLabel: "العمر:",
    daysText: "أيام",
    freelanceText: "العمل الحر:",
    freelanceStatus: "متاح",
    skillsTitle: "المهارات",
    // Skills array for the rotating skills display
    skillsArray: [
      // Core Software Development
      "البرمجة", "Python", "C++", "C#", "Rust", "TypeScript", "JavaScript",
      "HTML", "CSS", "Git", "التحكم في الإصدار", "برمجة Shell", "Perl",
      "Ruby", "Go", "MATLAB", "Scala",

      // Web Technologies
      "الويب", "Full-stack", "Backend", "Frontend", "React.js", "Vue.js",
      "Angular", "Svelte", "Tailwind CSS", "Bootstrap", "Flask", "Django",
      "GraphQL", "REST APIs", "Next.js", "Nuxt.js", "Express.js", "WebSockets",
      "تطوير WordPress",

      // Infrastructure & DevOps
      "DevOps", "Docker", "Kubernetes", "Linux", "Unix", "الحوسبة السحابية",
      "AWS", "Azure", "Google Cloud Platform (GCP)", "Firebase", "الخدمات السحابية",
      "Terraform", "CI/CD", "Ansible", "Jenkins", "NGINX", "Apache", "Flask",

      // Data & AI
      "التعلم الآلي", "الذكاء الاصطناعي", "علم البيانات", "التعلم العميق", "تحليل البيانات",
      "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy",
      "رؤية الحاسوب", "معالجة اللغة الطبيعية", "البيانات الضخمة",
      "Hadoop", "Spark", "التعرف على الصوت", "تصور البيانات",
      "Tableau", "Power BI", "تحليل بيانات MATLAB", "مستودع البيانات",

      // Business Systems & ERP
      "ERP", "Odoo", "SAP", "إدارة العمليات التجارية",
      "إدارة علاقات العملاء (CRM)", "إدارة المخزون",
      "المحاسبة المالية", "إدارة الموارد البشرية (HRM)",
      "التكامل المؤسسي", "أتمتة سير العمل",

      // IoT & Embedded
      "إنترنت الأشياء", "المتحكمات الدقيقة", "الأنظمة المدمجة", "Arduino", "Raspberry Pi",
      "ESP32", "FPGA", "VHDL", "Verilog", "الإلكترونيات", "أجهزة الحاسوب",
      "تصميم PCB", "تكامل المستشعرات", "الاتصال اللاسلكي", "مكتبة مخصصة",
      "Wokwi", "Tinkercad", "Adafruit IO",

      // Database & Security
      "إدارة قواعد البيانات", "SQL", "NoSQL", "MongoDB", "PostgreSQL",
      "MySQL", "Redis", "Elasticsearch", "Firebase Realtime Database",
      "الأمن السيبراني", "الشبكات", "تصميم API", "اختبار الاختراق",
      "القرصنة الأخلاقية", "التشفير", "إدارة الهوية",

      // Engineering & Design
      "الروبوتات", "أنظمة التحكم", "تصميم واجهة المستخدم/تجربة المستخدم", "الطباعة ثلاثية الأبعاد", "تصميم CAD",
      "SolidWorks", "AutoCAD", "Figma", "النمذجة الأولية", "التصوير",
      "الرسوم المتحركة", "Blender",

      // Project Management & Soft Skills
      "إدارة المشاريع", "الكتابة التقنية", "منهجيات Agile", "SCRUM",
      "Kanban", "القيادة", "إدارة الفريق", "التفكير الإبداعي",
      "حل المشاكل", "التفكير النقدي", "التفاوض", "حل النزاعات",
      "إدارة الوقت", "الخطابة العامة", "إدارة أصحاب المصلحة",

      // Sustainable Tech
      "الاستدامة", "الطاقة المتجددة", "الألواح الشمسية", "طاقة الرياح",
      "إدارة الطاقة", "أنظمة HVAC", "المركبات الكهربائية", "تخزين البطاريات",
      "كفاءة الطاقة", "المدن الذكية", "تقنيات البناء الأخضر",

      // Miscellaneous
      "البلوك تشين", "العملة المشفرة", "العقود الذكية", "الحوسبة الكمية",
      "تطوير الألعاب", "React Native",
      "تطوير الشات بوت", "إنشاء المحتوى",
      "SEO", "تحسين محركات البحث", "تحسين SEO", "التسويق الرقمي",
      "خدمات تحسين محركات البحث الشاملة لتحسين ظهور موقعك وترتيبه وحركة المرور العضوية من خلال التحسين الداخلي والخارجي والفني."
    ],
    progLanguagesTitle: "لغات البرمجة",
    progLanguagesDesc: "ماهر في Python و JavaScript و TypeScript و C/C++ لتطوير التطبيقات المتنوعة عبر منصات مختلفة.",
    webdevStackTitle: "مجموعة تطوير الويب",
    webdevStackDesc: "إتقان قوي لـ HTML و CSS و JavaScript. خبرة مع أطر عمل الواجهة الأمامية مثل React، وتطوير خلفي قوي باستخدام Node.js (Express) و Flask و Django.",
    embeddedIotTitle: "الأنظمة المدمجة وإنترنت الأشياء",
    embeddedIotDesc: "ماهر في برمجة المتحكمات الدقيقة (Arduino، ESP32، STM32، ESP8266)، بما في ذلك تكامل المستشعرات/المحركات (Thermistors، SHT20، MQ-137، Relays، OLEDs، RFID). خبرة في تقنيات إنترنت الأشياء والمنصات مثل Adafruit IO و Blynk وتكامل Telegram والتحكم في الأجهزة عبر الويب.",
    controlSystemsTitle: "أنظمة التحكم",
    controlSystemsDesc: "ماهر في تنفيذ خوارزميات التحكم المتقدمة بما في ذلك PID (التناسبي، التكاملي، التفاضلي) والتحكم بالمنطق الضبابي ومنظم التربيع الخطي (LQR). خبرة مع طرق الضبط التلقائي (Ziegler-Nichols، Cohen-Coon) وتقنيات التحسين مثل الخوارزميات الجينية.",
    devopsCloudTitle: "DevOps وتقنيات السحابة",
    devopsCloudDesc: "خبرة مع Docker للحاويات، والمفاهيم الأساسية لـ Kubernetes، وخدمات AWS السحابية، وتنفيذ خطوط CI/CD للنشر الآلي.",
    aiMlTitle: "الذكاء الاصطناعي والتعلم الآلي",
    aiMlDesc: "تشمل القدرات تطوير تطبيقات الذكاء الاصطناعي التوليدي، وأداء تحليل البيانات (Pandas، Matplotlib، NumPy)، وتنفيذ خوارزميات التعلم الآلي (مثل Naive Bayes، Logistic Regression، Scikit-learn).",
    guiDevTitle: "تطوير تطبيقات واجهة المستخدم الرسومية",
    guiDevDesc: "خبرة في إنشاء تطبيقات واجهة المستخدم الرسومية (GUI) سهلة الاستخدام، بما في ذلك أدوات متعددة المنصات لتعزيز تفاعل المستخدم والإنتاجية.",
    databaseMgmtTitle: "إدارة قواعد البيانات",
    databaseMgmtDesc: "ماهر في تصميم وإدارة قواعد البيانات، بما في ذلك قواعد البيانات العلائقية مثل SQLite و PostgreSQL و MySQL للويب والتطبيقات الخلفية.",
    osToolsTitle: "أنظمة التشغيل وأدوات النظام",
    osToolsDesc: "ماهر مع Windows و Linux (أنظمة مبنية على Ubuntu/Debian)، بما في ذلك عمليات سطر الأوامر وإدارة النظام الأساسية وإدارة نظام الملفات والتحكم في الإصدار باستخدام Git.",
    experienceTitle: "الخبرة المهنية",
    expFreelancerTitle: "مستقل، لا يوجد",
    expFreelancerDate: "٢٠١٨/١٠ - الحاضر",
    expFreelancerLocation: "يوجياكارتا، إندونيسيا",
    expFreelancer1: "تحسين إنتاج منتج أو خدمة لتجاوز الأهداف.",
    expFreelancer2: "تطوير خطط تحسين فعالة بما يتماشى مع الأهداف والمواصفات.",
    expFreelancer3: "تطوير وتحديث جداول بيانات التتبع لمراقبة العمليات وإعداد التقارير.",
    expFreelancer4: "إنتاج التقارير التي تفصل النتائج والتوصيات.",
    expFreelancer5: "تخطيط تطوير المواقع الإلكترونية، وتحويل النماذج الأولية إلى وجود ويب قابل للاستخدام مع برمجة HTML و JavaScript و CSS.",
    expFreelancer6: "التعاون مع التسويق، وتمثيل فريق الويب لتحديد أهداف المشروع والتوقعات والمعالم.",
    expFreelancer7: "تصميم وتنفيذ ومراقبة صفحات الويب والمكونات الإضافية والوظائف للتحسين المستمر.",
    expFreelancer8: "تطوير الفكرة إلى كائن فعلي خاصة عند استخدام الميكروكنترولر.",
    expFreelancer9: "تطوير الفكرة إلى إطار عمل منتج فعلي باستخدام python و flask و Sqlite لقاعدة البيانات.",
    expFreelancer10: "فعل ما يطلبه عميلي.",
    expPhotographerTitle: "مصور، لمبران كاسيه",
    expPhotographerDate: "٢٠٢٠/٠٩ -- ٢٠٢١/٠٩",
    expPhotographerLocation: "توبان، إندونيسيا",
    expPhotographer1: "تصوير صور عالية الجودة لمشاريع طباعة ورقمية مختلفة.",
    expPhotographer2: "تحرير الصور رقميًا لتحسين المظهر.",
    expPhotographer3: "تحديد وضبط موضع الموضوع والدعائم ومعدات الإضاءة مع اختيار زوايا الكاميرا لتحسين المنتج النهائي.",
    expPhotographer4: "تحرير ونبرة وتسمية وتحميل الصور للنشر.",
    expAmbassadorTitle: "سفير طلابي، cicil.co.id",
    expAmbassadorDate: "٢٠٢٠/٠١ -- ٢٠٢١/٠٤",
    expAmbassadorLocation: "يوجياكارتا، إندونيسيا",
    expAmbassador1: "تسهيل عمليات التسجيل وتقديم الدعم التقني وتنظيم الأوراق.",
    expAmbassador2: "التعامل مباشرة مع العملاء بشأن القضايا الإدارية.",
    expTrainerTitle: "مدرب، أكاديمية إندوبوت",
    expTrainerDate: "٢٠٢٢/٠١ -- ٢٠٢٣/٠١",
    expTrainerLocation: "يوجياكارتا، إندونيسيا",
    expTrainer1: "تدريس مواد حول عدة أنواع من الميكروكنترولر وكيفية برمجتها.",
    expTrainer2: "تدريس وتقديم مواد حول تقنية إنترنت الأشياء.",
    expTrainer3: "تقديم دعم مادي للمشاركين إذا كانوا يواجهون صعوبات.",
    expTrainer4: "كتابة وإعداد تقارير حول تقدم تعلم المتدربين بشأن المواد التي يتم تدريسها وتقديمها.",
    interestsTitle: "الاهتمامات",
    interestPython: "بايثون",
    interestMcu: "الميكروكنترولر",
    interestUiux: "واجهة المستخدم/تجربة المستخدم",
    interestAutomation: "الأتمتة",
    interestPhoto: "التصوير",
    interestComputer: "الحاسوب",
    interestRobot: "الروبوتات",
    interestMusic: "الموسيقى (dangdut koplo, Jpop, الروك البطيء)",
    interestFilms: "الأفلام (الخيال العلمي والحركة)",
    interestAnime: "الأنمي (الروبوتات، Isekai، والسحر)",
    interestReading: "القراءة (الأخبار والروايات)",
    interestTravel: "السفر",
    servicesTitle: "خدماتنا",
    serviceArduinoTitle: "برمجة Arduino وحلول إنترنت الأشياء",
    serviceArduinoDesc: "متخصص في إنشاء ونشر البرمجيات المدمجة لمنصات Arduino، تطور هذه الخدمة حلول إنترنت الأشياء من المفهوم إلى التنفيذ وتصمم واجهات سهلة الاستخدام للتفاعل السلس مع الأنظمة المدمجة وأجهزة إنترنت الأشياء.",
    serviceApiTitle: "تطوير وتكامل واجهة برمجة التطبيقات",
    serviceApiDesc: "يتم إنشاء واجهات برمجة تطبيقات قوية لتمكين التواصل السلس بين أنظمة البرمجيات والتطبيقات. يشمل هذا تصميم نقاط نهاية آمنة وفعالة وتكامل واجهات برمجة التطبيقات مع الأنظمة الموجودة لتعزيز تبادل البيانات والتشغيل البيني.",
    serviceAutomationTitle: "حلول الأتمتة",
    serviceAutomationDesc: "يتم تصميم وتنفيذ أنظمة الأتمتة لتحسين الكفاءة وتقليل الجهود اليدوية. تشمل الخدمات تطوير نصوص مخصصة وتكوين الأدوات وتكامل حلول الأتمتة مع الأنظمة الموجودة لتعزيز سير العمل التشغيلي.",
    serviceConsultingTitle: "خدمات الاستشارة",
    serviceConsultingDesc: "يتم تقديم مشورة خبراء حول جدوى مشاريع إنترنت الأشياء وتصميمها، والمساعدة في استراتيجيات التنفيذ لتحقيق أهداف المشروع، وتقديم رؤى وتوصيات لدعم النتائج الناجحة.",
    serviceDataTitle: "تحليل البيانات والتصور",
    serviceDataDesc: "يتم تحليل البيانات باستخدام Python ومكتبات مثل Matplotlib و Pandas، وإنشاء تصورات مقنعة بأدوات مثل Plotly، وتوليد رؤى لدعم اتخاذ القرارات الاستراتيجية.",
    serviceEmbeddedTitle: "تطوير الأنظمة المدمجة",
    serviceEmbeddedDesc: "يتم تطوير الأنظمة المدمجة وتكاملها مع أجهزة إنترنت الأشياء، مما يضمن أداءً فعالًا وموثوقًا للتطبيقات المخصصة. تشمل الخبرة برمجة الميكروكنترولر والواجهات.",
    serviceSecurityTitle: "حلول أمان إنترنت الأشياء",
    serviceSecurityDesc: "يتم تنفيذ تدابير الأمان لحماية أجهزة وشبكات إنترنت الأشياء من التهديدات المحتملة. تشمل الخدمات إجراء تقييمات الثغرات وتحديد ومعالجة مخاطر الأمان وتقديم توصيات لتعزيز الأمان العام لأنظمة إنترنت الأشياء.",
    serviceTrainingTitle: "تدريب الميكروكنترولر",
    serviceTrainingDesc: "يتم تصميم وتقديم برامج تدريبية شاملة حول الميكروكنترولر لجماهير مختلفة. يشمل التدريب تطوير منهج جذاب وتقديم دعم عملي وضمان تجارب تعلم فعالة للمشاركين.",
    servicePhotoTitle: "خدمات التصوير",
    servicePhotoDesc: "يتم التقاط صور عالية الجودة لتطبيقات متنوعة، بما في ذلك مواد التسويق والأحداث. تشمل الخدمات تحرير وتحسين الصور، مع تعاون وثيق لتحقيق رؤى العملاء وضمان الرضا عن المنتج النهائي.",
    serviceProjectTitle: "إدارة المشاريع",
    serviceProjectDesc: "يتم إدارة المشاريع من البداية إلى الاكتمال، مما يضمن الالتزام بالجداول الزمنية والميزانيات. يتضمن هذا التنسيق مع أعضاء الفريق وأصحاب المصلحة ومراقبة تقدم المشروع وإجراء التعديلات اللازمة للتسليم الناجح.",
    serviceWritingTitle: "الكتابة التقنية والتوثيق",
    serviceWritingDesc: "يتم إنشاء توثيق تقني مفصل لمشاريع البرمجيات، وتطوير أدلة المستخدم لمشاريع الأجهزة، وضمان التواصل الواضح لتعزيز قابلية الاستخدام للمستخدمين النهائيين.",
    serviceUiuxTitle: "تصميم واجهة المستخدم/تجربة المستخدم",
    serviceUiuxDesc: "يتم تصميم واجهات جذابة بصريًا وسهلة الاستخدام للمنتجات الرقمية. تشمل الخدمات إجراء بحوث واختبارات المستخدمين والتعاون مع المطورين لضمان التكامل السلس لمفاهيم التصميم في المنتجات الوظيفية.",
    serviceWebTitle: "تطوير الويب",
    serviceWebDesc: "يتم تصميم وتطوير وتنفيذ تطبيقات ويب مبتكرة لتلبية احتياجات الأعمال المحددة. يشمل هذا إنشاء ونشر أطر عمل متجاوبة، وضمان تفاعل المستخدم السلس من خلال تصميم واجهة بديهي وجذاب.",
    serviceAiGenTitle: "تطوير تطبيقات الذكاء الاصطناعي التوليدي",
    serviceAiGenDesc: "يتم إنشاء تطبيقات ذكية باستخدام نماذج الذكاء الاصطناعي التوليدي المتطورة لإنتاج المحتوى الإبداعي وروبوتات الدردشة الذكية والأتمتة المتقدمة.",
    serviceMlSolTitle: "حلول التعلم الآلي",
    serviceMlSolDesc: "يتم تطوير وتكامل نماذج التعلم الآلي المخصصة لتحليل البيانات والنمذجة التنبؤية ومهام التصنيف والمزيد.",
    serviceDevopsCloudTitle2: "بنية DevOps والسحابة",
    serviceDevopsCloudDesc2: "يتم إعداد خطوط CI/CD قوية، وتنفيذ الحاويات مع Docker و Kubernetes، وإدارة عمليات النشر السحابية القابلة للتوسع على منصات مثل AWS.",
    serviceLinuxSysTitle: "حلول نظام Linux والسائقين",
    serviceLinuxSysDesc: "يتم تقديم الخبرة في تكوينات نظام Linux المخصصة وتثبيت سائقي الأجهزة والتحسين لأجهزة وبيئات متخصصة مختلفة.",
    serviceBackendWebTitle: "تطوير الويب الخلفي",
    serviceBackendWebDesc: "يتم بناء تطبيقات جانب الخادم قابلة للتوسع وآمنة باستخدام أطر عمل حديثة مثل Node.js و Express.js و Django لحلول ويب قوية.",
    serviceCustomSoftwareTitle: "تطوير البرمجيات المخصصة",
    serviceCustomSoftwareDesc: "يتم إنشاء حلول برمجية مخصصة في Python و JavaScript و C/C++ لتطبيقات سطح المكتب والمرافق المتخصصة واحتياجات البرمجة المخصصة.",
    serviceCliToolTitle: "تطوير أدوات Terminal/CLI",
    serviceCliToolDesc: "يتم تطوير أدوات واجهة سطر الأوامر الفعالة والتفاعلية للأتمتة ومعالجة البيانات وإدارة النظام وتحسينات الإنتاجية.",
    contactTitle: "اتصال",
    contactAddressTitle: "عنواني",
    contactAddressValue: "سليمان، يوجياكارتا، إندونيسيا",
    contactProfilesTitle: "الملفات الشخصية",
    contactSocialTitle: "اجتماعي",
    contactDevTitle: "تطوير",
    contactEmailTitle: "راسلني",
    contactEmailValue: "azzar.mr.zs@gmail.com",
    contactPhoneTitle: "اتصل بي",
    contactPhoneValue: "+٦٢ ٨٢٢٣٢٥٢٩٨٠٤",
    overviewTitle: "نظرة عامة على المشروع",
    overviewSubtitle: "استكشاف الحدود الرقمية، مشروع واحد في كل مرة",
    totalReposLabel: "إجمالي المستودعات",
    deployedSitesLabel: "المواقع المباشرة",
    languagesUsedLabel: "اللغات",
    webBtnText: "🌐 المواقع المباشرة",
    repoBtnText: "📂 جميع المستودعات",
    overviewSearchPlaceholder: "البحث في المشاريع...",
    loadingText: "تحميل مشاريع مذهلة...",
    errorTitle: "عذرًا! حدث خطأ ما",
    errorDesc: "تعذر جلب المستودعات. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.",
    serviceSeoTitle: "تحسين محركات البحث (SEO)",
    serviceSeoDesc: "خدمات تحسين محركات البحث الشاملة لتحسين ظهور موقعك وترتيبه وحركة المرور العضوية من خلال التحسين الداخلي والخارجي والفني.",
    contactRateTitle: "حاسبة التسعير",
    contactRateNegotiable: "الأسعار تبدأ من 35 دولار/ساعة (قابل للتفاوض)",
    contactRateCalculatorTitle: "مقدر التسعير بالساعة وإجمالي التكلفة",
    contactRateHoursLabel: "أدخل تقدير ساعات مشروعك:",
    contactRateHoursPlaceholder: "مثال: 80",
    contactRateCalculateBtn: "احسب",
    contactRateResetBtn: "إعادة تعيين",
    contactRateResultRate: "السعر المقدر:",
    contactRateResultTotal: "المجموع المقدر:",
    contactRateResultDays: "الأيام المقدرة:",
    contactRatePaymentLabel: "خطة الدفع:",
    contactRatePayment2Steps: "دفعتان",
    contactRatePayment3Steps: "ثلاث دفعات",
    contactRatePaymentOption1: "40% - 60%",
    contactRatePaymentOption2: "60% - 40%",
    contactRatePaymentOption3: "20% - 30% - 40%",
    contactRatePaymentOption4: "40% - 30% - 20%",
    contactRatePaymentConsultationSeparate: "دفع رسوم الاستشارة بشكل منفصل",
    contactRateConsultationFeesPaidSeparately: "رسوم الاستشارة (تُدفع بشكل منفصل)",
    contactRateCurrencyLabel: "العملة:",
    contactRateCurrencyUSD: "الدولار الأمريكي ($)",
    contactRateCurrencyEUR: "اليورو (€)",
    contactRateCurrencyGBP: "الجنيه الإسترليني (£)",
    contactRateCurrencyIDR: "الروبية الإندونيسية (Rp)",
    contactRatePaymentBreakdown: "تفصيل الدفعات:",
    contactRatePaymentOption1: "40% - 60%",
    contactRatePaymentOption2: "60% - 40%",
    contactRatePaymentOption3: "20% - 30% - 40%",
    contactRatePaymentOption4: "40% - 30% - 20%",
    contactRateCurrencyOptionUSD: "الدولار الأمريكي ($)",
    contactRateCurrencyOptionEUR: "اليورو (€)",
    contactRateCurrencyOptionGBP: "الجنيه الإسترليني (£)",
    contactRateCurrencyOptionIDR: "الروبية الإندونيسية (Rp)",
    contactRateConsultationIncluded: "رسوم الاستشارة مشمولة",
    contactRatePaymentProjectLabel: "الدفعة",
    contactRatePaymentConsultationLabel: "رسوم الاستشارة",
    contactRateInvalidHours: "⚠️ يرجى إدخال عدد ساعات صحيح.",
  },
};
// Utility function to convert Western Arabic numerals to Arabic-Indic numerals
function convertToArabicNumerals(text) {
  if (typeof text !== 'string') {
    text = String(text);
  }
  
  const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return text.replace(/[0-9]/g, function(digit) {
    return arabicNumerals[parseInt(digit)];
  });
}

// Utility function to convert Arabic numerals back to Western numerals
function convertFromArabicNumerals(text) {
  if (typeof text !== 'string') {
    text = String(text);
  }
  
  const arabicToWestern = {
    '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
    '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'
  };
  
  return text.replace(/[٠-٩]/g, function(digit) {
    return arabicToWestern[digit];
  });
}

// Utility function to get the raw number value (Western numerals)
function getRawNumber(text) {
  if (typeof text !== 'string') {
    text = String(text);
  }
  // Convert any Arabic numerals to Western first
  return convertFromArabicNumerals(text);
}

// Utility function to format numbers based on language
function formatNumber(number, lang) {
  // Always start with raw Western numerals
  const rawNumber = getRawNumber(String(number));
  
  if (lang === 'ar') {
    return convertToArabicNumerals(rawNumber);
  }
  return rawNumber;
}

// Main translation update function
function updateLanguage(lang) {
  const map = {
    mainTitle: 'main-title',
    about: 'about-title',
    summary: 'summary-title',
    summaryText: 'summary-text',
    daysText: 'days-text',
    freelanceText: 'freelance-text',
    freelanceStatus: 'freelance-status',
    skillsTitle: 'skills-title',
    progLanguagesTitle: 'prog-languages-title',
    progLanguagesDesc: 'prog-languages-desc',
    webdevStackTitle: 'webdev-stack-title',
    webdevStackDesc: 'webdev-stack-desc',
    embeddedIotTitle: 'embedded-iot-title',
    embeddedIotDesc: 'embedded-iot-desc',
    controlSystemsTitle: 'control-systems-title',
    controlSystemsDesc: 'control-systems-desc',
    devopsCloudTitle: 'devops-cloud-title',
    devopsCloudDesc: 'devops-cloud-desc',
    aiMlTitle: 'ai-ml-title',
    aiMlDesc: 'ai-ml-desc',
    guiDevTitle: 'gui-dev-title',
    guiDevDesc: 'gui-dev-desc',
    databaseMgmtTitle: 'database-mgmt-title',
    databaseMgmtDesc: 'database-mgmt-desc',
    osToolsTitle: 'os-tools-title',
    osToolsDesc: 'os-tools-desc',
    experienceTitle: 'experience-title',
    expFreelancerTitle: 'exp-freelancer-title',
    expFreelancerDate: 'exp-freelancer-date',
    expFreelancerLocation: 'exp-freelancer-location',
    expFreelancer1: 'exp-freelancer-1',
    expFreelancer2: 'exp-freelancer-2',
    expFreelancer3: 'exp-freelancer-3',
    expFreelancer4: 'exp-freelancer-4',
    expFreelancer5: 'exp-freelancer-5',
    expFreelancer6: 'exp-freelancer-6',
    expFreelancer7: 'exp-freelancer-7',
    expFreelancer8: 'exp-freelancer-8',
    expFreelancer9: 'exp-freelancer-9',
    expFreelancer10: 'exp-freelancer-10',
    expPhotographerTitle: 'exp-photographer-title',
    expPhotographerDate: 'exp-photographer-date',
    expPhotographerLocation: 'exp-photographer-location',
    expPhotographer1: 'exp-photographer-1',
    expPhotographer2: 'exp-photographer-2',
    expPhotographer3: 'exp-photographer-3',
    expPhotographer4: 'exp-photographer-4',
    expAmbassadorTitle: 'exp-ambassador-title',
    expAmbassadorDate: 'exp-ambassador-date',
    expAmbassadorLocation: 'exp-ambassador-location',
    expAmbassador1: 'exp-ambassador-1',
    expAmbassador2: 'exp-ambassador-2',
    expTrainerTitle: 'exp-trainer-title',
    expTrainerDate: 'exp-trainer-date',
    expTrainerLocation: 'exp-trainer-location',
    expTrainer1: 'exp-trainer-1',
    expTrainer2: 'exp-trainer-2',
    expTrainer3: 'exp-trainer-3',
    expTrainer4: 'exp-trainer-4',
    interestsTitle: 'interests-title',
    interestPython: 'interest-python',
    interestMcu: 'interest-mcu',
    interestUiux: 'interest-uiux',
    interestAutomation: 'interest-automation',
    interestPhoto: 'interest-photo',
    interestComputer: 'interest-computer',
    interestRobot: 'interest-robot',
    interestMusic: 'interest-music',
    interestFilms: 'interest-films',
    interestAnime: 'interest-anime',
    interestReading: 'interest-reading',
    interestTravel: 'interest-travel',
    servicesTitle: 'services-title',
    serviceArduinoTitle: 'service-arduino-title',
    serviceArduinoDesc: 'service-arduino-desc',
    serviceApiTitle: 'service-api-title',
    serviceApiDesc: 'service-api-desc',
    serviceAutomationTitle: 'service-automation-title',
    serviceAutomationDesc: 'service-automation-desc',
    serviceConsultingTitle: 'service-consulting-title',
    serviceConsultingDesc: 'service-consulting-desc',
    serviceDataTitle: 'service-data-title',
    serviceDataDesc: 'service-data-desc',
    serviceEmbeddedTitle: 'service-embedded-title',
    serviceEmbeddedDesc: 'service-embedded-desc',
    serviceSecurityTitle: 'service-security-title',
    serviceSecurityDesc: 'service-security-desc',
    serviceTrainingTitle: 'service-training-title',
    serviceTrainingDesc: 'service-training-desc',
    servicePhotoTitle: 'service-photo-title',
    servicePhotoDesc: 'service-photo-desc',
    serviceProjectTitle: 'service-project-title',
    serviceProjectDesc: 'service-project-desc',
    serviceWritingTitle: 'service-writing-title',
    serviceWritingDesc: 'service-writing-desc',
    serviceUiuxTitle: 'service-uiux-title',
    serviceUiuxDesc: 'service-uiux-desc',
    serviceWebTitle: 'service-web-title',
    serviceWebDesc: 'service-web-desc',
    serviceAiGenTitle: 'service-ai-gen-title',
    serviceAiGenDesc: 'service-ai-gen-desc',
    serviceMlSolTitle: 'service-ml-sol-title',
    serviceMlSolDesc: 'service-ml-sol-desc',
    serviceDevopsCloudTitle2: 'service-devops-cloud-title2',
    serviceDevopsCloudDesc2: 'service-devops-cloud-desc2',
    serviceLinuxSysTitle: 'service-linux-sys-title',
    serviceLinuxSysDesc: 'service-linux-sys-desc',
    serviceBackendWebTitle: 'service-backend-web-title',
    serviceBackendWebDesc: 'service-backend-web-desc',
    serviceCustomSoftwareTitle: 'service-custom-software-title',
    serviceCustomSoftwareDesc: 'service-custom-software-desc',
    serviceCliToolTitle: 'service-cli-tool-title',
    serviceCliToolDesc: 'service-cli-tool-desc',
    contactTitle: 'contact-title',
    contactAddressTitle: 'contact-address-title',
    contactAddressValue: 'contact-address-value',
    contactProfilesTitle: 'contact-profiles-title',
    contactSocialTitle: 'contact-social-title',
    contactDevTitle: 'contact-dev-title',
    contactEmailTitle: 'contact-email-title',
    contactEmailValue: 'contact-email-value',
    contactPhoneTitle: 'contact-phone-title',
    contactPhoneValue: 'contact-phone-value',
    contactRateTitle: 'contact-rate-title',
    contactRateNegotiable: 'contact-rate-negotiable',
    contactRateCalculatorTitle: 'contact-rate-calculator-title',
    contactRateHoursLabel: 'contact-rate-hours-label',
    contactRateHoursPlaceholder: 'hoursInput',
    contactRateCalculateBtn: 'contact-rate-calculate-btn',
    contactRateResetBtn: 'contact-rate-reset-btn',
    contactRatePaymentLabel: 'contact-rate-payment-label',
    contactRateCurrencyLabel: 'contact-rate-currency-label',
    contactRatePaymentBreakdown: 'contact-rate-payment-breakdown',
    contactRatePaymentOption1: 'payment-option-1',
    contactRatePaymentOption2: 'payment-option-2',
    contactRatePaymentOption3: 'payment-option-3',
    contactRatePaymentOption4: 'payment-option-4',
    contactRateCurrencyOptionUSD: 'currency-option-usd',
    contactRateCurrencyOptionEUR: 'currency-option-eur',
    contactRateCurrencyOptionGBP: 'currency-option-gbp',
    contactRateCurrencyOptionIDR: 'currency-option-idr',
    contactRatePaymentConsultationSeparate: 'consultation-separate-checkbox',
    overviewTitle: 'overview-title',
    overviewSubtitle: 'overview-subtitle',
    totalReposLabel: 'total-repos-label',
    deployedSitesLabel: 'deployed-sites-label',
    languagesUsedLabel: 'languages-used-label',
    webBtnText: 'web-btn-text',
    repoBtnText: 'repo-btn-text',
    overviewSearchPlaceholder: 'search-input',
    loadingText: 'loading-text',
    errorTitle: 'error-title',
    errorDesc: 'error-desc',
    serviceSeoTitle: 'service-seo-title',
    serviceSeoDesc: 'service-seo-desc'
  };
  
  // Handle regular translations
  for (const key in map) {
    const el = document.getElementById(map[key]);
    if (el && translations[lang] && translations[lang][key]) {
      if (el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'P' || el.tagName === 'LI') {
        // Preserve icons if present
        const icon = el.querySelector('i');
        if (icon) {
          el.innerHTML = icon.outerHTML + ' ' + translations[lang][key];
        } else {
          el.textContent = translations[lang][key];
        }
      } else if (el.tagName === 'A') {
        el.textContent = translations[lang][key];
      } else if (el.id === 'search-input' || el.id === 'hoursInput') {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  }
  
  // Special handling for download links - preserve the <a> tags but translate the text
  const resumeLink = document.querySelector('#resume-link a');
  const photoPortfolioLink = document.querySelector('#photo-portfolio-link a');
  const resumeLinkParent = document.getElementById('resume-link');
  const photoPortfolioLinkParent = document.getElementById('photo-portfolio-link');
  
  if (resumeLink && translations[lang] && translations[lang].resumeLink) {
    resumeLink.textContent = translations[lang].resumeLink;
    // Set proper direction for RTL languages
    if (lang === 'ar') {
      if (resumeLinkParent) {
        resumeLinkParent.style.direction = 'ltr';
        resumeLinkParent.style.textAlign = 'right';
      }
      resumeLink.style.direction = 'ltr';
    } else {
      if (resumeLinkParent) {
        resumeLinkParent.style.direction = 'ltr';
        resumeLinkParent.style.textAlign = 'left';
      }
      resumeLink.style.direction = 'ltr';
    }
  }
  
  if (photoPortfolioLink && translations[lang] && translations[lang].photoPortfolioLink) {
    photoPortfolioLink.textContent = translations[lang].photoPortfolioLink;
    // Set proper direction for RTL languages
    if (lang === 'ar') {
      if (photoPortfolioLinkParent) {
        photoPortfolioLinkParent.style.direction = 'ltr';
        photoPortfolioLinkParent.style.textAlign = 'right';
      }
      photoPortfolioLink.style.direction = 'ltr';
    } else {
      if (photoPortfolioLinkParent) {
        photoPortfolioLinkParent.style.direction = 'ltr';
        photoPortfolioLinkParent.style.textAlign = 'left';
      }
      photoPortfolioLink.style.direction = 'ltr';
    }
  }
  
  // Special handling for age label - preserve the age value and format numbers for Arabic
  const ageLabel = document.getElementById('age-label');
  const ageInDays = document.getElementById('age-in-days');
  if (ageLabel && translations[lang] && translations[lang].ageLabel && ageInDays) {
    const icon = ageLabel.querySelector('i');
    
    // Get or calculate the raw age value (always in Western numerals)
    let rawAgeValue = ageInDays.getAttribute('data-raw-age');
    if (!rawAgeValue) {
      // First time or need to recalculate
      const birthDate = new Date('1999-10-09');
      const today = new Date();
      rawAgeValue = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
      ageInDays.setAttribute('data-raw-age', rawAgeValue);
    }
    
    const formattedAge = formatNumber(rawAgeValue, lang);
    const daysText = translations[lang].daysText || 'days';
    
    if (icon) {
      // Better handling for RTL languages with proper text order
      if (lang === 'ar') {
        // For Arabic: Icon + "العمر:" + number + "أيام" 
        ageLabel.innerHTML = icon.outerHTML + ' <strong>' + translations[lang].ageLabel + '</strong> <span id="age-in-days" data-raw-age="' + rawAgeValue + '">' + formattedAge + '</span> ' + daysText;
        ageLabel.style.direction = 'ltr'; // Keep LTR to prevent string reversal
        ageLabel.style.textAlign = 'right'; // But align text to the right
      } else {
        ageLabel.innerHTML = icon.outerHTML + ' <strong>' + translations[lang].ageLabel + '</strong> <span id="age-in-days" data-raw-age="' + rawAgeValue + '">' + formattedAge + '</span>‎ ' + daysText;
        ageLabel.style.direction = 'ltr';
        ageLabel.style.textAlign = 'left';
      }
    }
  }
  
  // Special handling for freelance label to ensure proper Arabic rendering
  const freelanceLabel = document.getElementById('freelance-label');
  if (freelanceLabel) {
    if (lang === 'ar') {
      freelanceLabel.style.direction = 'ltr'; // Keep LTR to prevent reversal
      freelanceLabel.style.textAlign = 'right'; // But align to right
    } else {
      freelanceLabel.style.direction = 'ltr';
      freelanceLabel.style.textAlign = 'left';
    }
  }
  
  // Additional handling for the service-card containing resume and portfolio links
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    if (lang === 'ar') {
      // For Arabic, keep LTR direction but align text to right
      card.style.direction = 'ltr';
      card.style.textAlign = 'right';
    } else {
      card.style.direction = 'ltr';
      card.style.textAlign = 'left';
    }
  });
  
  // Update numbers in overview stats if they exist
  updateOverviewNumbers(lang);
  
  // Update skills rotator language if available
  if (typeof window !== 'undefined' && window.skillsRotator) {
    window.skillsRotator.updateLanguage(lang);
  }
}

// Function to update numbers in overview stats
function updateOverviewNumbers(lang) {
  const totalRepos = document.getElementById('total-repos');
  const deployedSites = document.getElementById('deployed-sites');
  const languagesUsed = document.getElementById('languages-used');
  
  if (totalRepos && totalRepos.textContent) {
    const originalValue = totalRepos.getAttribute('data-original') || getRawNumber(totalRepos.textContent);
    totalRepos.setAttribute('data-original', originalValue);
    totalRepos.textContent = formatNumber(originalValue, lang);
  }
  
  if (deployedSites && deployedSites.textContent) {
    const originalValue = deployedSites.getAttribute('data-original') || getRawNumber(deployedSites.textContent);
    deployedSites.setAttribute('data-original', originalValue);
    deployedSites.textContent = formatNumber(originalValue, lang);
  }
  
  if (languagesUsed && languagesUsed.textContent) {
    const originalValue = languagesUsed.getAttribute('data-original') || getRawNumber(languagesUsed.textContent);
    languagesUsed.setAttribute('data-original', originalValue);
    languagesUsed.textContent = formatNumber(originalValue, lang);
  }
}

// Language indicator update function
function updateLanguageIndicator(lang) {
  const languageToggle = document.getElementById('language-toggle');
  const languageLabel = document.getElementById('language-label');

  if (languageToggle) {
    // Remove all language classes
    languageToggle.classList.remove('id-lang', 'ar-lang');

    // Add appropriate class based on language
    if (lang === 'id') {
      languageToggle.classList.add('id-lang');
      if (languageLabel) languageLabel.textContent = 'ID';
    } else if (lang === 'ar') {
      languageToggle.classList.add('ar-lang');
      if (languageLabel) languageLabel.textContent = 'عر';
      // Set RTL direction for Arabic
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
      // Add Arabic-specific styling class
      document.body.classList.add('arabic-lang');
      document.body.classList.remove('ltr-lang');
    } else {
      // Reset to LTR for English
      if (languageLabel) languageLabel.textContent = 'EN';
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', lang);
      // Add LTR-specific styling class
      document.body.classList.add('ltr-lang');
      document.body.classList.remove('arabic-lang');
    }
  }

  // Update navigation labels
  updateNavigationLabels(lang);
}

// Function to update navigation labels based on selected language
function updateNavigationLabels(lang) {
  const navLabels = {
    'home': 'navHome',
    'about': 'navAbout',
    'services': 'navServices',
    'contact': 'navContact',
    'overview': 'navPortfolio'
  };

  // Update each navigation label
  Object.keys(navLabels).forEach(section => {
    const labelElement = document.querySelector(`a[href="#${section}"] .nav-label`);
    if (labelElement && translations[lang] && translations[lang][navLabels[section]]) {
      labelElement.textContent = translations[lang][navLabels[section]];
    }
  });
}

// Function to update project numbers in overview section
function updateProjectNumbers(lang) {
  // Update all numbers in project cards
  const projectCards = document.querySelectorAll('.service-card');
  projectCards.forEach(card => {
    // Update stars, forks, and dates
    const numberElements = card.querySelectorAll('li');
    numberElements.forEach(li => {
      if (li.innerHTML.includes('Stars:') || li.innerHTML.includes('Forks:')) {
        const text = li.innerHTML;
        if (lang === 'ar') {
          li.innerHTML = text.replace(/\d+/g, function(match) {
            return convertToArabicNumerals(match);
          });
        } else {
          // For non-Arabic languages, ensure we're using Western numerals
          li.innerHTML = text.replace(/[٠-٩]/g, function(match) {
            const arabicToWestern = {'٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9'};
            return arabicToWestern[match] || match;
          });
        }
      }
    });
  });
}

// Make translations globally available for browser scripts
window.translations = translations;
window.updateNavigationLabels = updateNavigationLabels;

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    translations,
    updateLanguage,
    updateLanguageIndicator,
    updateNavigationLabels,
    formatNumber,
    convertToArabicNumerals,
    updateOverviewNumbers,
    updateProjectNumbers
  };
}
