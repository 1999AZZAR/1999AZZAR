// Global variables
let sortedProjects = [];
let activeSection = null;
let fuse; // For fuzzy search

const translations = {
  en: {
    mainTitle: "azzar budiyanto",
    homeDescriptionText: "Freelance engineer from Yogyakarta, ID.",
    about: "About",
    summary: "Summary",
    summaryText: "With over 5 years of programming experience, I specialize in IoT, web development, and microcontroller programming. I'm skilled in multiple languages (Arduino, Python, C, C++, C#, HTML, CSS, Flutter, and JavaScript) and tools (Microsoft Office, Canva) to support product and service optimization. I create improvement plans, generate insightful reports, and collaborate effectively across teams. My multilingual abilities in English, Indonesian, Javanese, and Arabic enhance my adaptability in diverse settings.",
    resumeLink: "General Resume (PDF)",
    photoPortfolioLink: "Photographs portfolio (PDF)",
    ageLabel: "Age:",
    freelanceLabel: "Freelance: Available",
    skillsTitle: "Skills",
    webdevTitle: "Web Development",
    webdevDesc: "Proficient in HTML, CSS, JavaScript, and frameworks like Flask and React.",
    flaskTitle: "Flask App Development",
    flaskDesc: "Experienced in building web applications using Flask.",
    mcuTitle: "Microcontroller Programming",
    mcuDesc: "Skilled in programming microcontrollers like Arduino and ESP32.",
    iotTitle: "IoT",
    iotDesc: "Knowledgeable in IoT technologies and platforms like Adafruit IO and Blynk.",
    officeTitle: "Office Tools",
    officeDesc: "Proficient in Microsoft Office tools, including Word, Excel, and PowerPoint. Additionally, experienced in using various operating systems, such as Windows and Ubuntu/Debian-based Linux systems.",
    pythonTitle: "Python Programming",
    pythonDesc: "Experienced in Python for various applications including web development and data analysis.",
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
    serviceArduinoDesc: "We specialize in creating and deploying embedded software for Arduino platforms, developing IoT solutions from concept to execution, and designing user-friendly interfaces for seamless interaction with embedded systems and IoT devices.",
    // Services
    serviceApiTitle: "API Development and Integration",
    serviceApiDesc: "We create robust APIs to enable smooth communication between software systems and applications. Our services include designing secure and efficient endpoints, and integrating APIs with existing systems to enhance data exchange and interoperability.",
    serviceAutomationTitle: "Automation Solutions",
    serviceAutomationDesc: "We design and implement automation systems to improve efficiency and reduce manual efforts. Our services include developing custom scripts, configuring tools, and integrating automation solutions with existing systems to enhance operational workflows.",
    serviceConsultingTitle: "Consulting Services",
    serviceConsultingDesc: "We provide expert advice on IoT project feasibility and design, assist with implementation strategies to achieve project goals, and offer insights and recommendations to support successful outcomes.",
    serviceDataTitle: "Data Analysis and Visualization",
    serviceDataDesc: "We analyze data using Python and libraries like Matplotlib and Pandas, create compelling visualizations with tools such as Plotly, and generate insights to support strategic decision-making.",
    serviceEmbeddedTitle: "Embedded Systems Development",
    serviceEmbeddedDesc: "We develop and integrate embedded systems with IoT devices, ensuring efficient and reliable performance for custom applications. Our expertise includes microcontroller programming and interfacing.",
    serviceSecurityTitle: "IoT Security Solutions",
    serviceSecurityDesc: "We implement security measures to protect IoT devices and networks from potential threats. Our services include conducting vulnerability assessments, identifying and addressing security risks, and providing recommendations to enhance the overall security of IoT systems.",
    serviceTrainingTitle: "Microcontroller Training",
    serviceTrainingDesc: "We design and deliver comprehensive training programs on microcontrollers for various audiences. Our training includes developing engaging curriculum, providing hands-on support, and ensuring effective learning experiences for participants.",
    servicePhotoTitle: "Photography Services",
    servicePhotoDesc: "We capture high-quality photographs for diverse applications, including marketing materials and events. Our services include editing and enhancing images, collaborating closely with clients to realize their vision, and ensuring satisfaction with the final product.",
    serviceProjectTitle: "Project Management",
    serviceProjectDesc: "We manage projects from initiation to completion while ensuring adherence to timelines and budgets. Our services include coordinating with team members and stakeholders, monitoring project progress, and making necessary adjustments for successful delivery.",
    serviceWritingTitle: "Technical Writing and Documentation",
    serviceWritingDesc: "We create detailed technical documentation for software projects, develop user guides for hardware projects, and ensure clear communication to enhance usability for end-users.",
    serviceUiuxTitle: "UI/UX Design",
    serviceUiuxDesc: "We design visually appealing and user-friendly interfaces for digital products. Our services include conducting user research and testing, collaborating with developers to ensure seamless integration of design concepts into functional products.",
    serviceWebTitle: "Web Development",
    serviceWebDesc: "We design, develop, and implement innovative web applications to meet specific business needs. Our services include creating and deploying responsive frameworks, ensuring seamless user interaction through intuitive and engaging interface design.",
    // Contact
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
    // Overview
    overviewTitle: "Project Overview",
    overviewSearchPlaceholder: "Search projects..."
  },
  id: {
    mainTitle: "azzar budiyanto",
    homeDescriptionText: "Engineer freelance dari Yogyakarta, ID.",
    about: "Tentang",
    summary: "Ringkasan",
    summaryText: "Dengan pengalaman lebih dari 5 tahun dalam pemrograman, saya mengkhususkan diri dalam IoT, pengembangan web, dan pemrograman mikrokontroler. Saya mahir dalam berbagai bahasa (Arduino, Python, C, C++, C#, HTML, CSS, Flutter, dan JavaScript) serta alat (Microsoft Office, Canva) untuk mendukung optimasi produk dan layanan. Saya membuat rencana perbaikan, menghasilkan laporan yang mendalam, dan berkolaborasi secara efektif di berbagai tim. Kemampuan multibahasa saya dalam Bahasa Inggris, Indonesia, Jawa, dan Arab meningkatkan adaptasi saya di lingkungan yang beragam.",
    resumeLink: "Resume Umum (PDF)",
    photoPortfolioLink: "Portofolio Foto (PDF)",
    ageLabel: "Usia:",
    freelanceLabel: "Freelance: Tersedia",
    skillsTitle: "Keahlian",
    webdevTitle: "Pengembangan Web",
    webdevDesc: "Mahir dalam HTML, CSS, JavaScript, dan framework seperti Flask dan React.",
    flaskTitle: "Pengembangan Aplikasi Flask",
    flaskDesc: "Berpengalaman membangun aplikasi web menggunakan Flask.",
    mcuTitle: "Pemrograman Mikrokontroler",
    mcuDesc: "Mahir memprogram mikrokontroler seperti Arduino dan ESP32.",
    iotTitle: "IoT",
    iotDesc: "Menguasai teknologi dan platform IoT seperti Adafruit IO dan Blynk.",
    officeTitle: "Alat Perkantoran",
    officeDesc: "Mahir menggunakan Microsoft Office, termasuk Word, Excel, dan PowerPoint. Juga berpengalaman dengan berbagai sistem operasi seperti Windows dan Linux berbasis Ubuntu/Debian.",
    pythonTitle: "Pemrograman Python",
    pythonDesc: "Berpengalaman menggunakan Python untuk berbagai aplikasi termasuk pengembangan web dan analisis data.",
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
    serviceArduinoDesc: "Kami ahli dalam membuat dan menerapkan perangkat lunak tertanam untuk platform Arduino, mengembangkan solusi IoT dari konsep hingga eksekusi, dan merancang antarmuka yang ramah pengguna untuk interaksi dengan sistem tertanam dan perangkat IoT.",
    // Services
    serviceApiTitle: "Pengembangan dan Integrasi API",
    serviceApiDesc: "Kami membuat API yang andal untuk komunikasi lancar antar sistem dan aplikasi. Layanan kami meliputi perancangan endpoint yang aman dan efisien, serta integrasi API dengan sistem yang sudah ada untuk meningkatkan pertukaran data dan interoperabilitas.",
    serviceAutomationTitle: "Solusi Otomasi",
    serviceAutomationDesc: "Kami merancang dan mengimplementasikan sistem otomasi untuk meningkatkan efisiensi dan mengurangi pekerjaan manual. Layanan kami meliputi pengembangan skrip khusus, konfigurasi alat, dan integrasi solusi otomasi dengan sistem yang ada.",
    serviceConsultingTitle: "Layanan Konsultasi",
    serviceConsultingDesc: "Kami memberikan saran ahli tentang kelayakan dan desain proyek IoT, membantu strategi implementasi untuk mencapai tujuan proyek, serta memberikan wawasan dan rekomendasi untuk mendukung hasil yang sukses.",
    serviceDataTitle: "Analisis dan Visualisasi Data",
    serviceDataDesc: "Kami menganalisis data menggunakan Python dan pustaka seperti Matplotlib dan Pandas, membuat visualisasi menarik dengan alat seperti Plotly, dan menghasilkan wawasan untuk mendukung pengambilan keputusan strategis.",
    serviceEmbeddedTitle: "Pengembangan Sistem Tertanam",
    serviceEmbeddedDesc: "Kami mengembangkan dan mengintegrasikan sistem tertanam dengan perangkat IoT, memastikan kinerja yang efisien dan andal untuk aplikasi khusus. Keahlian kami mencakup pemrograman dan interfacing mikrokontroler.",
    serviceSecurityTitle: "Solusi Keamanan IoT",
    serviceSecurityDesc: "Kami menerapkan langkah-langkah keamanan untuk melindungi perangkat dan jaringan IoT dari ancaman. Layanan kami meliputi penilaian kerentanan, identifikasi dan penanganan risiko keamanan, serta rekomendasi untuk meningkatkan keamanan sistem IoT.",
    serviceTrainingTitle: "Pelatihan Mikrokontroler",
    serviceTrainingDesc: "Kami merancang dan memberikan program pelatihan komprehensif tentang mikrokontroler untuk berbagai audiens. Pelatihan kami mencakup pengembangan kurikulum menarik, dukungan langsung, dan memastikan pengalaman belajar yang efektif.",
    servicePhotoTitle: "Layanan Fotografi",
    servicePhotoDesc: "Kami mengambil foto berkualitas tinggi untuk berbagai kebutuhan, termasuk materi pemasaran dan acara. Layanan kami meliputi pengeditan dan peningkatan gambar, kolaborasi erat dengan klien, dan memastikan kepuasan dengan hasil akhir.",
    serviceProjectTitle: "Manajemen Proyek",
    serviceProjectDesc: "Kami mengelola proyek dari awal hingga selesai dengan memastikan kepatuhan pada jadwal dan anggaran. Layanan kami meliputi koordinasi dengan anggota tim dan pemangku kepentingan, pemantauan kemajuan proyek, dan penyesuaian yang diperlukan untuk keberhasilan proyek.",
    serviceWritingTitle: "Penulisan Teknis dan Dokumentasi",
    serviceWritingDesc: "Kami membuat dokumentasi teknis yang rinci untuk proyek perangkat lunak, mengembangkan panduan pengguna untuk proyek perangkat keras, dan memastikan komunikasi yang jelas untuk meningkatkan kegunaan bagi pengguna akhir.",
    serviceUiuxTitle: "Desain UI/UX",
    serviceUiuxDesc: "Kami merancang antarmuka digital yang menarik dan mudah digunakan. Layanan kami meliputi riset dan pengujian pengguna, serta kolaborasi dengan pengembang untuk memastikan integrasi desain yang mulus ke produk fungsional.",
    serviceWebTitle: "Pengembangan Web",
    serviceWebDesc: "Kami merancang, mengembangkan, dan mengimplementasikan aplikasi web inovatif sesuai kebutuhan bisnis. Layanan kami meliputi pembuatan dan penerapan kerangka kerja responsif, memastikan interaksi pengguna yang mulus melalui desain antarmuka yang intuitif dan menarik.",
    // Contact
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
    // Overview
    overviewTitle: "Ringkasan Proyek",
    overviewSearchPlaceholder: "Cari proyek..."
  }
};

function updateLanguage(lang) {
  const map = {
    mainTitle: 'main-title',
    homeDescriptionText: 'home-description-text',
    about: 'about-title',
    summary: 'summary-title',
    summaryText: 'summary-text',
    freelanceLabel: 'freelance-label',
    skillsTitle: 'skills-title',
    webdevTitle: 'webdev-title',
    webdevDesc: 'webdev-desc',
    flaskTitle: 'flask-title',
    flaskDesc: 'flask-desc',
    mcuTitle: 'mcu-title',
    mcuDesc: 'mcu-desc',
    iotTitle: 'iot-title',
    iotDesc: 'iot-desc',
    officeTitle: 'office-title',
    officeDesc: 'office-desc',
    pythonTitle: 'python-title',
    pythonDesc: 'python-desc',
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
    // Services
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
    // Contact
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
    // Overview
    overviewTitle: 'overview-title',
    overviewSearchPlaceholder: 'search-input',
  };
  
  // Handle regular translations
  for (const key in map) {
    const el = document.getElementById(map[key]);
    if (el && translations[lang][key]) {
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
      } else if (el.id === 'search-input') {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  }
  
  // Special handling for download links - preserve the <a> tags but translate the text
  const resumeLink = document.querySelector('#resume-link a');
  const photoPortfolioLink = document.querySelector('#photo-portfolio-link a');
  
  if (resumeLink && translations[lang].resumeLink) {
    resumeLink.textContent = translations[lang].resumeLink;
  }
  
  if (photoPortfolioLink && translations[lang].photoPortfolioLink) {
    photoPortfolioLink.textContent = translations[lang].photoPortfolioLink;
  }
  
  // Special handling for age label - preserve the age value
  const ageLabel = document.getElementById('age-label');
  const ageInDays = document.getElementById('age-in-days');
  if (ageLabel && translations[lang].ageLabel && ageInDays) {
    const icon = ageLabel.querySelector('i');
    const ageValue = ageInDays.textContent;
    const daysText = lang === 'id' ? 'hari' : 'days';
    if (icon) {
      ageLabel.innerHTML = icon.outerHTML + ' <strong>' + translations[lang].ageLabel + '</strong> <span id="age-in-days">' + ageValue + '</span>‎ ' + daysText;
    }
  }
}

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

        // Initialize Fuse.js after sorting the projects
        fuse = new Fuse(sortedProjects, {
            keys: ['name', 'description', 'topics'], // Include topics as a searchable key
            threshold: 0.4,
            shouldSort: true
        });

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

    document.getElementById('total-repos').textContent = totalRepos;
    document.getElementById('deployed-sites').textContent = deployedSites;
    document.getElementById('languages-used').textContent = languages;
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

        if (type === 'web' && repo.homepage) {
            // Web site card with iframe preview
            projectCard.innerHTML = `
                <h3><i class="fas fa-globe"></i> ${repo.name}</h3>
                <div class="service-card">
                    <div class="iframe-container" style="position: relative; width: 100%; height: 250px; margin-bottom: 1rem; border-radius: 10px; overflow: hidden; background: #f5f5f5;">
                        <iframe 
                            src="${repo.homepage}" 
                            style="width: 100%; height: 100%; border: none; border-radius: 10px;"
                            loading="lazy"
                            sandbox="allow-same-origin allow-scripts allow-forms"
                            title="Preview of ${repo.name}">
                        </iframe>
                        <div class="iframe-overlay" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.8rem;">
                            <i class="fas fa-external-link-alt"></i> Live Preview
                        </div>
                    </div>
                    <p>${truncatedDescription}</p>
                    <ul>
                        <li><i class="fas fa-calendar-alt"></i> Updated: ${new Date(repo.updated_at).toLocaleDateString()}</li>
                        <li><i class="fas fa-star"></i> Stars: ${repo.stargazers_count}</li>
                        <li><i class="fas fa-code-branch"></i> Forks: ${repo.forks_count}</li>
                        ${repo.language ? `<li><i class="fas fa-code"></i> <span style="color: ${languageColor};">●</span> ${repo.language}</li>` : ''}
                        <li><i class="fas fa-tag"></i> Topics: ${topics}</li>
                    </ul>
                    <div style="margin-top: 1rem;">
                        <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                            🚀 Visit Site
                        </a>
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                            📁 View Code
                        </a>
                    </div>
                </div>
            `;
        } else {
            // Repository card with OpenGraph preview
            const opengraphUrl = `https://opengraph.githubassets.com/1/1999AZZAR/${repo.name}`;
            projectCard.innerHTML = `
                <h3><i class="fas fa-bars-staggered"></i> ${repo.name}</h3>
                <div class="service-card">
                    <div class="opengraph-container" style="position: relative; width: 100%; height: 200px; margin-bottom: 1rem; border-radius: 10px; overflow: hidden; background: #f5f5f5;">
                        <img 
                            src="${opengraphUrl}" 
                            alt="${repo.name} OpenGraph Preview" 
                            style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <div class="fallback-preview" style="display: none; width: 100%; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 1rem;">
                            <i class="fab fa-github" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                            <h4 style="margin: 0; font-size: 1.1rem;">${repo.name}</h4>
                            <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem; opacity: 0.8;">${truncatedDescription}</p>
                        </div>
                        <div class="opengraph-overlay" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; padding: 5px 10px; border-radius: 15px; font-size: 0.8rem;">
                            <i class="fab fa-github"></i> Repository
                        </div>
                    </div>
                    <p>${truncatedDescription}</p>
                    <ul>
                        <li><i class="fas fa-calendar-alt"></i> Updated: ${new Date(repo.updated_at).toLocaleDateString()}</li>
                        <li><i class="fas fa-star"></i> Stars: ${repo.stargazers_count}</li>
                        <li><i class="fas fa-code-branch"></i> Forks: ${repo.forks_count}</li>
                        ${repo.language ? `<li><i class="fas fa-code"></i> <span style="color: ${languageColor};">●</span> ${repo.language}</li>` : ''}
                        <li><i class="fas fa-tag"></i> Topics: ${topics}</li>
                    </ul>
                    <div style="margin-top: 1rem;">
                        <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
                            📁 View Repository
                        </a>
                        ${repo.homepage && repo.homepage.startsWith('http') ? `
                            <a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
                                🔗 Live Demo
                            </a>
                        ` : ''}
                    </div>
                </div>
            `;
        }

        // Add animation delay for staggered appearance
        setTimeout(() => {
            projectCard.style.opacity = '0';
            projectCard.style.transform = 'translateY(20px)';
            projectsContainer.appendChild(projectCard);
            
            requestAnimationFrame(() => {
                projectCard.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                projectCard.style.opacity = '1';
                projectCard.style.transform = 'translateY(0)';
            });
        }, index * 100);
    });
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

    // Calculate and set age first before language update
    const birthDate = new Date('1999-10-09');
    const today = new Date();
    const ageInDays = Math.floor((today - birthDate) / (1000 * 60 * 60 * 24));
    document.getElementById('age-in-days').textContent = ageInDays;

    // Language toggle logic - new click-based language switcher
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        const storedLang = localStorage.getItem('selectedLanguage') || 'en';
        if (storedLang === 'id') {
            languageToggle.classList.add('id-lang');
        }
        updateLanguage(storedLang); // update on load
        
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const currentLang = localStorage.getItem('selectedLanguage') || 'en';
            const newLang = currentLang === 'en' ? 'id' : 'en';
            
            localStorage.setItem('selectedLanguage', newLang);
            updateLanguage(newLang);
            
            // Update button indicator
            if (newLang === 'id') {
                languageToggle.classList.add('id-lang');
            } else {
                languageToggle.classList.remove('id-lang');
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

    // Enhanced search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            if (searchTerm === '') {
                // Show all projects for current view
                switchOverviewView(currentView);
            } else if (fuse && allRepos.length > 0) {
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
            }
        });
    }

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
