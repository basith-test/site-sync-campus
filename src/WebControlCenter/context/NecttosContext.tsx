
import React, { createContext, useContext, useState } from 'react';

interface College {
  name: string;
  id: string;
}

interface NecttosContextType {
  college: College | null;
  collegeId: string | null;
}

const NecttosContext = createContext<NecttosContextType>({
  college: null,
  collegeId: null
});

export const useNecttos = () => useContext(NecttosContext);

interface NecttosProviderProps {
  children: React.ReactNode;
}

export const NecttosProvider: React.FC<NecttosProviderProps> = ({ children }) => {
  const [college] = useState<College | null>({
    name: "Excellence University",
    id: "1"
  });
  const [collegeId] = useState<string | null>("1");

  return (
    <NecttosContext.Provider value={{ college, collegeId }}>
      {children}
    </NecttosContext.Provider>
  );
};

export { NecttosContext };
