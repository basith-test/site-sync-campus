
import React, { useState } from 'react';
import { NavigationItem } from '../services/websiteDataService';

interface NavigationEditorProps {
  items: NavigationItem[];
  onUpdate: (items: NavigationItem[]) => void;
}

const NavigationEditor: React.FC<NavigationEditorProps> = ({ items, onUpdate }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

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

  const moveNavItem = (fromIndex: number, toIndex: number) => {
    const updated = [...items];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    onUpdate(updated);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={item.id} className="border rounded p-3 dark:border-slate-600">
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item.label}
                onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                className="flex-1 px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600"
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
            
            <div className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={item.href}
                onChange={(e) => updateNavItem(index, 'href', e.target.value)}
                className="flex-1 px-2 py-1 border rounded text-sm dark:bg-slate-700 dark:text-white dark:border-slate-600"
                placeholder="URL/Link"
              />
              <div className="flex space-x-1">
                <button
                  onClick={() => moveNavItem(index, Math.max(0, index - 1))}
                  disabled={index === 0}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded disabled:opacity-50 dark:bg-blue-900 dark:text-blue-300"
                >
                  ↑
                </button>
                <button
                  onClick={() => moveNavItem(index, Math.min(items.length - 1, index + 1))}
                  disabled={index === items.length - 1}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded disabled:opacity-50 dark:bg-blue-900 dark:text-blue-300"
                >
                  ↓
                </button>
                <button
                  onClick={() => removeNavItem(index)}
                  className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded dark:bg-red-900 dark:text-red-300"
                >
                  ✕
                </button>
              </div>
            </div>

            {item.type === 'dropdown' && (
              <div className="ml-4 space-y-2">
                <div className="text-sm font-medium dark:text-white">Dropdown Items:</div>
                {(item.children || []).map((child, childIndex) => (
                  <div key={child.id} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={child.label}
                      onChange={(e) => {
                        const updated = [...items];
                        if (!updated[index].children) updated[index].children = [];
                        updated[index].children![childIndex] = { ...child, label: e.target.value };
                        onUpdate(updated);
                      }}
                      className="flex-1 px-2 py-1 border rounded text-xs dark:bg-slate-700 dark:text-white dark:border-slate-600"
                      placeholder="Child Label"
                    />
                    <input
                      type="text"
                      value={child.href}
                      onChange={(e) => {
                        const updated = [...items];
                        if (!updated[index].children) updated[index].children = [];
                        updated[index].children![childIndex] = { ...child, href: e.target.value };
                        onUpdate(updated);
                      }}
                      className="flex-1 px-2 py-1 border rounded text-xs dark:bg-slate-700 dark:text-white dark:border-slate-600"
                      placeholder="Child URL"
                    />
                    <button
                      onClick={() => {
                        const updated = [...items];
                        updated[index].children = updated[index].children?.filter((_, i) => i !== childIndex) || [];
                        onUpdate(updated);
                      }}
                      className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded dark:bg-red-900 dark:text-red-300"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const updated = [...items];
                    if (!updated[index].children) updated[index].children = [];
                    updated[index].children!.push({
                      id: `child-${Date.now()}`,
                      label: 'New Child',
                      href: '#',
                      type: 'internal'
                    });
                    onUpdate(updated);
                  }}
                  className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded dark:bg-green-900 dark:text-green-300"
                >
                  + Add Dropdown Item
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button
        onClick={addNavItem}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        + Add Navigation Item
      </button>
    </div>
  );
};

export default NavigationEditor;
