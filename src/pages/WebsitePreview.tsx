
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Users, Award, ExternalLink, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { websiteDataService, WebsiteData, NavigationItem } from "@/services/websiteDataService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const WebsitePreview = () => {
  const navigate = useNavigate();
  const [websiteData, setWebsiteData] = useState<WebsiteData | null>(null);

  useEffect(() => {
    // Load the saved website data
    const loadedData = websiteDataService.load();
    setWebsiteData(loadedData);
  }, []);

  // Show loading state while data is being loaded
  if (!websiteData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg">Loading website preview...</div>
      </div>
    );
  }

  const renderNavigationItem = (item: NavigationItem) => {
    if (item.type === 'dropdown' && item.children && item.children.length > 0) {
      return (
        <DropdownMenu key={item.id}>
          <DropdownMenuTrigger className="text-slate-700 hover:text-blue-600 font-medium flex items-center space-x-1">
            <span>{item.label}</span>
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border shadow-lg">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.id} asChild>
                <a href={child.href} className="block px-4 py-2 hover:bg-slate-100">
                  {child.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    return (
      <a 
        key={item.id}
        href={item.href} 
        className="text-slate-700 hover:text-blue-600 font-medium"
        {...(item.type === 'external' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.label}
      </a>
    );
  };

  const facultyMembers = [
    { name: "Dr. Sarah Johnson", position: "Head of Computer Science", image: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=400" },
    { name: "Prof. Michael Chen", position: "Software Engineering", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" },
    { name: "Dr. Emily Rodriguez", position: "Data Science", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
  ];

  const courses = [
    { name: "Computer Science & Engineering", duration: "4 Years", seats: "120" },
    { name: "Information Technology", duration: "4 Years", seats: "60" },
    { name: "Data Science", duration: "4 Years", seats: "40" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Editor Bar */}
      <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/")}
            className="text-white hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="text-sm">
            <span className="text-slate-300">Preview Mode</span>
            <span className="mx-2">•</span>
            <span>{websiteData.collegeName} Website</span>
          </div>
        </div>
        <Button 
          size="sm" 
          onClick={() => navigate("/editor")}
          className="bg-green-600 hover:bg-green-700"
        >
          Edit Website
        </Button>
      </div>

      {/* Website Content */}
      <div className="bg-white">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={websiteData.logoUrl} 
                  alt={`${websiteData.collegeName} Logo`} 
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold text-blue-900">{websiteData.collegeName}</h1>
                  <p className="text-sm text-slate-600">{websiteData.tagline}</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-8">
                {websiteData.navigationItems.map(renderNavigationItem)}
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section 
          className="text-white py-20"
          style={{ 
            background: `linear-gradient(to right, ${websiteData.primaryColor}, ${websiteData.secondaryColor})` 
          }}
        >
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6">
              {websiteData.heroTitle}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {websiteData.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Apply Now
              </Button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{websiteData.aboutTitle}</h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                {websiteData.aboutContent}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">10,000+ Students</h4>
                <p className="text-slate-600">Diverse student body from across the globe</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Top Rankings</h4>
                <p className="text-slate-600">Consistently ranked among top universities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ExternalLink className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">95% Placement</h4>
                <p className="text-slate-600">Excellent career opportunities for graduates</p>
              </div>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Academic Programs</h3>
              <p className="text-lg text-slate-600">
                Explore our comprehensive range of undergraduate and graduate programs
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">{course.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Duration:</span>
                      <span className="font-medium">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Seats:</span>
                      <span className="font-medium">{course.seats}</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Our Faculty</h3>
              <p className="text-lg text-slate-600">
                Learn from industry experts and renowned academics
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {facultyMembers.map((faculty, index) => (
                <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src={faculty.image} 
                    alt={faculty.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">{faculty.name}</h4>
                  <p className="text-slate-600">{faculty.position}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Latest News</h3>
              <p className="text-lg text-slate-600">
                Stay updated with the latest happenings at our university
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {websiteData.newsItems.map((article, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-2 mb-3">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-500">{article.date}</span>
                    <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">{article.category}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">{article.title}</h4>
                  <p className="text-sm text-slate-600 mb-3">{article.content}</p>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{websiteData.footerData.contactInfo.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{websiteData.footerData.contactInfo.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{websiteData.footerData.contactInfo.email}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  {websiteData.footerData.quickLinks.map((link, index) => (
                    <li key={index}>
                      <a href={link.href} className="hover:text-blue-400">{link.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Departments</h4>
                <ul className="space-y-2 text-sm">
                  {websiteData.footerData.departments.map((dept, index) => (
                    <li key={index}>
                      <a href={dept.href} className="hover:text-blue-400">{dept.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {websiteData.footerData.socialMedia.map((social, index) => (
                    <a key={index} href={social.url} className="hover:text-blue-400">
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
              <p>&copy; 2025 {websiteData.collegeName}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default WebsitePreview;
