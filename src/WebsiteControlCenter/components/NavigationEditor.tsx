
import React, { useState } from 'react';
import Button from '../../NecttosComp/Button/Button';
import Input from '../../NecttosComp/Input/Input';

interface NavigationItem {
  id: string;
  label: string;
  href: string;
  type: 'internal' | 'external' | 'dropdown';
  children?: NavigationItem[];
}

interface NavigationEditorProps {
  items: NavigationItem[];
  onUpdate: (items: NavigationItem[]) => void;
}

const NavigationEditor: React.FC<NavigationEditorProps> = ({ items, onUpdate }) => {
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);

  const defaultItems = [
    { id: 'home', label: 'Home', href: '/', type: 'internal' as const },
    { id: 'departments', label: 'Departments', href: '/departments', type: 'dropdown' as const },
    { id: 'admissions', label: 'Admissions', href: '/admissions', type: 'internal' as const },
    { id: 'about', label: 'About', href: '/about', type: 'internal' as const },
    { id: 'contact', label: 'Contact', href: '/contact', type: 'internal' as const },
  ];

  const addNavigationItem = (template?: NavigationItem) => {
    const newItem: NavigationItem = template || {
      id: `nav-${Date.now()}`,
      label: 'New Item',
      href: '#',
      type: 'internal'
    };
    
    const updatedItems = [...items, newItem];
    onUpdate(updatedItems);
    setEditingItem(newItem.id);
  };

  const updateNavigationItem = (id: string, updates: Partial<NavigationItem>) => {
    const updatedItems = items.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    onUpdate(updatedItems);
  };

  const deleteNavigationItem = (id: string) => {
    const updatedItems = items.filter(item => item.id !== id);
    onUpdate(updatedItems);
  };

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = items.findIndex(item => item.id === draggedItem);
    const targetIndex = items.findIndex(item => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newItems = [...items];
    const [draggedItemData] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItemData);

    onUpdate(newItems);
    setDraggedItem(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold dark:text-white">Navigation Menu</h3>
        <select 
          onChange={(e) => {
            if (e.target.value === 'custom') {
              addNavigationItem();
            } else {
              const template = defaultItems.find(item => item.id === e.target.value);
              if (template) addNavigationItem(template);
            }
            e.target.value = '';
          }}
          className="px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
        >
          <option value="">Add Item</option>
          {defaultItems.map(item => (
            <option key={item.id} value={item.id}>{item.label}</option>
          ))}
          <option value="custom">Custom Item</option>
        </select>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div 
            key={item.id}
            className={`border rounded p-3 dark:border-slate-600 ${draggedItem === item.id ? 'opacity-50' : ''} ${editingItem === item.id ? 'ring-2 ring-blue-500' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item.id)}
          >
            {editingItem === item.id ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="cursor-grab">⋮⋮</span>
                  <div className="flex-1 space-y-2">
                    <Input
                      type="text"
                      fieldName="Label"
                      state={item.label}
                      setState={(value) => updateNavigationItem(item.id, { label: value })}
                      width="100%"
                    />
                    <Input
                      type="text"
                      fieldName="Link (href)"
                      state={item.href}
                      setState={(value) => updateNavigationItem(item.id, { href: value })}
                      width="100%"
                    />
                    <select 
                      value={item.type}
                      onChange={(e) => updateNavigationItem(item.id, { type: e.target.value as 'internal' | 'external' | 'dropdown' })}
                      className="w-full px-3 py-2 border rounded dark:bg-slate-700 dark:text-white"
                    >
                      <option value="internal">Internal Page</option>
                      <option value="external">External Link</option>
                      <option value="dropdown">Dropdown Menu</option>
                    </select>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Button type="save" onClick={() => setEditingItem(null)}>
                      ✅
                    </Button>
                    <Button type="close" onClick={() => setEditingItem(null)}>
                      ❌
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="cursor-grab text-gray-400">⋮⋮</span>
                  <div>
                    <span className="font-medium dark:text-white">{item.label}</span>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.href} 
                      <span className="ml-2 px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                        {item.type}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button type="edit" onClick={() => setEditingItem(item.id)}>
                    ✏️
                  </Button>
                  <Button type="delete" onClick={() => deleteNavigationItem(item.id)}>
                    🗑️
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No navigation items. Click "Add Item" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default NavigationEditor;
