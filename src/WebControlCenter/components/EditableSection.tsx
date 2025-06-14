
import React from 'react';
import Button from '../../NecttosComp/Button/Button';
import { WebsiteData, NavigationItem } from '../services/websiteDataService';

interface EditableSectionProps {
  data: WebsiteData;
  onUpdate: (field: string, value: any) => void;
  onEditSection: (sectionId: string) => void;
  editingSection: string | null;
}

const EditableSection: React.FC<EditableSectionProps> = ({ data, onUpdate, onEditSection, editingSection }) => {
  const renderNavigationItem = (item: NavigationItem) => {
    if (item.type === 'dropdown' && item.children && item.children.length > 0) {
      return (
        <div key={item.id} className="relative group">
          <button className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center space-x-1 cursor-pointer">
            <span>{item.label}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]">
            {item.children.map((child) => (
              <a
                key={child.id}
                href={child.href}
                className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                {...(child.type === 'external' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {child.label}
              </a>
            ))}
          </div>
        </div>
      );
    }

    return (
      <a 
        key={item.id}
        href={item.href} 
        className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
        {...(item.type === 'external' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {item.label}
      </a>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 min-h-screen">
      {/* Header Section */}
      <section 
        className={`relative group ${editingSection === 'header' ? 'ring-2 ring-blue-500' : ''}`}
      >
        <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={data.logoUrl} 
                  alt={`${data.collegeName} Logo`} 
                  className="w-12 h-12 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop&crop=center';
                  }}
                />
                <div>
                  <h1 className="text-xl font-bold text-blue-900 dark:text-blue-400">{data.collegeName}</h1>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{data.tagline}</p>
                </div>
              </div>
              <nav className="hidden md:flex space-x-8">
                {data.navigationItems.map(renderNavigationItem)}
              </nav>
            </div>
          </div>
        </header>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            type="edit"
            onClick={() => onEditSection('header')}
          >
            ✏️ Edit Header
          </Button>
        </div>
      </section>

      {/* Hero Section */}
      <section 
        className={`relative group ${editingSection === 'hero' ? 'ring-2 ring-blue-500' : ''}`}
        style={{ 
          backgroundColor: data.primaryColor
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
              <a 
                href={data.ctaButtonLink || "#"}
                className="bg-white text-blue-600 hover:bg-slate-100 px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
                {...((data.ctaButtonLink && data.ctaButtonLink.startsWith('http')) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {data.ctaButtonText || "Apply Now"}
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            type="edit"
            onClick={() => onEditSection('hero')}
          >
            ✏️ Edit Hero
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className={`py-16 bg-slate-50 dark:bg-slate-800 relative group ${editingSection === 'about' ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{data.aboutTitle}</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {data.aboutContent}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Stats cards */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">10,000+ Students</h4>
              <p className="text-slate-600 dark:text-slate-400">Diverse student body from across the globe</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">Top Rankings</h4>
              <p className="text-slate-600 dark:text-slate-400">Consistently ranked among top universities</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 dark:text-white">95% Placement</h4>
              <p className="text-slate-600 dark:text-slate-400">Excellent career opportunities for graduates</p>
            </div>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            type="edit"
            onClick={() => onEditSection('about')}
          >
            ✏️ Edit About
          </Button>
        </div>
      </section>

      {/* Academics Section */}
      <section className={`py-16 bg-white dark:bg-slate-900 relative group ${editingSection === 'academics' ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {data.academicsTitle || "Academic Programs"}
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {data.academicsDescription || "Explore our comprehensive range of undergraduate and graduate programs"}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(data.departments || []).map((dept: any, index: number) => (
              <div key={index} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{dept.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Duration:</span>
                    <span className="font-medium dark:text-white">{dept.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Seats:</span>
                    <span className="font-medium dark:text-white">{dept.seats}</span>
                  </div>
                </div>
                <a 
                  href={dept.link || "#"}
                  className="w-full mt-4 inline-block text-center px-4 py-2 border border-slate-300 dark:border-slate-600 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  {...((dept.link && dept.link.startsWith('http')) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            type="edit"
            onClick={() => onEditSection('academics')}
          >
            ✏️ Edit Academics
          </Button>
        </div>
      </section>

      {/* Professional Bodies Section */}
      <section className={`py-16 bg-slate-50 dark:bg-slate-800 relative group ${editingSection === 'professional-bodies' ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {data.professionalBodiesTitle || "Professional Bodies"}
            </h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Our affiliations with leading professional organizations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data.professionalBodies || []).map((body: any, index: number) => (
              <div key={index} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  {body.logo && (
                    <img 
                      src={body.logo} 
                      alt={`${body.name} Logo`}
                      className="w-12 h-12 rounded object-contain"
                    />
                  )}
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white">{body.name}</h4>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{body.description}</p>
                {body.website && body.website !== "#" && (
                  <a 
                    href={body.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  >
                    Visit Website →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            type="edit"
            onClick={() => onEditSection('professional-bodies')}
          >
            ✏️ Edit Professional Bodies
          </Button>
        </div>
      </section>

      {/* News Section */}
      <section className={`py-16 bg-white dark:bg-slate-900 relative group ${editingSection === 'news' ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Latest News</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Stay updated with the latest happenings at our university
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.newsItems.map((article, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-slate-400">📅</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{article.date}</span>
                  <span className="text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">{article.category}</span>
                </div>
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{article.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{article.content}</p>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            type="edit"
            onClick={() => onEditSection('news')}
          >
            ✏️ Edit News
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <section className={`bg-slate-900 dark:bg-slate-950 text-white py-12 relative group ${editingSection === 'footer' ? 'ring-2 ring-blue-500' : ''}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span className="text-sm">{data.footerData.contactInfo.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span className="text-sm">{data.footerData.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✉️</span>
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
        
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Button
            type="edit"
            onClick={() => onEditSection('footer')}
          >
            ✏️ Edit Footer
          </Button>
        </div>
      </section>
    </div>
  );
};

export default EditableSection;
