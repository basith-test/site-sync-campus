import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Phone, Mail, MapPin, Calendar, Users, Award, ExternalLink } from "lucide-react";
import { WebsiteData } from "@/services/websiteDataService";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  type: 'internal' | 'external' | 'dropdown';
  children?: NavigationItem[];
}

interface EditableSectionProps {
  data: WebsiteData;
  onUpdate: (field: string, value: any) => void;
  onEditSection: (sectionId: string) => void;
  editingSection: string | null;
}

const EditableSection = ({ data, onUpdate, onEditSection, editingSection }: EditableSectionProps) => {
  const [hoveredElement, setHoveredElement] = useState<string | null>(null);

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

  const EditableElement = ({ 
    id, 
    children, 
    className = "",
    style,
    ...props 
  }: { 
    id: string; 
    children: React.ReactNode; 
    className?: string;
    style?: React.CSSProperties;
  }) => (
    <div
      className={`relative group ${className}`}
      style={style}
      onMouseEnter={() => setHoveredElement(id)}
      onMouseLeave={() => setHoveredElement(null)}
      {...props}
    >
      {children}
      {hoveredElement === id && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button 
            size="sm" 
            variant="secondary" 
            className="h-6 px-2"
            onClick={() => onEditSection(id)}
          >
            <Edit className="w-3 h-3" />
          </Button>
        </div>
      )}
      {editingSection === id && (
        <div className="absolute inset-0 ring-2 ring-blue-500 ring-opacity-50 pointer-events-none"></div>
      )}
    </div>
  );

  return (
    <div className="bg-white">
      {/* Header */}
      <EditableElement id="header" className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={data.logoUrl} 
                alt="College Logo" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h1 
                  className="text-xl font-bold"
                  style={{ color: data.primaryColor }}
                >
                  {data.collegeName}
                </h1>
                <p className="text-sm text-slate-600">{data.tagline}</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              {data.navigationItems.map((item) => (
                <div key={item.id} className="relative group">
                  <a 
                    href={item.href} 
                    className="text-slate-700 hover:text-blue-600 font-medium flex items-center"
                    target={item.type === 'external' ? '_blank' : undefined}
                    rel={item.type === 'external' ? 'noopener noreferrer' : undefined}
                  >
                    {item.label}
                    {item.type === 'dropdown' && item.children && (
                      <span className="ml-1 text-xs">▼</span>
                    )}
                  </a>
                  {item.type === 'dropdown' && item.children && (
                    <div className="absolute top-full left-0 bg-white shadow-lg border rounded-md py-2 min-w-48 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                      {item.children.map((child) => (
                        <a
                          key={child.id}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                          target={child.type === 'external' ? '_blank' : undefined}
                          rel={child.type === 'external' ? 'noopener noreferrer' : undefined}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </EditableElement>

      {/* Hero Section */}
      <EditableElement 
        id="hero" 
        className="text-white py-20"
        style={{ 
          background: `linear-gradient(to right, ${data.primaryColor}, ${data.primaryColor}dd)` 
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">
            {data.heroTitle}
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {data.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Apply Now
            </Button>
          </div>
        </div>
      </EditableElement>

      {/* About Section */}
      <EditableElement id="about" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">{data.aboutTitle}</h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {data.aboutContent}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${data.primaryColor}20` }}
              >
                <Users className="w-8 h-8" style={{ color: data.primaryColor }} />
              </div>
              <h4 className="text-xl font-semibold mb-2">10,000+ Students</h4>
              <p className="text-slate-600">Diverse student body from across the globe</p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${data.secondaryColor}20` }}
              >
                <Award className="w-8 h-8" style={{ color: data.secondaryColor }} />
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
      </EditableElement>

      {/* Courses Section */}
      <EditableElement id="courses" className="py-16">
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
                <Button 
                  className="w-full mt-4" 
                  variant="outline"
                  style={{ borderColor: data.primaryColor, color: data.primaryColor }}
                >
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </EditableElement>

      {/* Faculty Section */}
      <EditableElement id="faculty" className="py-16 bg-slate-50">
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
      </EditableElement>

      {/* News Section */}
      <EditableElement id="news" className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Latest News</h3>
            <p className="text-lg text-slate-600">
              Stay updated with the latest happenings at our university
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.newsItems.map((article, index) => (
              <div key={article.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-500">{article.date}</span>
                  <span 
                    className="text-sm px-2 py-1 rounded text-white"
                    style={{ backgroundColor: data.primaryColor }}
                  >
                    {article.category}
                  </span>
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
      </EditableElement>

      {/* Footer */}
      <EditableElement id="footer" className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{data.footerData.contactInfo.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{data.footerData.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{data.footerData.contactInfo.email}</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {data.footerData.quickLinks.map((link, index) => (
                  <li key={index}><a href={link.href} className="hover:text-blue-400">{link.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Departments</h4>
              <ul className="space-y-2 text-sm">
                {data.footerData.departments.map((dept, index) => (
                  <li key={index}><a href={dept.href} className="hover:text-blue-400">{dept.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {data.footerData.socialMedia.map((social, index) => (
                  <a key={index} href={social.url} className="hover:text-blue-400">{social.platform}</a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 {data.collegeName}. All rights reserved.</p>
          </div>
        </div>
      </EditableElement>
    </div>
  );
};

export default EditableSection;
