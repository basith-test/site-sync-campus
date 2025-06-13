
import React from "react";
import Button from "../../NecttosComp/Button/Button";
import { WebsiteData } from "../services/websiteDataService";

interface EditableSectionProps {
  data: WebsiteData;
  onUpdate: (field: string, value: any) => void;
  onEditSection: (sectionId: string) => void;
  editingSection: string | null;
}

const EditableSection: React.FC<EditableSectionProps> = ({
  data,
  onUpdate,
  onEditSection,
  editingSection,
}) => {
  const handleSectionClick = (sectionId: string) => {
    onEditSection(sectionId);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div
        className={`cursor-pointer border-2 ${
          editingSection === "header" ? "border-blue-500" : "border-transparent"
        } hover:border-blue-300 transition-colors`}
        onClick={() => handleSectionClick("header")}
      >
        <header className="bg-white shadow-sm border-b p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={data.logoUrl}
                alt={`${data.collegeName} Logo`}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-xl font-bold text-blue-900">{data.collegeName}</h1>
                <p className="text-sm text-slate-600">{data.tagline}</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              {data.navigationItems.map((item) => (
                <a key={item.id} href={item.href} className="text-slate-700 hover:text-blue-600 font-medium">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <div
        className={`cursor-pointer border-2 ${
          editingSection === "hero" ? "border-blue-500" : "border-transparent"
        } hover:border-blue-300 transition-colors`}
        onClick={() => handleSectionClick("hero")}
      >
        <section
          className="text-white py-20"
          style={{
            background: `linear-gradient(to right, ${data.primaryColor}, ${data.secondaryColor})`,
          }}
        >
          <div className="text-center px-6">
            <h2 className="text-5xl font-bold mb-6">{data.heroTitle}</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">{data.heroSubtitle}</p>
          </div>
        </section>
      </div>

      {/* About Section */}
      <div
        className={`cursor-pointer border-2 ${
          editingSection === "about" ? "border-blue-500" : "border-transparent"
        } hover:border-blue-300 transition-colors`}
        onClick={() => handleSectionClick("about")}
      >
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">{data.aboutTitle}</h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">{data.aboutContent}</p>
            </div>
          </div>
        </section>
      </div>

      {/* News Section */}
      <div
        className={`cursor-pointer border-2 ${
          editingSection === "news" ? "border-blue-500" : "border-transparent"
        } hover:border-blue-300 transition-colors`}
        onClick={() => handleSectionClick("news")}
      >
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Latest News</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {data.newsItems.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-slate-500">{article.date}</span>
                    <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">{article.title}</h4>
                  <p className="text-sm text-slate-600 mb-3">{article.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditableSection;
