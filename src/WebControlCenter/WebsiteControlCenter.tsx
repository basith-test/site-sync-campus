
import React, { useState } from 'react';
import { Main, Header, Body } from '../NecttosComp/Layout/Layout';
import { useNecttos } from './context/NecttosContext';
import Button from '../NecttosComp/Button/Button';
import EditWebsite from './EditWebsite';

const WebsiteControlCenter: React.FC = () => {
  const { college, collegeId } = useNecttos();
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return <EditWebsite onBack={() => setIsEditing(false)} />;
  }

  return (
    <Main title="Website Control Center">
      <Header>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Website Control Center</h1>
          <div className="text-sm text-slate-600">
            {college?.name || 'No College Selected'}
          </div>
        </div>
      </Header>
      <Body>
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Manage Your College Website</h2>
              <p className="text-slate-600">
                Edit and customize your college website with our easy-to-use editor.
              </p>
            </div>
            
            <div className="flex justify-center">
              <Button 
                type="edit" 
                onClick={() => setIsEditing(true)}
                className="px-6 py-3 text-base"
              >
                Edit Website
              </Button>
            </div>
          </div>
        </div>
      </Body>
    </Main>
  );
};

export default WebsiteControlCenter;
