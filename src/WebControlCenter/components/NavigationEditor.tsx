
import React, { useState } from 'react';
import { NavigationItem } from '../services/websiteDataService';
import Button from './Button';

interface NavigationEditorProps {
  items: NavigationItem[];
  onUpdate: (items: NavigationItem[]) => void;
}

const NavigationEditor: React.FC<NavigationEditorProps> = ({ items, onUpdate }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const addNavItem = () => {
    const newItem: NavigationItem = {
      id: `nav-${Date.now()}`,
      label: 'New Item',
      href: '#',
      type: 'internal'
    };
    onUpdate([...items, newItem]);
  };

  const updateNavItem = (index: number, field: keyof NavigationItem, value: any) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onUpdate(updated);
  };

  const removeNavItem = (index: number) => {
    const updated = items.filter((_, i) => i !== index);
    onUpdate(updated);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    
    if (draggedItem === null || draggedItem === targetIndex) return;

    const newItems = [...items];
    const [draggedItemData] = newItems.splice(draggedItem, 1);
    newItems.splice(targetIndex, 0, draggedItemData);

    onUpdate(newItems);
    setDraggedItem(null);
  };

  const addDropdownChild = (parentIndex: number) => {
    const updated = [...items];
    if (!updated[parentIndex].children) {
      updated[parentIndex].children = [];
    }
    updated[parentIndex].children!.push({
      id: `child-${Date.now()}`,
      label: 'New Child',
      href: '#',
      type: 'internal'
    });
    onUpdate(updated);
  };

  const updateDropdownChild = (parentIndex: number, childIndex: number, field: keyof NavigationItem, value: any) => {
    const updated = [...items];
    if (updated[parentIndex].children) {
      updated[parentIndex].children[childIndex] = { 
        ...updated[parentIndex].children[childIndex], 
        [field]: value 
      };
    }
    onUpdate(updated);
  };

  const removeDropdownChild = (parentIndex: number, childIndex: number) => {
    const updated = [...items];
    if (updated[parentIndex].children) {
      updated[parentIndex].children.splice(childIndex, 1);
    }
    onUpdate(updated);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className={`border rounded-lg p-4 transition-all ${
              draggedItem === index ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            } dark:border-slate-600 bg-white dark:bg-slate-800 hover:shadow-md cursor-grab active:cursor-grabbing`}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
          >
            {/* Header Row - Fixed Flexbox Layout */}
            <div className="flex items-center justify-between mb-3 gap-3">
              {/* Left Section: Drag Handle + Item Label */}
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="cursor-grab text-slate-400 hover:text-slate-600 flex-shrink-0">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                  </svg>
                </div>
                <span className="font-medium dark:text-white truncate">{item.label}</span>
              </div>
              
              {/* Center Section: Type Badge */}
              <div className="flex-shrink-0">
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded dark:bg-blue-900 dark:text-blue-300 whitespace-nowrap">
                  {item.type}
                </span>
              </div>
              
              {/* Right Section: Action Buttons */}
              <div className="flex items-center space-x-2 flex-shrink-0">
                <Button
                  type="edit"
                  onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                  className="text-xs px-2 py-1 whitespace-nowrap"
                >
                  {editingIndex === index ? 'Save' : 'Edit'}
                </Button>
                <Button
                  type="delete"
                  onClick={() => removeNavItem(index)}
                  className="text-xs px-2 py-1 whitespace-nowrap"
                >
                  Delete
                </Button>
              </div>
            </div>

            {editingIndex === index && (
              <div className="space-y-3 border-t pt-3 dark:border-slate-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                    className="px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600"
                    placeholder="Label"
                  />
                  <select
                    value={item.type}
                    onChange={(e) => updateNavItem(index, 'type', e.target.value as NavigationItem['type'])}
                    className="px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600"
                  >
                    <option value="internal">Internal</option>
                    <option value="external">External</option>
                    <option value="dropdown">Dropdown</option>
                  </select>
                </div>
                
                <input
                  type="text"
                  value={item.href}
                  onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600"
                  placeholder="URL/Link"
                />

                {item.type === 'dropdown' && (
                  <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-700 rounded">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-medium dark:text-white">Dropdown Items:</h4>
                      <Button
                        type="save"
                        onClick={() => addDropdownChild(index)}
                        className="text-xs px-2 py-1"
                      >
                        Add Item
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(item.children || []).map((child, childIndex) => (
                        <div key={child.id} className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={child.label}
                            onChange={(e) => updateDropdownChild(index, childIndex, 'label', e.target.value)}
                            className="flex-1 px-2 py-1 border rounded text-xs dark:bg-slate-600 dark:text-white dark:border-slate-500"
                            placeholder="Child Label"
                          />
                          <input
                            type="text"
                            value={child.href}
                            onChange={(e) => updateDropdownChild(index, childIndex, 'href', e.target.value)}
                            className="flex-1 px-2 py-1 border rounded text-xs dark:bg-slate-600 dark:text-white dark:border-slate-500"
                            placeholder="Child URL"
                          />
                          <Button
                            type="delete"
                            onClick={() => removeDropdownChild(index, childIndex)}
                            className="text-xs px-1 py-1 flex-shrink-0"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      
      <Button onClick={addNavItem} className="w-full">
        + Add Navigation Item
      </Button>
    </div>
  );
};

export default NavigationEditor;
