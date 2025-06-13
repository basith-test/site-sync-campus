
import React, { useContext, useState } from 'react';
import { Header, Main } from '../NecttosComp/Layout/Layout';
import { NecttosContext } from '../context/NecttosContext';
import { getAxiosTokenInstance } from '../utils/axiosInstance';
import Button from '../NecttosComp/Button/Button';
import toast from 'react-hot-toast';
import EditWebsite from './EditWebsite';

interface WebsiteControlCenterProps {
  isTemp?: boolean;
  onClose: () => void;
}

const WebsiteControlCenter: React.FC<WebsiteControlCenterProps> = ({ isTemp, onClose }) => {
  const { college, collegeId } = useContext(NecttosContext);
  const [currentView, setCurrentView] = useState<'control-center' | 'edit-website'>('control-center');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [syncStatus, setSyncStatus] = useState('Last synced: 10 minutes ago');

  const switchToEditView = () => setCurrentView('edit-website');
  const returnToControlCenter = () => setCurrentView('control-center');

  const handleSync = () => {
    setIsSyncing(true);
    setSyncStatus('Syncing...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('Last synced: Just now');
      toast.success('Academic data synced successfully!');
    }, 2000);
  };

  const handleTogglePublish = () => {
    setIsPublished(prev => !prev);
    toast.success(isPublished ? 'Website unpublished successfully!' : 'Website published successfully!');
  };

  const handleViewWebsite = () => {
    const url = `https://collegewebsite.example.com/${collegeId}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (currentView === 'edit-website') {
    return <EditWebsite onBack={returnToControlCenter} />;
  }

  return (
    <Main width="100%" height="100%" title="Website Control Center">
      <Header>
        <div className="flex items-center px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                {college?.name || "College Website"}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Website Control Center</p>
            </div>
          </div>
          <Button type="close" onClick={onClose} className="ml-auto">
            Close
          </Button>
        </div>
      </Header>
      
      <div className="min-h-[80vh] bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-auto py-8">
        <div className="max-w-6xl mx-auto px-4 space-y-8">
          {/* Hero Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-3">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Website Control Center
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-3">
              Manage your college website with powerful tools for content editing and data synchronization.
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
              Website Live & Running
            </span>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* View Website Card */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">View Website</h3>
                  <p className="text-sm text-slate-600">Preview your live college website</p>
                </div>
              </div>
              <Button type="save" onClick={handleViewWebsite}>
                Open Website
              </Button>
            </div>

            {/* Edit Website Card */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M20.586 4.586a2 2 0 00-2.828-2.828L9 11.586V14h2.414l9.172-9.172z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Edit Website</h3>
                  <p className="text-sm text-slate-600">Customize content and design</p>
                </div>
              </div>
              <Button type="save" onClick={switchToEditView}>
                Start Editing
              </Button>
            </div>

            {/* Settings Card */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Settings</h3>
                  <p className="text-sm text-slate-600">Configure website preferences</p>
                </div>
              </div>
              <Button type="edit" onClick={() => console.log('Open Settings')}>
                Open Settings
              </Button>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Academic Sync Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Academic Data Sync</h3>
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">{syncStatus}</p>
              <Button type="refresh" onClick={handleSync} loader={isSyncing}>
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </Button>
            </div>

            {/* Website Status Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Website Status</h3>
                <div className={`w-8 h-8 ${isPublished ? 'bg-green-100' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
                  <div className={`w-4 h-4 ${isPublished ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Website is currently {isPublished ? 'published' : 'unpublished'}
              </p>
              <Button type={isPublished ? "delete" : "save"} onClick={handleTogglePublish}>
                {isPublished ? 'Unpublish' : 'Publish'}
              </Button>
            </div>

            {/* Analytics Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Analytics</h3>
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">Monthly visitors: 2,547</p>
              <Button type="view" onClick={() => console.log('View Analytics')}>
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};

export default WebsiteControlCenter;
