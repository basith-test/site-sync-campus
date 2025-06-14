
import React from 'react';

export const Main: React.FC<{ 
  children: React.ReactNode; 
  width?: string; 
  height?: string; 
  title?: string; 
}> = ({ children, width = "100%", height = "100vh", title }) => (
  <div className="w-full h-screen flex flex-col" style={{ width, height }}>
    {title && <title>{title}</title>}
    {children}
  </div>
);

export const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <header className="flex-shrink-0 bg-white border-b border-slate-200 px-4 py-3">
    {children}
  </header>
);

export const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <main className="flex-1 overflow-hidden">
    {children}
  </main>
);
