import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ColorPicker from "./ColorPicker";
import NavigationEditor from "./NavigationEditor";
import { Upload } from "lucide-react";
import { WebsiteData } from "@/services/websiteDataService";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  type: 'internal' | 'external' | 'dropdown';
  children?: NavigationItem[];
}

interface EditorSidebarProps {
  editingSection: string | null;
  websiteData: WebsiteData;
  updateWebsiteData: (field: string, value: any) => void;
}

const EditorSidebar = ({ editingSection, websiteData, updateWebsiteData }: EditorSidebarProps) => {
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
      <div className="flex items-center justify-center h-full text-slate-500">
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
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Header Settings</CardTitle>
                <CardDescription>Configure your website header</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="collegeName">College Name</Label>
                  <Input
                    id="collegeName"
                    value={websiteData.collegeName}
                    onChange={(e) => updateWebsiteData("collegeName", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="tagline">Tagline</Label>
                  <Input
                    id="tagline"
                    value={websiteData.tagline}
                    onChange={(e) => updateWebsiteData("tagline", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="logo">College Logo</Label>
                  <div className="flex items-center space-x-2">
                    <img 
                      src={websiteData.logoUrl} 
                      alt="Logo preview" 
                      className="w-12 h-12 rounded object-cover border"
                    />
                    <div className="flex-1">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() => document.getElementById('logo')?.click()}
                        className="w-full"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New Logo
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation Menu</CardTitle>
                <CardDescription>Manage your website navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <NavigationEditor
                  items={websiteData.navigationItems}
                  onUpdate={(items) => updateWebsiteData("navigationItems", items)}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Hero Section</CardTitle>
                <CardDescription>Main banner content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="heroTitle">Hero Title</Label>
                  <Input
                    id="heroTitle"
                    value={websiteData.heroTitle}
                    onChange={(e) => updateWebsiteData("heroTitle", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                  <Textarea
                    id="heroSubtitle"
                    value={websiteData.heroSubtitle}
                    onChange={(e) => updateWebsiteData("heroSubtitle", e.target.value)}
                    rows={3}
                  />
                </div>
                <ColorPicker
                  label="Background Color"
                  value={websiteData.primaryColor}
                  onChange={(color) => updateWebsiteData("primaryColor", color)}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About Section</CardTitle>
                <CardDescription>College information and content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="aboutTitle">About Title</Label>
                  <Input
                    id="aboutTitle"
                    value={websiteData.aboutTitle}
                    onChange={(e) => updateWebsiteData("aboutTitle", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="aboutContent">About Content</Label>
                  <Textarea
                    id="aboutContent"
                    value={websiteData.aboutContent}
                    onChange={(e) => updateWebsiteData("aboutContent", e.target.value)}
                    rows={6}
                  />
                </div>
                <ColorPicker
                  label="Section Background Color"
                  value="#f8fafc"
                  onChange={(color) => console.log("About background color:", color)}
                />
              </CardContent>
            </Card>
          </div>
        );

      case "news":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">News Section</CardTitle>
                <CardDescription>Manage news articles and announcements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {websiteData.newsItems.map((item, index) => (
                    <div key={item.id} className="border rounded p-3">
                      <div className="space-y-2">
                        <div>
                          <Label htmlFor={`news-title-${index}`}>Title</Label>
                          <Input
                            id={`news-title-${index}`}
                            value={item.title}
                            onChange={(e) => {
                              const updated = [...websiteData.newsItems];
                              updated[index] = { ...item, title: e.target.value };
                              updateWebsiteData("newsItems", updated);
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`news-content-${index}`}>Content</Label>
                          <Textarea
                            id={`news-content-${index}`}
                            value={item.content}
                            onChange={(e) => {
                              const updated = [...websiteData.newsItems];
                              updated[index] = { ...item, content: e.target.value };
                              updateWebsiteData("newsItems", updated);
                            }}
                            rows={2}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label htmlFor={`news-date-${index}`}>Date</Label>
                            <Input
                              id={`news-date-${index}`}
                              value={item.date}
                              onChange={(e) => {
                                const updated = [...websiteData.newsItems];
                                updated[index] = { ...item, date: e.target.value };
                                updateWebsiteData("newsItems", updated);
                              }}
                            />
                          </div>
                          <div>
                            <Label htmlFor={`news-category-${index}`}>Category</Label>
                            <Input
                              id={`news-category-${index}`}
                              value={item.category}
                              onChange={(e) => {
                                const updated = [...websiteData.newsItems];
                                updated[index] = { ...item, category: e.target.value };
                                updateWebsiteData("newsItems", updated);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
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
                  className="w-full"
                >
                  Add News Item
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case "footer":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Footer Section</CardTitle>
                <CardDescription>Footer content and social media links</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Contact Information</Label>
                  <div className="space-y-2 mt-2">
                    <Input
                      placeholder="Address"
                      value={websiteData.footerData.contactInfo.address}
                      onChange={(e) => updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        contactInfo: { ...websiteData.footerData.contactInfo, address: e.target.value }
                      })}
                    />
                    <Input
                      placeholder="Phone"
                      value={websiteData.footerData.contactInfo.phone}
                      onChange={(e) => updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        contactInfo: { ...websiteData.footerData.contactInfo, phone: e.target.value }
                      })}
                    />
                    <Input
                      placeholder="Email"
                      value={websiteData.footerData.contactInfo.email}
                      onChange={(e) => updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        contactInfo: { ...websiteData.footerData.contactInfo, email: e.target.value }
                      })}
                    />
                  </div>
                </div>
                
                <div>
                  <Label>Social Media Links</Label>
                  <div className="space-y-2 mt-2">
                    {websiteData.footerData.socialMedia.map((social, index) => (
                      <div key={index} className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Platform"
                          value={social.platform}
                          onChange={(e) => {
                            const updated = [...websiteData.footerData.socialMedia];
                            updated[index] = { ...social, platform: e.target.value };
                            updateWebsiteData("footerData", {
                              ...websiteData.footerData,
                              socialMedia: updated
                            });
                          }}
                        />
                        <Input
                          placeholder="URL"
                          value={social.url}
                          onChange={(e) => {
                            const updated = [...websiteData.footerData.socialMedia];
                            updated[index] = { ...social, url: e.target.value };
                            updateWebsiteData("footerData", {
                              ...websiteData.footerData,
                              socialMedia: updated
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newSocial = { platform: "New Platform", url: "#", icon: "link" };
                      updateWebsiteData("footerData", {
                        ...websiteData.footerData,
                        socialMedia: [...websiteData.footerData.socialMedia, newSocial]
                      });
                    }}
                    className="mt-2"
                  >
                    Add Social Media
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-500">
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
