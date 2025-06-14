
import React from 'react';
import EditableSection from './components/EditableSection';
import { useNecttos } from './context/NecttosContext';
import { websiteDataService } from './services/websiteDataService';

const WebsitePreview: React.FC = () => {
  const { college } = useNecttos();
  const websiteData = websiteDataService.load();

  return (
    <div className="bg-white min-h-screen">
      <EditableSection 
        data={websiteData}
        onUpdate={() => {}} // Read-only in preview mode
        onEditSection={() => {}} // No editing in preview mode
        editingSection={null}
      />
    </div>
  );
};

export default WebsitePreview;
