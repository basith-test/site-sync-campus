
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Eye, Save, Settings, Palette, Type, Image, Layout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EditableSection from "@/components/EditableSection";
import ColorPicker from "@/components/ColorPicker";

const WebsiteEditor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");
  const [websiteData, setWebsiteData] = useState({
    collegeName: "Springfield University",
    tagline: "Excellence in Education",
    heroTitle: "Shaping Tomorrow's Leaders",
    heroSubtitle: "Join Springfield University, where innovation meets excellence. Our world-class faculty and cutting-edge facilities prepare students for successful careers.",
    aboutTitle: "About Springfield University",
    aboutContent: "Established in 1985, Springfield University has been at the forefront of educational excellence, fostering innovation, research, and character development for over three decades.",
    primaryColor: "#2563eb",
    secondaryColor: "#10b981",
  });

  const tabs = [
    { id: "content", label: "Content", icon: Type },
    { id: "design", label: "Design", icon: Palette },
    { id: "layout", label: "Layout", icon: Layout },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleSave = () => {
    console.log("Saving website data:", websiteData);
    // Here would be the save logic
  };

  const updateWebsiteData = (field: string, value: string) => {
    setWebsiteData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar - Editor Panel */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => navigate("/preview")}
              >
                <Eye className="w-4 h-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="grid grid-cols-4 gap-1 bg-slate-100 p-1 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center p-2 rounded text-xs font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "content" && (
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
                </CardContent>
              </Card>

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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About Section</CardTitle>
                  <CardDescription>College information</CardDescription>
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
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "design" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Color Scheme</CardTitle>
                  <CardDescription>Customize your website colors</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ColorPicker
                    label="Primary Color"
                    value={websiteData.primaryColor}
                    onChange={(color) => updateWebsiteData("primaryColor", color)}
                  />
                  <ColorPicker
                    label="Secondary Color"
                    value={websiteData.secondaryColor}
                    onChange={(color) => updateWebsiteData("secondaryColor", color)}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Typography</CardTitle>
                  <CardDescription>Font settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500">Typography customization coming soon</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "layout" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Section Layout</CardTitle>
                  <CardDescription>Arrange your website sections</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500">Drag & drop layout editor coming soon</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SEO Settings</CardTitle>
                  <CardDescription>Search engine optimization</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-500">SEO settings coming soon</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Right Main Area - Live Preview */}
      <div className="flex-1 bg-white">
        <div className="h-full overflow-y-auto">
          <EditableSection 
            data={websiteData}
            onUpdate={updateWebsiteData}
          />
        </div>
      </div>
    </div>
  );
};

export default WebsiteEditor;
