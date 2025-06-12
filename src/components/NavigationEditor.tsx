
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, GripVertical, Edit, Save, X } from "lucide-react";

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

const NavigationEditor = ({ items, onUpdate }: NavigationEditorProps) => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(items);
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
    
    const updatedItems = [...navigationItems, newItem];
    setNavigationItems(updatedItems);
    onUpdate(updatedItems);
    setEditingItem(newItem.id);
  };

  const updateNavigationItem = (id: string, updates: Partial<NavigationItem>) => {
    const updatedItems = navigationItems.map(item =>
      item.id === id ? { ...item, ...updates } : item
    );
    setNavigationItems(updatedItems);
    onUpdate(updatedItems);
  };

  const deleteNavigationItem = (id: string) => {
    const updatedItems = navigationItems.filter(item => item.id !== id);
    setNavigationItems(updatedItems);
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

    const draggedIndex = navigationItems.findIndex(item => item.id === draggedItem);
    const targetIndex = navigationItems.findIndex(item => item.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newItems = [...navigationItems];
    const [draggedItemData] = newItems.splice(draggedIndex, 1);
    newItems.splice(targetIndex, 0, draggedItemData);

    setNavigationItems(newItems);
    onUpdate(newItems);
    setDraggedItem(null);
  };

  const saveEdit = (itemId: string) => {
    setEditingItem(null);
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Navigation Menu</h3>
        <Select onValueChange={(value) => {
          if (value === 'custom') {
            addNavigationItem();
          } else {
            const template = defaultItems.find(item => item.id === value);
            if (template) addNavigationItem(template);
          }
        }}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Add Item" />
          </SelectTrigger>
          <SelectContent>
            {defaultItems.map(item => (
              <SelectItem key={item.id} value={item.id}>
                {item.label}
              </SelectItem>
            ))}
            <SelectItem value="custom">Custom Item</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {navigationItems.map((item) => (
          <Card 
            key={item.id}
            className={`${draggedItem === item.id ? 'opacity-50' : ''} ${editingItem === item.id ? 'ring-2 ring-blue-500' : ''}`}
            draggable
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item.id)}
          >
            <CardContent className="p-3">
              {editingItem === item.id ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <div className="flex-1 space-y-2">
                      <div>
                        <Label htmlFor={`label-${item.id}`}>Label</Label>
                        <Input
                          id={`label-${item.id}`}
                          value={item.label}
                          onChange={(e) => updateNavigationItem(item.id, { label: e.target.value })}
                          placeholder="Menu item label"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`href-${item.id}`}>Link (href)</Label>
                        <Input
                          id={`href-${item.id}`}
                          value={item.href}
                          onChange={(e) => updateNavigationItem(item.id, { href: e.target.value })}
                          placeholder="e.g., /about or https://example.com"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`type-${item.id}`}>Type</Label>
                        <Select 
                          value={item.type} 
                          onValueChange={(value: 'internal' | 'external' | 'dropdown') => 
                            updateNavigationItem(item.id, { type: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="internal">Internal Page</SelectItem>
                            <SelectItem value="external">External Link</SelectItem>
                            <SelectItem value="dropdown">Dropdown Menu</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Button size="sm" onClick={() => saveEdit(item.id)}>
                        <Save className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={cancelEdit}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />
                    <div>
                      <span className="font-medium">{item.label}</span>
                      <div className="text-sm text-gray-500">
                        {item.href} 
                        <span className="ml-2 px-1 py-0.5 bg-gray-100 rounded text-xs">
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingItem(item.id)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteNavigationItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {navigationItems.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No navigation items. Click "Add Item" to get started.</p>
        </div>
      )}
    </div>
  );
};

export default NavigationEditor;
