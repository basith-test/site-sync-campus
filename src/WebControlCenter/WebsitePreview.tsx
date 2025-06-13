
import React, { useState, useEffect, useContext } from 'react';
import { NecttosContext } from '../context/NecttosContext';
import { websiteDataService, WebsiteData } from './services/websiteDataService';

const WebsitePreview: React.FC = () => {
  const { college } = useContext(NecttosContext);
  const [websiteData, setWebsiteData] = useState<WebsiteData>(websiteDataService.load());

  useEffect(() => {
    // Load the latest data when component mounts
    const loadedData = websiteDataService.load();
    setWebsiteData(loadedData);
  }, []);

  const renderNavigationItem = (item: any) => {
    if (item.type === 'dropdown' && item.children && item.children.length > 0) {
      return (
        <div key={item.id} className="relative group">
          <button className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center space-x-1">
            <span>{item.label}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg rounded-md py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            {item.children.map((child: any) => (
              <a
                key={child.id}
                href={child.href}
                className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
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
      <header className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={websiteData.logoUrl} 
                alt={`${websiteData.collegeName} Logo`} 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-blue-900 dark:text-blue-400">{websiteData.collegeName}</h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">{websiteData.tagline}</p>
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
            <button className="bg-white text-blue-600 hover:bg-slate-100 px-6 py-3 rounded-lg font-semibold transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{websiteData.aboutTitle}</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {websiteData.aboutContent}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
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
      </section>

      {/* News Section */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Latest News</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Stay updated with the latest happenings at our university
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {websiteData.newsItems.map((article, index) => (
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
      </section>

      {/* Footer Section */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span>📍</span>
                  <span className="text-sm">{websiteData.footerData.contactInfo.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>📞</span>
                  <span className="text-sm">{websiteData.footerData.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✉️</span>
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
  );
};

export default WebsitePreview;
