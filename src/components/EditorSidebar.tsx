import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ColorPicker from "./ColorPicker";
import NavigationEditor from "./NavigationEditor";

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  type: 'internal' | 'external' | 'dropdown';
  children?: NavigationItem[];
}

interface EditorSidebarProps {
  editingSection: string | null;
  websiteData: {
    collegeName: string;
    tagline: string;
    heroTitle: string;
    heroSubtitle: string;
    aboutTitle: string;
    aboutContent: string;
    primaryColor: string;
    secondaryColor: string;
    navigationItems?: NavigationItem[];
  };
  updateWebsiteData: (field: string, value: string | NavigationItem[]) => void;
}

const EditorSidebar = ({ editingSection, websiteData, updateWebsiteData }: EditorSidebarProps) => {
  const defaultNavigationItems: NavigationItem[] = [
    { id: 'home', label: 'Home', href: '#', type: 'internal' },
    { id: 'departments', label: 'Departments', href: '#', type: 'dropdown' },
    { id: 'admissions', label: 'Admissions', href: '#', type: 'internal' },
    { id: 'about', label: 'About', href: '#', type: 'internal' },
    { id: 'contact', label: 'Contact', href: '#', type: 'internal' },
  ];

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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Navigation Menu</CardTitle>
                <CardDescription>Manage your website navigation</CardDescription>
              </CardHeader>
              <CardContent>
                <NavigationEditor
                  items={websiteData.navigationItems || defaultNavigationItems}
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
        );

      case "courses":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Courses Section</CardTitle>
                <CardDescription>Academic programs configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">Course data is automatically synchronized from your CMS. Layout and display options coming soon.</p>
              </CardContent>
            </Card>
          </div>
        );

      case "faculty":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Faculty Section</CardTitle>
                <CardDescription>Faculty information settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">Faculty data is automatically synchronized from your CMS. Display customization options coming soon.</p>
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
                <CardDescription>News and events settings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">News data is automatically synchronized from your CMS. Display customization options coming soon.</p>
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
                <CardDescription>Footer content and links</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-500">Footer customization options coming soon.</p>
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
