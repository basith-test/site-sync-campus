import { Button } from "@/components/ui/button";
import { Edit, Phone, Mail, MapPin, Calendar, Users, Award, ExternalLink, ChevronDown } from "lucide-react";
import { WebsiteData, NavigationItem } from "@/services/websiteDataService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EditableSectionProps {
  data: WebsiteData;
  onUpdate: (field: string, value: any) => void;
  onEditSection: (sectionId: string) => void;
  editingSection: string | null;
}

const EditableSection = ({ data, onUpdate, onEditSection, editingSection }: EditableSectionProps) => {
  const renderNavigationItem = (item: NavigationItem) => {
    // Only show dropdown for items that actually have children
    if (item.type === 'dropdown' && item.children && item.children.length > 0) {
      return (
        <DropdownMenu key={item.id}>
          <DropdownMenuTrigger className="text-slate-700 hover:text-blue-600 font-medium flex items-center space-x-1 cursor-pointer">
            <span>{item.label}</span>
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white border shadow-lg z-50">
            {item.children.map((child) => (
              <DropdownMenuItem key={child.id} asChild>
                <a href={child.href} className="block px-4 py-2 hover:bg-slate-100 cursor-pointer">
                  {child.label}
                </a>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    // Regular navigation item (no dropdown)
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

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <section 
        className={`relative group ${editingSection === 'header' ? 'ring-2 ring-blue-500' : ''}`}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      >
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={data.logoUrl} 
                  alt={`${data.collegeName} Logo`} 
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold text-blue-900">{data.collegeName}</h1>
                  <p className="text-sm text-slate-600">{data.tagline}</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-8">
                {data.navigationItems.map(renderNavigationItem)}
              </nav>
            </div>
          </div>
        </header>
        
        {/* Edit Button */}
        <Button
          onClick={() => onEditSection('header')}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          size="sm"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit Header
        </Button>
      </section>

      {/* Hero Section */}
      <section 
        className={`relative group ${editingSection === 'hero' ? 'ring-2 ring-blue-500' : ''}`}
        style={{ 
          background: `linear-gradient(to right, ${data.primaryColor}, ${data.secondaryColor})` 
        }}
      >
        <div className="text-white py-20">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6">
              {data.heroTitle}
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              {data.heroSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
        
        {/* Edit Button */}
        <Button
          onClick={() => onEditSection('hero')}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          size="sm"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit Hero
        </Button>
      </section>

      {/* About Section */}
      <section className={`py-16 bg-slate-50 relative group ${editingSection === 'about' ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">{data.aboutTitle}</h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              {data.aboutContent}
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
        
        {/* Edit Button */}
        <Button
          onClick={() => onEditSection('about')}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          size="sm"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit About
        </Button>
      </section>

      {/* News Section */}
      <section className={`py-16 relative group ${editingSection === 'news' ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Latest News</h3>
            <p className="text-lg text-slate-600">
              Stay updated with the latest happenings at our university
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.newsItems.map((article, index) => (
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
        
        {/* Edit Button */}
        <Button
          onClick={() => onEditSection('news')}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          size="sm"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit News
        </Button>
      </section>

      {/* Footer Section */}
      <section className={`bg-slate-900 text-white py-12 relative group ${editingSection === 'footer' ? 'ring-2 ring-blue-500' : ''}`}>
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
                  <li key={index}>
                    <a href={link.href} className="hover:text-blue-400">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Departments</h4>
              <ul className="space-y-2 text-sm">
                {data.footerData.departments.map((dept, index) => (
                  <li key={index}>
                    <a href={dept.href} className="hover:text-blue-400">{dept.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {data.footerData.socialMedia.map((social, index) => (
                  <a key={index} href={social.url} className="hover:text-blue-400">
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2025 {data.collegeName}. All rights reserved.</p>
          </div>
        </div>
        
        {/* Edit Button */}
        <Button
          onClick={() => onEditSection('footer')}
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          size="sm"
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit Footer
        </Button>
      </section>
    </div>
  );
};

export default EditableSection;
