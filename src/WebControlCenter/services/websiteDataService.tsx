import { v4 as uuidv4 } from 'uuid';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  type: 'internal' | 'external' | 'dropdown';
  children?: NavigationItem[];
}

export interface WebsiteData {
  collegeName: string;
  tagline: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaButtonText: string;
  ctaButtonLink: string;
  aboutTitle: string;
  aboutContent: string;
  academicsTitle: string;
  academicsDescription: string;
  departments: Array<{
    id: string;
    name: string;
    duration: string;
    seats: string;
    link: string;
  }>;
  professionalBodiesTitle: string;
  professionalBodies: Array<{
    id: string;
    name: string;
    description: string;
    website: string;
    logo: string;
  }>;
  navigationItems: NavigationItem[];
  newsItems: Array<{
    id: string;
    title: string;
    content: string;
    date: string;
    category: string;
  }>;
  footerData: {
    contactInfo: {
      address: string;
      phone: string;
      email: string;
    };
    quickLinks: Array<{ label: string; href: string }>;
    departments: Array<{ label: string; href: string }>;
    socialMedia: Array<{ platform: string; url: string; icon: string }>;
  };
}

const defaultWebsiteData: WebsiteData = {
  collegeName: "Excellence University",
  tagline: "Empowering Future Leaders",
  logoUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center",
  primaryColor: "#1e40af",
  secondaryColor: "#3b82f6",
  heroTitle: "Welcome to Excellence University",
  heroSubtitle: "Join thousands of students in their journey towards academic excellence and professional success.",
  ctaButtonText: "Apply Now",
  ctaButtonLink: "/admissions",
  aboutTitle: "About Our Institution",
  aboutContent: "We are committed to providing world-class education and fostering innovation in all fields of study.",
  academicsTitle: "Academic Programs",
  academicsDescription: "Explore our comprehensive range of undergraduate and graduate programs",
  departments: [
    {
      id: "cse",
      name: "Computer Science & Engineering",
      duration: "4 Years",
      seats: "120",
      link: "/departments/cse"
    },
    {
      id: "it",
      name: "Information Technology",
      duration: "4 Years", 
      seats: "60",
      link: "/departments/it"
    },
    {
      id: "ds",
      name: "Data Science",
      duration: "4 Years",
      seats: "40", 
      link: "/departments/ds"
    }
  ],
  professionalBodiesTitle: "Professional Bodies",
  professionalBodies: [
    {
      id: "ieee",
      name: "IEEE",
      description: "Institute of Electrical and Electronics Engineers",
      website: "https://ieee.org",
      logo: ""
    }
  ],
  navigationItems: [
    { id: 'home', label: 'Home', href: '/', type: 'internal' },
    { id: 'about', label: 'About', href: '/about', type: 'internal' },
    { id: 'academics', label: 'Academics', href: '/academics', type: 'internal' },
    { id: 'admissions', label: 'Admissions', href: '/admissions', type: 'internal' },
    { id: 'contact', label: 'Contact', href: '/contact', type: 'internal' },
  ],
  newsItems: [
    {
      id: uuidv4(),
      title: "University Announces New Scholarship Program",
      content: "We are excited to announce a new scholarship program for deserving students.",
      date: "August 15, 2024",
      category: "Academics",
    },
    {
      id: uuidv4(),
      title: "Campus Expansion Project Underway",
      content: "Construction has begun on our new state-of-the-art campus expansion project.",
      date: "July 22, 2024",
      category: "Campus",
    },
  ],
  footerData: {
    contactInfo: {
      address: "123 University Avenue, Cityville",
      phone: "+1 555-123-4567",
      email: "info@excellence.edu",
    },
    quickLinks: [
      { label: "Admissions", href: "/admissions" },
      { label: "Academics", href: "/academics" },
      { label: "Research", href: "/research" },
      { label: "Contact Us", href: "/contact" },
    ],
    departments: [
      { label: "Computer Science", href: "/departments/computer-science" },
      { label: "Business Administration", href: "/departments/business" },
      { label: "Engineering", href: "/departments/engineering" },
    ],
    socialMedia: [
      { platform: "Facebook", url: "#", icon: "facebook" },
      { platform: "Twitter", url: "#", icon: "twitter" },
      { platform: "LinkedIn", url: "#", icon: "linkedin" },
    ],
  },
};

// Function to load data from local storage
const load = (): WebsiteData => {
  try {
    const serializedData = localStorage.getItem('websiteData');
    if (serializedData === null) {
      return defaultWebsiteData;
    }
    return JSON.parse(serializedData);
  } catch (error) {
    console.error("Error loading website data from local storage:", error);
    return defaultWebsiteData;
  }
};

// Function to save data to local storage
const save = (data: WebsiteData): void => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem('websiteData', serializedData);
  } catch (error) {
    console.error("Error saving website data to local storage:", error);
  }
};

export const websiteDataService = {
  load,
  save,
};
