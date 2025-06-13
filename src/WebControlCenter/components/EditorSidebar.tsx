
import React from 'react';
import Input from '../../NecttosComp/Input/Input';
import Button from '../../NecttosComp/Button/Button';
import { WebsiteData } from '../services/websiteDataService';

interface EditorSidebarProps {
  editingSection: string | null;
  websiteData: WebsiteData;
  updateWebsiteData: (field: string, value: any) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ editingSection, websiteData, updateWebsiteData }) => {
  if (!editingSection) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">Select a section to edit</p>
          <p className="text-sm">Click on any section of the website to start editing</p>
        </div>
      </div>
    );
  }

  const renderEditingContent = () => {
    switch (editingSection) {
      case "header":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Header Settings</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Configure your website header</p>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="College Name"
                  state={websiteData}
                  returnKey="collegeName"
                  setState={(newState) => updateWebsiteData("collegeName", newState.collegeName)}
                  width="100%"
                />
                
                <Input
                  type="text"
                  fieldName="Tagline"
                  state={websiteData}
                  returnKey="tagline"
                  setState={(newState) => updateWebsiteData("tagline", newState.tagline)}
                  width="100%"
                />

                <div className="border-t border-slate-200 dark:border-slate-600 pt-4">
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    College Logo
                  </label>
                  <div className="flex items-center space-x-3 mb-3">
                    <img 
                      src={websiteData.logoUrl} 
                      alt="Logo preview" 
                      className="w-12 h-12 rounded object-cover border border-slate-300 dark:border-slate-600"
                    />
                    <div className="flex-1">
                      <Input
                        type="file"
                        fieldName="Upload New Logo"
                        onChange={(e) => updateWebsiteData("logoUrl", e.value)}
                        width="100%"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Hero Section</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Main banner content</p>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="Hero Title"
                  state={websiteData}
                  returnKey="heroTitle"
                  setState={(newState) => updateWebsiteData("heroTitle", newState.heroTitle)}
                  width="100%"
                />
                
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Hero Subtitle
                  </label>
                  <textarea
                    value={websiteData.heroSubtitle}
                    onChange={(e) => updateWebsiteData("heroSubtitle", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={websiteData.primaryColor}
                    onChange={(e) => updateWebsiteData("primaryColor", e.target.value)}
                    className="w-full h-10 border border-slate-300 dark:border-slate-600 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">About Section</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">College information and content</p>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="About Title"
                  state={websiteData}
                  returnKey="aboutTitle"
                  setState={(newState) => updateWebsiteData("aboutTitle", newState.aboutTitle)}
                  width="100%"
                />
                
                <div>
                  <label className="block text-sm font-medium text-slate-900 dark:text-white mb-2">
                    About Content
                  </label>
                  <textarea
                    value={websiteData.aboutContent}
                    onChange={(e) => updateWebsiteData("aboutContent", e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "news":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">News Section</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Manage news articles and announcements</p>
              
              <div className="space-y-4">
                {websiteData.newsItems.map((item, index) => (
                  <div key={item.id} className="border border-slate-200 dark:border-slate-600 rounded p-3">
                    <div className="space-y-2">
                      <Input
                        type="text"
                        fieldName="Title"
                        state={{ title: item.title }}
                        returnKey="title"
                        setState={(newState) => {
                          const updated = [...websiteData.newsItems];
                          updated[index] = { ...item, title: newState.title };
                          updateWebsiteData("newsItems", updated);
                        }}
                        width="100%"
                      />
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-900 dark:text-white mb-1">
                          Content
                        </label>
                        <textarea
                          value={item.content}
                          onChange={(e) => {
                            const updated = [...websiteData.newsItems];
                            updated[index] = { ...item, content: e.target.value };
                            updateWebsiteData("newsItems", updated);
                          }}
                          rows={2}
                          className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-sm"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="text"
                          fieldName="Date"
                          state={{ date: item.date }}
                          returnKey="date"
                          setState={(newState) => {
                            const updated = [...websiteData.newsItems];
                            updated[index] = { ...item, date: newState.date };
                            updateWebsiteData("newsItems", updated);
                          }}
                          width="100%"
                        />
                        
                        <Input
                          type="text"
                          fieldName="Category"
                          state={{ category: item.category }}
                          returnKey="category"
                          setState={(newState) => {
                            const updated = [...websiteData.newsItems];
                            updated[index] = { ...item, category: newState.category };
                            updateWebsiteData("newsItems", updated);
                          }}
                          width="100%"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button
                  type="save"
                  onClick={() => {
                    const newItem = {
                      id: `news-${Date.now()}`,
                      title: "New Article",
                      content: "Article content...",
                      date: new Date().toLocaleDateString(),
                      category: "News"
                    };
                    updateWebsiteData("newsItems", [...websiteData.newsItems, newItem]);
                  }}
                  width="100%"
                >
                  ➕ Add News Item
                </Button>
              </div>
            </div>
          </div>
        );

      case "footer":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-white">Footer Section</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">Footer content and social media links</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      fieldName="Address"
                      state={{ address: websiteData.footerData.contactInfo.address }}
                      returnKey="address"
                      setState={(newState) => updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        contactInfo: { ...websiteData.footerData.contactInfo, address: newState.address }
                      })}
                      width="100%"
                    />
                    
                    <Input
                      type="text"
                      fieldName="Phone"
                      state={{ phone: websiteData.footerData.contactInfo.phone }}
                      returnKey="phone"
                      setState={(newState) => updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        contactInfo: { ...websiteData.footerData.contactInfo, phone: newState.phone }
                      })}
                      width="100%"
                    />
                    
                    <Input
                      type="email"
                      fieldName="Email"
                      state={{ email: websiteData.footerData.contactInfo.email }}
                      returnKey="email"
                      setState={(newState) => updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        contactInfo: { ...websiteData.footerData.contactInfo, email: newState.email }
                      })}
                      width="100%"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Social Media Links</h4>
                  <div className="space-y-2">
                    {websiteData.footerData.socialMedia.map((social, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          type="text"
                          fieldName="Platform"
                          state={{ platform: social.platform }}
                          returnKey="platform"
                          setState={(newState) => {
                            const updated = [...websiteData.footerData.socialMedia];
                            updated[index] = { ...social, platform: newState.platform };
                            updateWebsiteData("footerData", {
                              ...websiteData.footerData,
                              socialMedia: updated
                            });
                          }}
                          width="100%"
                        />
                        
                        <Input
                          type="text"
                          fieldName="URL"
                          state={{ url: social.url }}
                          returnKey="url"
                          setState={(newState) => {
                            const updated = [...websiteData.footerData.socialMedia];
                            updated[index] = { ...social, url: newState.url };
                            updateWebsiteData("footerData", {
                              ...websiteData.footerData,
                              socialMedia: updated
                            });
                          }}
                          width="100%"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    type="save"
                    onClick={() => {
                      const newSocial = { platform: "New Platform", url: "#", icon: "link" };
                      updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        socialMedia: [...websiteData.footerData.socialMedia, newSocial]
                      });
                    }}
                    width="100%"
                  >
                    ➕ Add Social Media
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-500 dark:text-slate-400">
            <p>Section editing options coming soon</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full">
      {renderEditingContent()}
    </div>
  );
};

export default EditorSidebar;
