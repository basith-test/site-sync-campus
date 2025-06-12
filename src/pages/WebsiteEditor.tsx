import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Save, Settings, Palette, Type, Layout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditableSection from "@/components/EditableSection";
import EditorSidebar from "@/components/EditorSidebar";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  type: 'internal' | 'external' | 'dropdown';
  children?: NavigationItem[];
}

const WebsiteEditor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [websiteData, setWebsiteData] = useState({
    collegeName: "Springfield University",
    tagline: "Excellence in Education",
    heroTitle: "Shaping Tomorrow's Leaders",
    heroSubtitle: "Join Springfield University, where innovation meets excellence. Our world-class faculty and cutting-edge facilities prepare students for successful careers.",
    aboutTitle: "About Springfield University",
    aboutContent: "Established in 1985, Springfield University has been at the forefront of educational excellence, fostering innovation, research, and character development for over three decades.",
    primaryColor: "#2563eb",
    secondaryColor: "#10b981",
    navigationItems: [
      { id: 'home', label: 'Home', href: '#', type: 'internal' as const },
      { id: 'departments', label: 'Departments', href: '#', type: 'dropdown' as const },
      { id: 'admissions', label: 'Admissions', href: '#', type: 'internal' as const },
      { id: 'about', label: 'About', href: '#', type: 'internal' as const },
      { id: 'contact', label: 'Contact', href: '#', type: 'internal' as const },
    ] as NavigationItem[],
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

  const updateWebsiteData = (field: string, value: string | NavigationItem[]) => {
    setWebsiteData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSection = (sectionId: string) => {
    setEditingSection(sectionId);
    setActiveTab("content"); // Switch to content tab when editing
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left Sidebar - Editor Panel */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex-shrink-0">
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

        {/* Editor Content with Scroll */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <div className="p-4">
              {activeTab === "content" && (
                <EditorSidebar
                  editingSection={editingSection}
                  websiteData={websiteData}
                  updateWebsiteData={updateWebsiteData}
                />
              )}

              {activeTab === "design" && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <p className="text-slate-500">Global design settings coming soon</p>
                  </div>
                </div>
              )}

              {activeTab === "layout" && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <p className="text-slate-500">Drag & drop layout editor coming soon</p>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <div className="text-center py-8">
                    <p className="text-slate-500">Website settings coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Right Main Area - Live Preview with Scroll */}
      <div className="flex-1 bg-white min-w-0">
        <ScrollArea className="h-screen">
          <EditableSection 
            data={websiteData}
            onUpdate={updateWebsiteData}
            onEditSection={handleEditSection}
            editingSection={editingSection}
          />
        </ScrollArea>
      </div>
    </div>
  );
};

export default WebsiteEditor;
