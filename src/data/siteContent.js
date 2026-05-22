export const siteContent = {
  brand: {
    name:        'Black Gold Realty Group',
    tagline:     'More Than Property',
    shortName:   'BGRG',
    description:
      'Ghana\'s premier luxury real estate group — connecting discerning buyers, investors, and diaspora clients with exceptional properties across Accra and beyond.',
    founded:     '2018',
    phone:       '+233 24 000 0000',
    whatsapp:    '+233240000000',
    email:       'hello@blackgoldrealtygroup.com',
    address:     '14 Liberation Road, Airport City, Accra, Ghana',
    socialMedia: {
      instagram: 'https://instagram.com/blackgoldrealtygroup',
      facebook:  'https://facebook.com/blackgoldrealtygroup',
      linkedin:  'https://linkedin.com/company/blackgoldrealtygroup',
      youtube:   'https://youtube.com/@blackgoldrealtygroup',
    },
  },

  hero: {
    badge:    'Ghana\'s #1 Luxury Real Estate Group',
    headline: 'Where Luxury\nMeets Legacy',
    subheadline:
      'Exceptional properties for discerning buyers. From Cantonments to East Legon — we curate Ghana\'s finest real estate experiences.',
    cta: {
      primary:   { label: 'Explore Properties', href: '/listings' },
      secondary: { label: 'Book a Consultation', href: '/contact' },
    },
    stats: [
      { value: '500+',  label: 'Properties Sold'  },
      { value: '₵2B+',  label: 'Total Value'       },
      { value: '98%',   label: 'Client Satisfaction'},
      { value: '6+',    label: 'Years Experience'   },
    ],
    videoUrl:
      'https://res.cloudinary.com/demo/video/upload/v1/luxury-real-estate-hero.mp4',
    // Fallback poster for video
    posterUrl:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80',
  },

  featuredSection: {
    badge:    'Hand-Picked Selection',
    headline: 'Featured Properties',
    subheadline:
      'Discover our most exclusive listings — each property personally verified and curated by our expert team.',
    cta: { label: 'View All Properties', href: '/listings' },
  },

  whyChooseUs: {
    badge:    'The Black Gold Difference',
    headline: 'Why Clients Choose Us',
    subheadline:
      'We don\'t just sell properties. We engineer life-defining real estate experiences for our clients.',
    reasons: [
      {
        id:          1,
        icon:        'Shield',
        title:       'Verified Listings Only',
        description:
          'Every property is legally vetted, physically inspected, and title-deed confirmed before it reaches your screen.',
      },
      {
        id:          2,
        icon:        'Globe',
        title:       'Diaspora Specialist',
        description:
          'We have helped over 200 diaspora clients purchase property in Ghana — remotely and securely. We understand your unique needs.',
      },
      {
        id:          3,
        icon:        'Award',
        title:       'Award-Winning Service',
        description:
          'Recognised as Ghana\'s leading luxury property consultancy, with a track record that speaks for itself.',
      },
      {
        id:          4,
        icon:        'Key',
        title:       'End-to-End Support',
        description:
          'From first viewing to keys in hand — we manage every step including legal, financing, and after-sale service.',
      },
      {
        id:          5,
        icon:        'TrendingUp',
        title:       'Investment Intelligence',
        description:
          'Our market analysts provide data-driven insights to ensure your investment delivers maximum returns.',
      },
      {
        id:          6,
        icon:        'Phone',
        title:       '24/7 Client Access',
        description:
          'Your dedicated agent is available around the clock via WhatsApp, call, or video — wherever you are in the world.',
      },
    ],
  },

  ctaSection: {
    badge:    'Ready to Invest?',
    headline: 'Your Dream Property\nAwaits in Ghana',
    subheadline:
      'Whether you\'re in London, New York, Toronto or Accra — we make buying premium Ghanaian real estate simple, secure, and seamless.',
    cta: {
      primary:   { label: 'Browse All Properties',   href: '/listings' },
      secondary: { label: 'Speak to an Agent Today', href: '/contact'  },
    },
    backgroundImage:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
  },

  about: {
    badge:    'Our Story',
    headline: 'Built on Trust,\nDriven by Excellence',
    story: [
      'Black Gold Realty Group was founded with a singular vision — to transform how premium real estate is experienced in Ghana. We saw a market where high-income buyers and diaspora investors were underserved, navigating complex property transactions without the sophisticated support they deserved.',
      'Today, we are Ghana\'s most trusted luxury real estate consultancy, with a portfolio spanning Cantonments, Airport Hills, East Legon, Trasacco Valley, and beyond. Our clients include executives, diaspora buyers, and institutional investors who demand nothing but the best.',
      'The "Black Gold" in our name represents two things: the rich earth of Ghana, and the gold-standard service we deliver. Every transaction we handle is treated with the precision, discretion, and excellence that our clients expect.',
    ],
    mission:
      'To provide world-class real estate experiences that create lasting wealth and exceptional living for our clients.',
    vision:
      'To be the most trusted name in luxury real estate across West Africa — setting the standard for transparency, professionalism, and results.',
    values: ['Integrity', 'Excellence', 'Transparency', 'Innovation', 'Client-First'],
    team: [
      {
        id:       1,
        name:     'Kwame Asante',
        role:     'Founder & CEO',
        bio:      'Former investment banker with 15 years in Ghanaian real estate. Kwame has overseen over ₵500M in property transactions.',
        image:    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
        linkedin: '#',
      },
      {
        id:       2,
        name:     'Abena Mensah',
        role:     'Head of Luxury Sales',
        bio:      'Specialist in high-net-worth client relations with a background in international property advisory.',
        image:    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80',
        linkedin: '#',
      },
      {
        id:       3,
        name:     'Kofi Boateng',
        role:     'Diaspora Client Director',
        bio:      'Having lived in the UK for a decade before returning to Ghana, Kofi specialises in guiding diaspora buyers through the process.',
        image:    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
        linkedin: '#',
      },
      {
        id:       4,
        name:     'Ama Owusu',
        role:     'Legal & Compliance Lead',
        bio:      'A qualified Ghanaian attorney ensuring every transaction is legally sound, protected, and fully compliant.',
        image:    'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&q=80',
        linkedin: '#',
      },
    ],
    stats: [
      { value: '500+',  label: 'Properties Sold'     },
      { value: '200+',  label: 'Diaspora Clients'    },
      { value: '₵2B+',  label: 'Total Transactions'  },
      { value: '6+',    label: 'Years in Business'   },
    ],
  },

  contact: {
    badge:    'Get In Touch',
    headline: 'Let\'s Find Your\nPerfect Property',
    subheadline:
      'Our team of luxury real estate specialists is ready to assist you. Reach out via any channel — we respond within 2 hours.',
    offices: [
      {
        city:    'Accra (HQ)',
        address: '14 Liberation Road, Airport City, Accra',
        phone:   '+233 24 000 0000',
        email:   'accra@blackgoldrealtygroup.com',
        hours:   'Mon – Fri: 8am – 6pm | Sat: 9am – 3pm',
      },
    ],
    formFields: {
      name:     { label: 'Full Name',         placeholder: 'Your full name'         },
      email:    { label: 'Email Address',     placeholder: 'your@email.com'         },
      phone:    { label: 'Phone / WhatsApp',  placeholder: '+1 000 000 0000'        },
      interest: { label: 'I Am Interested In',
        options: ['Buying a Property', 'Renting a Property', 'Investment Advice', 'Property Management', 'Land Acquisition', 'General Enquiry'],
      },
      budget:   { label: 'Budget Range',
        options: ['Under $100K', '$100K – $250K', '$250K – $500K', '$500K – $1M', '$1M+', 'Prefer not to say'],
      },
      message:  { label: 'Message',           placeholder: 'Tell us what you\'re looking for…' },
    },
  },

  footer: {
    tagline:     'More Than Property.',
    description: 'Ghana\'s premier luxury real estate group — serving discerning buyers, investors, and the global diaspora.',
    quickLinks: [
      { label: 'Properties',  href: '/listings' },
      { label: 'About Us',    href: '/about'    },
      { label: 'Contact',     href: '/contact'  },
    ],
    propertyTypes: [
      { label: 'Luxury Villas',      href: '/listings?type=villa'      },
      { label: 'Penthouse Suites',   href: '/listings?type=penthouse'  },
      { label: 'Executive Homes',    href: '/listings?type=house'      },
      { label: 'Investment Land',    href: '/listings?type=land'       },
      { label: 'Commercial Spaces',  href: '/listings?type=commercial' },
    ],
    legal: [
      { label: 'Privacy Policy',    href: '/privacy'  },
      { label: 'Terms of Service',  href: '/terms'    },
    ],
    copyright: `© ${new Date().getFullYear()} Black Gold Realty Group. All rights reserved.`,
  },

  ticker: [
    '🏠 New Listing: 5-Bed Villa in East Legon — $850,000',
    '🏆 Award: Best Luxury Agency Ghana 2024',
    '📍 Just Sold: Penthouse in Airport Hills — $1.2M',
    '🌍 Diaspora Special: Remote Purchase Program Available',
    '🔑 New Listing: 4-Bed Executive Home in Cantonments — $620,000',
    '📊 Market Update: Accra prime real estate up 18% YoY',
  ],
};