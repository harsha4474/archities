import { useEffect } from 'react';

const SchemaMarkup = () => {
  useEffect(() => {
    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "InteriorDesignCompany",
      "name": "archities",
      "image": "https://archities.com/og-image.jpg",
      "@id": "https://archities.com",
      "url": "https://archities.com",
      "telephone": "+919030938830",
      "email": "info@archities.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Hyderabad",
        "addressLocality": "Hyderabad",
        "addressRegion": "Telangana",
        "postalCode": "500001",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 17.385044,
        "longitude": 78.486671
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "19:00"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/archities",
        "https://www.instagram.com/archities",
        "https://www.linkedin.com/company/archities"
      ],
      "priceRange": "₹₹₹",
      "areaServed": [
        {
          "@type": "State",
          "name": "Telangana"
        },
        {
          "@type": "State",
          "name": "Andhra Pradesh"
        }
      ],
      "description": "Premium interior design company in Hyderabad serving Andhra Pradesh and Telangana. Specializing in residential and commercial interiors with 95%+ design accuracy from render to reality."
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Interior Design Services",
      "provider": {
        "@type": "Organization",
        "name": "archities"
      },
      "areaServed": {
        "@type": "State",
        "name": "Telangana, Andhra Pradesh"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Interior Design Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Residential Interior Design"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Modular Kitchen Design"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Commercial Interior Design"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "3D Visualization & Rendering"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Complete Renovation Services"
            }
          }
        ]
      }
    };

    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "archities",
      "url": "https://archities.com",
      "logo": "https://archities.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+919030938830",
        "contactType": "customer service",
        "email": "info@archities.com",
        "areaServed": "IN",
        "availableLanguage": ["en", "te", "hi"]
      },
      "sameAs": [
        "https://www.facebook.com/archities",
        "https://www.instagram.com/archities"
      ]
    };

    // Add schemas to document head
    const addSchema = (schema, id) => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    addSchema(localBusinessSchema, 'local-business-schema');
    addSchema(serviceSchema, 'service-schema');
    addSchema(organizationSchema, 'organization-schema');

    // Cleanup on unmount
    return () => {
      ['local-business-schema', 'service-schema', 'organization-schema'].forEach(id => {
        const script = document.getElementById(id);
        if (script) script.remove();
      });
    };
  }, []);

  return null; // This component doesn't render anything
};

export default SchemaMarkup;
