
import React, { useState } from 'react';
import EditableSection from './components/EditableSection';
import { websiteDataService, WebsiteData } from './services/websiteDataService';

const WebsitePreview: React.FC = () => {
  const [websiteData] = useState<WebsiteData>(websiteDataService.load());

  const dummyUpdate = () => {
    // Preview mode - no updates allowed
  };

  const dummyEditSection = () => {
    // Preview mode - no editing allowed
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 text-center text-sm font-medium">
        📱 Preview Mode - This is how your website will look to visitors
      </div>
      <EditableSection 
        data={websiteData}
        onUpdate={dummyUpdate}
        onEditSection={dummyEditSection}
        editingSection={null}
      />
    </div>
  );
};

export default WebsitePreview;
