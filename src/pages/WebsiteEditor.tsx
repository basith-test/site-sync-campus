
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, Save, Palette, Type, Layout } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import EditableSection from "@/components/EditableSection";
import EditorSidebar from "@/components/EditorSidebar";
import { websiteDataService, WebsiteData } from "@/services/websiteDataService";

const WebsiteEditor = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("content");
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [websiteData, setWebsiteData] = useState<WebsiteData>(websiteDataService.load());

  useEffect(() => {
    // Load data on component mount
    const loadedData = websiteDataService.load();
    setWebsiteData(loadedData);
  }, []);

  const tabs = [
    { id: "content", label: "Content", icon: Type },
    { id: "design", label: "Design", icon: Palette },
    { id: "layout", label: "Layout", icon: Layout },
  ];

  const handleSave = () => {
    websiteDataService.save(websiteData);
    console.log("Saving website data:", websiteData);
    // Show success feedback
    alert("Website saved successfully!");
  };

  const updateWebsiteData = (field: string, value: any) => {
    setWebsiteData(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-save on every change for better UX
      websiteDataService.save(updated);
      return updated;
    });
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
          <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-lg">
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
