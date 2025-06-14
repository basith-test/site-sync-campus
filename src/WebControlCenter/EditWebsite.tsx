
import React, { useState } from 'react';
import { Main, Header, Body } from '../NecttosComp/Layout/Layout';
import Button from '../NecttosComp/Button/Button';
import { useNecttos } from './context/NecttosContext';
import WebsiteEditor from './WebsiteEditor';
import WebsitePreview from './WebsitePreview';

interface EditWebsiteProps {
  onBack: () => void;
}

const EditWebsite: React.FC<EditWebsiteProps> = ({ onBack }) => {
  const { college } = useNecttos();
  const [currentView, setCurrentView] = useState<'editor' | 'preview'>('editor');

  return (
    <Main width="100vw" height="100vh" title={`Edit ${college?.name || 'College'} Website`}>
      <Header>
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex items-center space-x-4">
            <Button type="close" onClick={onBack}>
              ← Back to Control Center
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" />
                </svg>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">
                Website Editor
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button 
              type={currentView === 'editor' ? 'save' : 'edit'} 
              onClick={() => setCurrentView(currentView === 'editor' ? 'preview' : 'editor')}
            >
              {currentView === 'editor' ? '👁 Preview' : '✏ Edit'}
            </Button>
            <Button type="save">
              💾 Save
            </Button>
          </div>
        </div>
      </Header>
      
      <Body>
        <div className="h-full w-full">
          {currentView === 'editor' ? (
            <WebsiteEditor />
          ) : (
            <WebsitePreview />
          )}
        </div>
      </Body>
    </Main>
  );
};

export default EditWebsite;
