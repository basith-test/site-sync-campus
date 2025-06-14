
import React, { useState } from 'react';
import WebsiteEditor from './WebsiteEditor';
import WebsitePreview from './WebsitePreview';

interface EditWebsiteProps {
  onBack: () => void;
}

const EditWebsite: React.FC<EditWebsiteProps> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<'editor' | 'preview'>('editor');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white"
            >
              ← Back to Control Center
            </button>
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
            <button 
              onClick={() => setCurrentView(currentView === 'editor' ? 'preview' : 'editor')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              {currentView === 'editor' ? '👁 Preview' : '✏ Edit'}
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
              💾 Save
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="h-[calc(100vh-73px)]">
        {currentView === 'editor' ? (
          <WebsiteEditor />
        ) : (
          <WebsitePreview />
        )}
      </div>
    </div>
  );
};

export default EditWebsite;
