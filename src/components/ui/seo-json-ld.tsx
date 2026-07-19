import React from 'react';

const siteUrl = 'https://glassgallery.my.id';
const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

export default function SEOJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        "name": "Azzar Budiyanto",
        "givenName": "Azzar",
        "familyName": "Budiyanto",
        "alternateName": "1999AZZAR",
        "url": `${siteUrl}/porto`,
        "image": {
          "@type": "ImageObject",
          "url": "https://raw.githubusercontent.com/1999AZZAR/1999AZZAR/readme/resources/azzar.png",
          "width": 800,
          "height": 800
        },
        "jobTitle": "Freelance Engineer & Full-Stack Developer",
        "worksFor": {
          "@type": "Organization",
          "name": "Independent Contractor"
        },
        "email": "azzar.budi@gmail.com",
        "telephone": "+62 82232529804",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Remote",
          "addressRegion": "Worldwide",
          "addressCountry": "Available Globally"
        },
        "nationality": "Indonesian",
        "knowsLanguage": ["English", "Indonesian", "Arabic", "Javanese"],
        "knowsAbout": [
          "IoT Development", "Web Development", "Arduino Programming", "Python Programming",
          "JavaScript Development", "Embedded Systems", "Machine Learning", "Artificial Intelligence",
          "Full-Stack Development", "Mobile Development", "Database Management", "Cloud Computing", "DevOps"
        ],
        "hasOccupation": {
          "@type": "Occupation",
          "name": "Software Engineer",
          "occupationLocation": {
            "@type": "Place",
            "name": "Remote - Worldwide"
          },
          "skills": "IoT, Web Development, Arduino, Python, JavaScript, AI/ML, Embedded Systems"
        },
        "alumniOf": {
          "@type": "Organization",
          "name": "Indobot Academy"
        },
        "sameAs": [
          "https://github.com/1999AZZAR",
          "https://www.linkedin.com/in/azzar-budiyanto/", 
          "https://twitter.com/siapa_hayosiapa",
          "https://www.instagram.com/azzar_budiyanto/",
          "https://medium.com/@azzar_budiyanto",
          "https://wp.glassgallery.my.id/",
          "https://orcid.org/0009-0003-6856-7820"
        ]
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        "url": siteUrl,
        "name": "Azzar Budiyanto Portfolio",
        "description": "Expert freelance engineer & full-stack developer portfolio showcasing IoT solutions, web development, and technical expertise",
        "publisher": { "@id": personId },
        "inLanguage": ["en", "id"],
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteUrl}/porto?search={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        "name": "Azzar Budiyanto Freelance Engineering Services",
        "provider": { "@id": personId },
        "serviceType": [
          "IoT Development", "Web Development", "Arduino Programming", 
          "Full-Stack Development", "Mobile App Development", "Embedded Systems",
          "AI/ML Solutions", "Technical Consulting", "Software Engineering"
        ],
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Freelance Engineering Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "IoT Development",
                "description": "Custom IoT solutions using Arduino, ESP32, sensors, and cloud integration"
              }
            },
            {
              "@type": "Offer", 
              "itemOffered": {
                "@type": "Service",
                "name": "Web Development",
                "description": "Full-stack web applications using modern frameworks and technologies"
              }
            }
          ]
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Remote",
          "addressRegion": "Worldwide",
          "addressCountry": "Available Globally"
        },
        "telephone": "+62 82232529804",
        "email": "azzar.budi@gmail.com"
      },
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/#webpage`,
        "url": siteUrl,
        "name": "Home",
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": ["header h1", ".headline-editorial", ".pull-quote", "main p"]
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
