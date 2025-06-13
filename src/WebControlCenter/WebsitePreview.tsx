
import React, { useEffect, useState, useContext } from "react";
import { NecttosContext } from "../context/NecttosContext";
import { websiteDataService, WebsiteData } from "./services/websiteDataService";

const WebsitePreview: React.FC = () => {
  const { college } = useContext(NecttosContext);
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

  return (
    <div className="min-h-screen bg-white">
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
                {websiteData.navigationItems.map((item) => (
                  <a key={item.id} href={item.href} className="text-slate-700 hover:text-blue-600 font-medium">
                    {item.label}
                  </a>
                ))}
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
          </div>
        </section>

        {/* News Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Latest News</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {websiteData.newsItems.map((article) => (
                <div key={article.id} className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-slate-500">{article.date}</span>
                    <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">{article.category}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">{article.title}</h4>
                  <p className="text-sm text-slate-600 mb-3">{article.content}</p>
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
                  <p className="text-sm">{websiteData.footerData.contactInfo.address}</p>
                  <p className="text-sm">{websiteData.footerData.contactInfo.phone}</p>
                  <p className="text-sm">{websiteData.footerData.contactInfo.email}</p>
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
