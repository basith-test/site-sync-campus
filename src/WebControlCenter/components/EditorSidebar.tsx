
import React from 'react';
import Button from './Button';
import Input from './Input';
import NavigationEditor from './NavigationEditor';
import { WebsiteData } from '../services/websiteDataService';

interface EditorSidebarProps {
  editingSection: string | null;
  websiteData: WebsiteData;
  updateWebsiteData: (field: string, value: any) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({ editingSection, websiteData, updateWebsiteData }) => {
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateWebsiteData("logoUrl", result);
      };
      reader.readAsDataURL(file);
    }
  };

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
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Header Settings</h3>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="College Name"
                  state={websiteData.collegeName}
                  setState={(value) => updateWebsiteData("collegeName", value)}
                  width="100%"
                />
                
                <Input
                  type="text"
                  fieldName="Tagline"
                  state={websiteData.tagline}
                  setState={(value) => updateWebsiteData("tagline", value)}
                  width="100%"
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">College Logo</label>
                  <div className="flex items-center space-x-4">
                    <img 
                      src={websiteData.logoUrl} 
                      alt="Logo preview" 
                      className="w-16 h-16 rounded object-cover border dark:border-slate-600"
                    />
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button
                        type="save"
                        onClick={() => document.getElementById('logo-upload')?.click()}
                      >
                        📷 Upload New Logo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Navigation Menu</h3>
              <NavigationEditor
                items={websiteData.navigationItems}
                onUpdate={(items) => updateWebsiteData("navigationItems", items)}
              />
            </div>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Hero Section</h3>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="Hero Title"
                  state={websiteData.heroTitle}
                  setState={(value) => updateWebsiteData("heroTitle", value)}
                  width="100%"
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Hero Subtitle</label>
                  <textarea
                    value={websiteData.heroSubtitle}
                    onChange={(e) => updateWebsiteData("heroSubtitle", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white dark:border-slate-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Primary Color</label>
                  <input
                    type="color"
                    value={websiteData.primaryColor}
                    onChange={(e) => updateWebsiteData("primaryColor", e.target.value)}
                    className="w-full h-10 border rounded dark:border-slate-600"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Secondary Color</label>
                  <input
                    type="color"
                    value={websiteData.secondaryColor}
                    onChange={(e) => updateWebsiteData("secondaryColor", e.target.value)}
                    className="w-full h-10 border rounded dark:border-slate-600"
                  />
                </div>
                
                <Input
                  type="text"
                  fieldName="CTA Button Text"
                  state={websiteData.ctaButtonText || "Apply Now"}
                  setState={(value) => updateWebsiteData("ctaButtonText", value)}
                  width="100%"
                />
                
                <Input
                  type="text"
                  fieldName="CTA Button Link"
                  state={websiteData.ctaButtonLink || "#"}
                  setState={(value) => updateWebsiteData("ctaButtonLink", value)}
                  width="100%"
                />
              </div>
            </div>
          </div>
        );

      case "academics":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Academics Section</h3>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="Section Title"
                  state={websiteData.academicsTitle || "Academic Programs"}
                  setState={(value) => updateWebsiteData("academicsTitle", value)}
                  width="100%"
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Section Description</label>
                  <textarea
                    value={websiteData.academicsDescription || "Explore our comprehensive range of undergraduate and graduate programs"}
                    onChange={(e) => updateWebsiteData("academicsDescription", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white dark:border-slate-600"
                  />
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium dark:text-white">Departments/Programs</h4>
                  {(websiteData.departments || []).map((dept: any, index: number) => (
                    <div key={index} className="border rounded p-3 dark:border-slate-600">
                      <div className="space-y-2">
                        <Input
                          type="text"
                          fieldName="Department Name"
                          state={dept.name}
                          setState={(value) => {
                            const updated = [...(websiteData.departments || [])];
                            updated[index] = { ...dept, name: value };
                            updateWebsiteData("departments", updated);
                          }}
                          width="100%"
                        />
                        
                        <Input
                          type="text"
                          fieldName="Duration"
                          state={dept.duration}
                          setState={(value) => {
                            const updated = [...(websiteData.departments || [])];
                            updated[index] = { ...dept, duration: value };
                            updateWebsiteData("departments", updated);
                          }}
                          width="100%"
                        />
                        
                        <Input
                          type="text"
                          fieldName="Seats Available"
                          state={dept.seats}
                          setState={(value) => {
                            const updated = [...(websiteData.departments || [])];
                            updated[index] = { ...dept, seats: value };
                            updateWebsiteData("departments", updated);
                          }}
                          width="100%"
                        />
                        
                        <Input
                          type="text"
                          fieldName="Learn More Link"
                          state={dept.link || "#"}
                          setState={(value) => {
                            const updated = [...(websiteData.departments || [])];
                            updated[index] = { ...dept, link: value };
                            updateWebsiteData("departments", updated);
                          }}
                          width="100%"
                        />
                        
                        <Button
                          type="delete"
                          onClick={() => {
                            const updated = [...(websiteData.departments || [])];
                            updated.splice(index, 1);
                            updateWebsiteData("departments", updated);
                          }}
                        >
                          Remove Department
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <Button
                    type="save"
                    onClick={() => {
                      const newDept = {
                        id: `dept-${Date.now()}`,
                        name: "New Department",
                        duration: "4 Years",
                        seats: "60",
                        link: "#"
                      };
                      updateWebsiteData("departments", [...(websiteData.departments || []), newDept]);
                    }}
                  >
                    Add Department
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "professional-bodies":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Professional Bodies</h3>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="Section Title"
                  state={websiteData.professionalBodiesTitle || "Professional Bodies"}
                  setState={(value) => updateWebsiteData("professionalBodiesTitle", value)}
                  width="100%"
                />
                
                <div className="space-y-4">
                  <h4 className="font-medium dark:text-white">Professional Body Tiles</h4>
                  {(websiteData.professionalBodies || []).map((body: any, index: number) => (
                    <div key={index} className="border rounded p-3 dark:border-slate-600">
                      <div className="space-y-2">
                        <Input
                          type="text"
                          fieldName="Organization Name"
                          state={body.name}
                          setState={(value) => {
                            const updated = [...(websiteData.professionalBodies || [])];
                            updated[index] = { ...body, name: value };
                            updateWebsiteData("professionalBodies", updated);
                          }}
                          width="100%"
                        />
                        
                        <div>
                          <label className="block text-sm font-medium mb-2 dark:text-white">Description</label>
                          <textarea
                            value={body.description}
                            onChange={(e) => {
                              const updated = [...(websiteData.professionalBodies || [])];
                              updated[index] = { ...body, description: e.target.value };
                              updateWebsiteData("professionalBodies", updated);
                            }}
                            rows={2}
                            className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white dark:border-slate-600"
                          />
                        </div>
                        
                        <Input
                          type="text"
                          fieldName="Website URL"
                          state={body.website}
                          setState={(value) => {
                            const updated = [...(websiteData.professionalBodies || [])];
                            updated[index] = { ...body, website: value };
                            updateWebsiteData("professionalBodies", updated);
                          }}
                          width="100%"
                        />
                        
                        <div>
                          <label className="block text-sm font-medium mb-2 dark:text-white">Logo</label>
                          <div className="flex items-center space-x-4">
                            {body.logo && (
                              <img 
                                src={body.logo} 
                                alt="Logo" 
                                className="w-12 h-12 rounded object-cover border dark:border-slate-600"
                              />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    const updated = [...(websiteData.professionalBodies || [])];
                                    updated[index] = { ...body, logo: event.target?.result as string };
                                    updateWebsiteData("professionalBodies", updated);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="hidden"
                              id={`logo-upload-${index}`}
                            />
                            <Button
                              type="save"
                              onClick={() => document.getElementById(`logo-upload-${index}`)?.click()}
                            >
                              📷 Upload Logo
                            </Button>
                          </div>
                        </div>
                        
                        <Button
                          type="delete"
                          onClick={() => {
                            const updated = [...(websiteData.professionalBodies || [])];
                            updated.splice(index, 1);
                            updateWebsiteData("professionalBodies", updated);
                          }}
                        >
                          Remove Organization
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <h5 className="w-full font-medium dark:text-white">Quick Add Popular Bodies:</h5>
                    {['IEEE', 'IEDC', 'CSI', 'ACM', 'IEI', 'ISTE'].map(body => (
                      <Button
                        key={body}
                        type="edit"
                        onClick={() => {
                          const newBody = {
                            id: `body-${Date.now()}`,
                            name: body,
                            description: `${body} professional organization`,
                            website: "#",
                            logo: ""
                          };
                          updateWebsiteData("professionalBodies", [...(websiteData.professionalBodies || []), newBody]);
                        }}
                      >
                        + {body}
                      </Button>
                    ))}
                  </div>
                  
                  <Button
                    type="save"
                    onClick={() => {
                      const newBody = {
                        id: `body-${Date.now()}`,
                        name: "New Organization",
                        description: "Description here...",
                        website: "#",
                        logo: ""
                      };
                      updateWebsiteData("professionalBodies", [...(websiteData.professionalBodies || []), newBody]);
                    }}
                  >
                    Add Custom Organization
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">About Section</h3>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="About Title"
                  state={websiteData.aboutTitle}
                  setState={(value) => updateWebsiteData("aboutTitle", value)}
                  width="100%"
                />
                
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">About Content</label>
                  <textarea
                    value={websiteData.aboutContent}
                    onChange={(e) => updateWebsiteData("aboutContent", e.target.value)}
                    rows={6}
                    className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white dark:border-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case "news":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">News Section</h3>
              
              <div className="space-y-4">
                {websiteData.newsItems.map((item, index) => (
                  <div key={item.id} className="border rounded p-3 dark:border-slate-600">
                    <div className="space-y-2">
                      <Input
                        type="text"
                        fieldName="Title"
                        state={item.title}
                        setState={(value) => {
                          const updated = [...websiteData.newsItems];
                          updated[index] = { ...item, title: value };
                          updateWebsiteData("newsItems", updated);
                        }}
                        width="100%"
                      />
                      
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-white">Content</label>
                        <textarea
                          value={item.content}
                          onChange={(e) => {
                            const updated = [...websiteData.newsItems];
                            updated[index] = { ...item, content: e.target.value };
                            updateWebsiteData("newsItems", updated);
                          }}
                          rows={2}
                          className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white dark:border-slate-600"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="text"
                          fieldName="Date"
                          state={item.date}
                          setState={(value) => {
                            const updated = [...websiteData.newsItems];
                            updated[index] = { ...item, date: value };
                            updateWebsiteData("newsItems", updated);
                          }}
                          width="100%"
                        />
                        
                        <Input
                          type="text"
                          fieldName="Category"
                          state={item.category}
                          setState={(value) => {
                            const updated = [...websiteData.newsItems];
                            updated[index] = { ...item, category: value };
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
                >
                  Add News Item
                </Button>
              </div>
            </div>
          </div>
        );

      case "footer":
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border dark:border-slate-700">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Footer Section</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Contact Information</label>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      fieldName="Address"
                      state={websiteData.footerData.contactInfo.address}
                      setState={(value) => updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        contactInfo: { ...websiteData.footerData.contactInfo, address: value }
                      })}
                      width="100%"
                    />
                    
                    <Input
                      type="text"
                      fieldName="Phone"
                      state={websiteData.footerData.contactInfo.phone}
                      setState={(value) => updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        contactInfo: { ...websiteData.footerData.contactInfo, phone: value }
                      })}
                      width="100%"
                    />
                    
                    <Input
                      type="text"
                      fieldName="Email"
                      state={websiteData.footerData.contactInfo.email}
                      setState={(value) => updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        contactInfo: { ...websiteData.footerData.contactInfo, email: value }
                      })}
                      width="100%"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-white">Social Media Links</label>
                  <div className="space-y-2">
                    {websiteData.footerData.socialMedia.map((social, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          type="text"
                          fieldName="Platform"
                          state={social.platform}
                          setState={(value) => {
                            const updated = [...websiteData.footerData.socialMedia];
                            updated[index] = { ...social, platform: value };
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
                          state={social.url}
                          setState={(value) => {
                            const updated = [...websiteData.footerData.socialMedia];
                            updated[index] = { ...social, url: value };
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
                  >
                    Add Social Media
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
