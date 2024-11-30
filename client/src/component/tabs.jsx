import React, { useState } from 'react';

export const Tabs = ({ children, defaultTab = 0 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return React.Children.map(children, (child) => {
    if (child.type === TabsList) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    } else if (child.type === TabsContent) {
      return React.cloneElement(child, { activeTab });
    }
    return child;
  });
};

export const TabsList = ({ children, activeTab, setActiveTab }) => (
  <div className="flex border-b border-gray-200">
    {React.Children.map(children, (child, index) => 
      React.cloneElement(child, { isActive: activeTab === index, onClick: () => setActiveTab(index) })
    )}
  </div>
);

export const TabsTrigger = ({ children, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 focus:outline-none ${isActive ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, activeTab }) => (
  <div className="p-4">
    {React.Children.toArray(children)[activeTab]}
  </div>
);
