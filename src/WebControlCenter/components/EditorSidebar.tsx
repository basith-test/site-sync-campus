
import React from "react";
import Input from "../../NecttosComp/Input/Input";
import Button from "../../NecttosComp/Button/Button";
import { WebsiteData } from "../services/websiteDataService";

interface EditorSidebarProps {
  editingSection: string | null;
  websiteData: WebsiteData;
  updateWebsiteData: (field: string, value: any) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  editingSection,
  websiteData,
  updateWebsiteData,
}) => {
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
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Header Settings</h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="College Name"
                  state={websiteData}
                  returnKey="collegeName"
                  setState={(newState) => updateWebsiteData("collegeName", newState.collegeName)}
                />
                <Input
                  type="text"
                  fieldName="Tagline"
                  state={websiteData}
                  returnKey="tagline"
                  setState={(newState) => updateWebsiteData("tagline", newState.tagline)}
                />
              </div>
            </div>
          </div>
        );

      case "hero":
        return (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="Hero Title"
                  state={websiteData}
                  returnKey="heroTitle"
                  setState={(newState) => updateWebsiteData("heroTitle", newState.heroTitle)}
                />
                <Input
                  type="text"
                  fieldName="Hero Subtitle"
                  state={websiteData}
                  returnKey="heroSubtitle"
                  setState={(newState) => updateWebsiteData("heroSubtitle", newState.heroSubtitle)}
                />
              </div>
            </div>
          </div>
        );

      case "about":
        return (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">About Section</h3>
              <div className="space-y-4">
                <Input
                  type="text"
                  fieldName="About Title"
                  state={websiteData}
                  returnKey="aboutTitle"
                  setState={(newState) => updateWebsiteData("aboutTitle", newState.aboutTitle)}
                />
                <Input
                  type="text"
                  fieldName="About Content"
                  state={websiteData}
                  returnKey="aboutContent"
                  setState={(newState) => updateWebsiteData("aboutContent", newState.aboutContent)}
                />
              </div>
            </div>
          </div>
        );

      case "news":
        return (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border">
              <h3 className="text-lg font-semibold mb-4">News Section</h3>
              <div className="space-y-4">
                {websiteData.newsItems.map((item, index) => (
                  <div key={item.id} className="border rounded p-3">
                    <Input
                      type="text"
                      fieldName={`News Title ${index + 1}`}
                      state={{ title: item.title }}
                      returnKey="title"
                      setState={(newState) => {
                        const updated = [...websiteData.newsItems];
                        updated[index] = { ...item, title: newState.title };
                        updateWebsiteData("newsItems", updated);
                      }}
                    />
                    <Input
                      type="text"
                      fieldName={`News Content ${index + 1}`}
                      state={{ content: item.content }}
                      returnKey="content"
                      setState={(newState) => {
                        const updated = [...websiteData.newsItems];
                        updated[index] = { ...item, content: newState.content };
                        updateWebsiteData("newsItems", updated);
                      }}
                    />
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
