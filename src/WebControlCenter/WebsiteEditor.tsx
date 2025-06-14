
import React, { useState, useEffect } from "react";
import Button from "./components/Button";
import { useNecttos } from "./context/NecttosContext";
import EditableSection from "./components/EditableSection";
import EditorSidebar from "./components/EditorSidebar";
import { websiteDataService, WebsiteData } from "./services/websiteDataService";

const WebsiteEditor: React.FC = () => {
  const { college, collegeId } = useNecttos();
  const [activeTab, setActiveTab] = useState<"content" | "design">("content");
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [websiteData, setWebsiteData] = useState<WebsiteData>(websiteDataService.load());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (college && college.name) {
      const initialData = {
        ...websiteDataService.load(),
        collegeName: college.name || websiteData.collegeName,
      };
      setWebsiteData(initialData);
    }
  }, [college]);

  const tabs = [
    { id: "content" as const, label: "Content", icon: "📝" },
    { id: "design" as const, label: "Design", icon: "🎨" },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      websiteDataService.save(websiteData);
      console.log("Saving website data:", websiteData);
      alert("Website saved successfully!");
    } catch (error) {
      console.error("Error saving website:", error);
      alert("Error saving website. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateWebsiteData = (field: string, value: any) => {
    setWebsiteData(prev => {
      const updated = { ...prev, [field]: value };
      websiteDataService.save(updated);
      return updated;
    });
  };

  const handleEditSection = (sectionId: string) => {
    setEditingSection(sectionId);
    setActiveTab("content");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex overflow-hidden">
      <div className="w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-screen">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Editing: {college?.name || "College Website"}
            </div>
            <Button type="save" onClick={handleSave} loader={isSaving}>
              💾 Save
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-2 rounded text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
              >
                <span className="text-lg mb-1">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
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
                  <p className="text-slate-500 dark:text-slate-400">Global design settings coming soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white dark:bg-slate-900 overflow-y-auto h-screen">
        <EditableSection 
          data={websiteData}
          onUpdate={updateWebsiteData}
          onEditSection={handleEditSection}
          editingSection={editingSection}
        />
      </div>
    </div>
  );
};

export default WebsiteEditor;
