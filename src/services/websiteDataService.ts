
interface NavigationItem {
  id: string;
  label: string;
  href: string;
  type: 'internal' | 'external' | 'dropdown';
  children?: NavigationItem[];
}

interface WebsiteData {
  collegeName: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutContent: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
  navigationItems: NavigationItem[];
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
  newsItems: Array<{
    id: string;
    title: string;
    content: string;
    date: string;
    category: string;
  }>;
}

const DEFAULT_WEBSITE_DATA: WebsiteData = {
  collegeName: "Springfield University",
  tagline: "Excellence in Education",
  heroTitle: "Shaping Tomorrow's Leaders",
  heroSubtitle: "Join Springfield University, where innovation meets excellence. Our world-class faculty and cutting-edge facilities prepare students for successful careers.",
  aboutTitle: "About Springfield University",
  aboutContent: "Established in 1985, Springfield University has been at the forefront of educational excellence, fostering innovation, research, and character development for over three decades.",
  primaryColor: "#2563eb",
  secondaryColor: "#10b981",
  logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=60",
  navigationItems: [
    { id: 'home', label: 'Home', href: '#', type: 'internal' },
    { id: 'departments', label: 'Departments', href: '#', type: 'dropdown', children: [
      { id: 'cs', label: 'Computer Science', href: '/departments/cs', type: 'internal' },
      { id: 'ee', label: 'Electrical Engineering', href: '/departments/ee', type: 'internal' }
    ]},
    { id: 'admissions', label: 'Admissions', href: '#', type: 'internal' },
    { id: 'about', label: 'About', href: '#', type: 'internal' },
    { id: 'contact', label: 'Contact', href: '#', type: 'internal' }
  ],
  footerData: {
    contactInfo: {
      address: "123 University Ave, Springfield",
      phone: "+1 (555) 123-4567",
      email: "info@springfield.edu"
    },
    quickLinks: [
      { label: "Admissions", href: "#" },
      { label: "Academic Calendar", href: "#" },
      { label: "Student Portal", href: "#" },
      { label: "Alumni", href: "#" }
    ],
    departments: [
      { label: "Computer Science", href: "#" },
      { label: "Engineering", href: "#" },
      { label: "Business", href: "#" },
      { label: "Liberal Arts", href: "#" }
    ],
    socialMedia: [
      { platform: "Facebook", url: "#", icon: "facebook" },
      { platform: "Twitter", url: "#", icon: "twitter" },
      { platform: "LinkedIn", url: "#", icon: "linkedin" }
    ]
  },
  newsItems: [
    {
      id: "1",
      title: "Springfield University Ranked #1 in State",
      content: "We are proud to announce our top ranking...",
      date: "June 10, 2025",
      category: "Achievement"
    },
    {
      id: "2", 
      title: "New AI Research Lab Inaugurated",
      content: "Our state-of-the-art AI research facility...",
      date: "June 8, 2025",
      category: "Infrastructure"
    }
  ]
};

const STORAGE_KEY = 'campus-website-data';

export const websiteDataService = {
  save: (data: WebsiteData): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('Website data saved successfully');
    } catch (error) {
      console.error('Failed to save website data:', error);
    }
  },

  load: (): WebsiteData => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedData = JSON.parse(saved);
        console.log('Website data loaded from storage');
        return { ...DEFAULT_WEBSITE_DATA, ...parsedData };
      }
    } catch (error) {
      console.error('Failed to load website data:', error);
    }
    console.log('Using default website data');
    return DEFAULT_WEBSITE_DATA;
  },

  reset: (): WebsiteData => {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_WEBSITE_DATA;
  }
};

export type { WebsiteData, NavigationItem };
